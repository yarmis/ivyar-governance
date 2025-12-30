/**
 * AI Configuration
 */

export interface AIConfig {
  providers: ProviderConfig[];
  defaults: DefaultConfig;
  safety: SafetyConfig;
  rateLimit: RateLimitConfig;
  costs: CostConfig;
  features: FeatureConfig;
}

export interface ProviderConfig {
  id: string;
  name: string;
  type: 'anthropic' | 'openai' | 'mistral' | 'local';
  enabled: boolean;
  priority: number;
  apiEndpoint: string;
  models: ModelConfig[];
  retryConfig: RetryConfig;
  timeout: number;
}

export interface ModelConfig {
  id: string;
  name: string;
  contextWindow: number;
  maxOutputTokens: number;
  costPer1kInput: number;
  costPer1kOutput: number;
  capabilities: string[];
  recommended: boolean;
}

export interface DefaultConfig {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  stopSequences: string[];
}

export interface SafetyConfig {
  enableContentFilter: boolean;
  enablePiiFilter: boolean;
  enableMilitaryFilter: boolean;
  maxInputLength: number;
  maxOutputLength: number;
  blockedTopics: string[];
  allowedDomains: string[];
}

export interface RateLimitConfig {
  enabled: boolean;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
  perUser: boolean;
  perFeature: boolean;
}

export interface CostConfig {
  enabled: boolean;
  dailyBudget: number;
  monthlyBudget: number;
  alertThreshold: number;
  hardLimit: boolean;
}

export interface FeatureConfig {
  partSearch: FeatureSettings;
  analogFinder: FeatureSettings;
  repairAdvisor: FeatureSettings;
  chatAssistant: FeatureSettings;
  documentAnalysis: FeatureSettings;
}

export interface FeatureSettings {
  enabled: boolean;
  model: string;
  maxTokens: number;
  temperature: number;
  promptTemplate: string;
  systemPrompt: string;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryOn: number[];
}

export const defaultConfig: AIConfig = {
  providers: [
    {
      id: 'anthropic',
      name: 'Anthropic',
      type: 'anthropic',
      enabled: true,
      priority: 1,
      apiEndpoint: 'https://api.anthropic.com/v1',
      models: [
        {
          id: 'claude-sonnet-4-20250514',
          name: 'Claude Sonnet 4',
          contextWindow: 200000,
          maxOutputTokens: 16384,
          costPer1kInput: 0.003,
          costPer1kOutput: 0.015,
          capabilities: ['text', 'vision', 'analysis', 'code'],
          recommended: true,
        },
      ],
      retryConfig: { maxRetries: 3, baseDelay: 1000, maxDelay: 10000, retryOn: [429, 500, 502, 503, 504] },
      timeout: 60000,
    },
  ],
  defaults: {
    provider: 'anthropic',
    model: 'claude-sonnet-4-20250514',
    temperature: 0.7,
    maxTokens: 4096,
    topP: 0.9,
    stopSequences: [],
  },
  safety: {
    enableContentFilter: true,
    enablePiiFilter: true,
    enableMilitaryFilter: true,
    maxInputLength: 100000,
    maxOutputLength: 50000,
    blockedTopics: ['weapons_manufacturing', 'explosives', 'classified_info'],
    allowedDomains: ['parts', 'repairs', 'fleet', 'logistics'],
  },
  rateLimit: {
    enabled: true,
    requestsPerMinute: 20,
    requestsPerHour: 200,
    requestsPerDay: 1000,
    tokensPerMinute: 100000,
    tokensPerDay: 1000000,
    perUser: true,
    perFeature: true,
  },
  costs: {
    enabled: true,
    dailyBudget: 100,
    monthlyBudget: 2000,
    alertThreshold: 0.8,
    hardLimit: false,
  },
  features: {
    partSearch: { enabled: true, model: 'claude-sonnet-4-20250514', maxTokens: 1024, temperature: 0.3, promptTemplate: 'part-search', systemPrompt: 'part-search-system' },
    analogFinder: { enabled: true, model: 'claude-sonnet-4-20250514', maxTokens: 2048, temperature: 0.5, promptTemplate: 'analog-finder', systemPrompt: 'analog-finder-system' },
    repairAdvisor: { enabled: true, model: 'claude-sonnet-4-20250514', maxTokens: 4096, temperature: 0.7, promptTemplate: 'repair-advisor', systemPrompt: 'repair-advisor-system' },
    chatAssistant: { enabled: true, model: 'claude-sonnet-4-20250514', maxTokens: 4096, temperature: 0.7, promptTemplate: 'chat-assistant', systemPrompt: 'chat-assistant-system' },
    documentAnalysis: { enabled: true, model: 'claude-sonnet-4-20250514', maxTokens: 8192, temperature: 0.3, promptTemplate: 'document-analysis', systemPrompt: 'document-analysis-system' },
  },
};

export default defaultConfig;
