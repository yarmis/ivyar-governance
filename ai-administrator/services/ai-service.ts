/**
 * AI Service - Core service for AI interactions
 */

import { AIConfig, ProviderConfig } from '../config/ai-config';
import PromptRegistry from '../prompts/prompt-registry';
import SafetyFilter from './safety-filter';
import UsageTracker from '../analytics/usage-tracker';
import AuditLogger from './audit-logger';

export interface AIRequest {
  feature: string;
  promptId: string;
  variables: Record<string, any>;
  userId: string;
  sessionId?: string;
  options?: { model?: string; temperature?: number; maxTokens?: number; stream?: boolean };
}

export interface AIResponse {
  id: string;
  content: string;
  model: string;
  provider: string;
  usage: { inputTokens: number; outputTokens: number; totalTokens: number; estimatedCost: number };
  latencyMs: number;
  cached: boolean;
}

export class AIService {
  private config: AIConfig;
  private promptRegistry: PromptRegistry;
  private safetyFilter: SafetyFilter;
  private usageTracker: UsageTracker;
  private auditLogger: AuditLogger;

  constructor(config: AIConfig) {
    this.config = config;
    this.promptRegistry = new PromptRegistry();
    this.safetyFilter = new SafetyFilter(config.safety);
    this.usageTracker = new UsageTracker();
    this.auditLogger = new AuditLogger();
  }

  async process(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const requestId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const featureConfig = (this.config.features as any)[request.feature];
    if (!featureConfig?.enabled) throw new Error(`Feature not enabled: ${request.feature}`);

    await this.checkRateLimits(request.userId);

    const systemPrompt = this.promptRegistry.render(featureConfig.systemPrompt, request.variables);
    const userPrompt = this.promptRegistry.render(request.promptId, request.variables);

    const safetyResult = await this.safetyFilter.checkInput(userPrompt);
    if (!safetyResult.safe) throw new Error(`Content blocked: ${safetyResult.reason}`);

    const model = request.options?.model || featureConfig.model;
    const provider = this.getProviderForModel(model);

    const response = await this.callProvider(provider, {
      model, systemPrompt, userPrompt,
      temperature: request.options?.temperature || featureConfig.temperature,
      maxTokens: request.options?.maxTokens || featureConfig.maxTokens,
    });

    const outputSafety = await this.safetyFilter.checkOutput(response.content);
    if (!outputSafety.safe) response.content = outputSafety.filtered || '[Filtered]';

    const usage = this.calculateUsage(provider, model, response);
    const latencyMs = Date.now() - startTime;

    await this.usageTracker.track({ requestId, userId: request.userId, feature: request.feature, model, provider: provider.id, usage, latencyMs, timestamp: new Date().toISOString() });
    await this.auditLogger.log({ requestId, userId: request.userId, feature: request.feature, action: 'ai_request', status: 'success', metadata: { model, latencyMs } });

    return { id: requestId, content: response.content, model, provider: provider.id, usage, latencyMs, cached: false };
  }

  private getProviderForModel(modelId: string): ProviderConfig {
    for (const p of this.config.providers) {
      if (p.enabled && p.models.some(m => m.id === modelId)) return p;
    }
    throw new Error(`No provider for model: ${modelId}`);
  }

  private async checkRateLimits(userId: string): Promise<void> {
    if (!this.config.rateLimit.enabled) return;
    const usage = await this.usageTracker.getUserUsage(userId);
    if (usage.requestsLastMinute >= this.config.rateLimit.requestsPerMinute) throw new Error('Rate limit exceeded (minute)');
    if (usage.requestsLastHour >= this.config.rateLimit.requestsPerHour) throw new Error('Rate limit exceeded (hour)');
  }

  private async callProvider(provider: ProviderConfig, params: any): Promise<{ content: string; rawResponse: any }> {
    const response = await fetch(`${provider.apiEndpoint}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: params.model, max_tokens: params.maxTokens, temperature: params.temperature, system: params.systemPrompt, messages: [{ role: 'user', content: params.userPrompt }] }),
    });
    const data = await response.json();
    return { content: data.content?.[0]?.text || '', rawResponse: data };
  }

  private calculateUsage(provider: ProviderConfig, modelId: string, response: { rawResponse: any }) {
    const model = provider.models.find(m => m.id === modelId)!;
    const u = response.rawResponse.usage || {};
    const input = u.input_tokens || 0, output = u.output_tokens || 0;
    return { inputTokens: input, outputTokens: output, totalTokens: input + output, estimatedCost: (input / 1000) * model.costPer1kInput + (output / 1000) * model.costPer1kOutput };
  }
}

export default AIService;
