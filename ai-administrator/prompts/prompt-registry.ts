/**
 * Prompt Registry - Central management for AI prompts
 */

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  category: 'system' | 'part_search' | 'analog_finder' | 'repair_advisor' | 'chat' | 'document';
  template: string;
  variables: Array<{ name: string; type: string; required: boolean; description: string; default?: any }>;
  metadata: { author: string; created_at: string; updated_at: string; tags: string[] };
}

export class PromptRegistry {
  private prompts: Map<string, PromptTemplate> = new Map();

  constructor() { this.loadDefaultPrompts(); }

  get(id: string): PromptTemplate | undefined { return this.prompts.get(id); }
  
  register(prompt: PromptTemplate): void { this.prompts.set(prompt.id, prompt); }

  render(id: string, variables: Record<string, any>): string {
    const prompt = this.prompts.get(id);
    if (!prompt) throw new Error(`Prompt not found: ${id}`);
    let rendered = prompt.template;
    for (const v of prompt.variables) {
      const value = variables[v.name] ?? v.default;
      if (v.required && value === undefined) throw new Error(`Required variable missing: ${v.name}`);
      rendered = rendered.replace(new RegExp(`{{${v.name}}}`, 'g'), typeof value === 'object' ? JSON.stringify(value) : String(value ?? ''));
    }
    return rendered;
  }

  list(category?: string): PromptTemplate[] {
    const all = Array.from(this.prompts.values());
    return category ? all.filter(p => p.category === category) : all;
  }

  private loadDefaultPrompts(): void {
    this.register({
      id: 'part-search-system', name: 'Part Search System', description: 'System prompt for part search',
      version: '1.0.0', category: 'system',
      template: `You are IVYAR Part Search Assistant for military vehicle parts.
Help users find parts by understanding queries, matching to part numbers/specs, providing technical info.
Guidelines: Prioritize safety info, include NSN when available, mention repair levels (R1-R4).
Platform: {{platform}} | Role: {{user_role}} | Language: {{language}}`,
      variables: [
        { name: 'platform', type: 'string', required: false, description: 'Vehicle platform', default: 'all' },
        { name: 'user_role', type: 'string', required: false, description: 'User role', default: 'operator' },
        { name: 'language', type: 'string', required: false, description: 'Language', default: 'en' },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['system', 'parts'] },
    });

    this.register({
      id: 'part-search', name: 'Part Search Query', description: 'Part search template',
      version: '1.0.0', category: 'part_search',
      template: `Search for parts: {{query}}\nFilters: {{filters}}\nReturn: part number, description, compatibility, repair coverage, safety notes.`,
      variables: [
        { name: 'query', type: 'string', required: true, description: 'Search query' },
        { name: 'filters', type: 'object', required: false, description: 'Filters', default: {} },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['parts', 'search'] },
    });

    this.register({
      id: 'analog-finder-system', name: 'Analog Finder System', description: 'System for analog finding',
      version: '1.0.0', category: 'system',
      template: `You are IVYAR Analog Finder for alternative parts.
Cross-reference OEM with aftermarket, evaluate compatibility, check military specs.
Confidence: 95-100% direct replacement, 85-94% compatible, 75-84% verify fit, <75% needs review.`,
      variables: [],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['system', 'analog'] },
    });

    this.register({
      id: 'analog-finder', name: 'Analog Finder Query', description: 'Find analog parts',
      version: '1.0.0', category: 'analog_finder',
      template: `Find analogs for:\nPart: {{part_number}} | {{description}} | {{brand}}\nSpecs: {{specifications}}\nMin Confidence: {{min_confidence}}%\nProvide: part ID, manufacturer, confidence, differences, notes.`,
      variables: [
        { name: 'part_number', type: 'string', required: true, description: 'Part number' },
        { name: 'description', type: 'string', required: true, description: 'Description' },
        { name: 'brand', type: 'string', required: false, description: 'Brand' },
        { name: 'specifications', type: 'object', required: false, description: 'Specs', default: {} },
        { name: 'min_confidence', type: 'number', required: false, description: 'Min confidence', default: 75 },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['analog'] },
    });

    this.register({
      id: 'repair-advisor-system', name: 'Repair Advisor System', description: 'Repair advisory system',
      version: '1.0.0', category: 'system',
      template: `You are IVYAR Repair Advisor for military vehicle maintenance.
Diagnose issues, recommend repair levels (R1-Field, R2-Base, R3-Depot, R4-Factory).
Provide procedures, parts, tools, time estimates. Always highlight safety warnings.
Language: {{language}} | Expertise: {{expertise_level}}`,
      variables: [
        { name: 'language', type: 'string', required: false, description: 'Language', default: 'en' },
        { name: 'expertise_level', type: 'string', required: false, description: 'Expertise', default: 'intermediate' },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['system', 'repair'] },
    });

    this.register({
      id: 'repair-advisor', name: 'Repair Advisor Query', description: 'Repair guidance',
      version: '1.0.0', category: 'repair_advisor',
      template: `Repair guidance for:\nVehicle: {{vehicle}} ({{platform}})\nIssue: {{issue}}\nSymptoms: {{symptoms}}\nProvide: diagnosis, repair level, procedure, parts, tools, time, safety warnings.`,
      variables: [
        { name: 'vehicle', type: 'string', required: true, description: 'Vehicle ID' },
        { name: 'platform', type: 'string', required: true, description: 'Platform' },
        { name: 'issue', type: 'string', required: true, description: 'Issue' },
        { name: 'symptoms', type: 'array', required: false, description: 'Symptoms', default: [] },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['repair'] },
    });

    this.register({
      id: 'chat-assistant-system', name: 'Chat System', description: 'General chat system',
      version: '1.0.0', category: 'system',
      template: `You are IVYAR Assistant for military logistics and maintenance.
Help with: parts, repairs, fleet status, documentation, logistics.
Be concise, professional, cite sources, support EN/UK.
User: {{user_name}} ({{user_role}}) | Unit: {{user_unit}} | Lang: {{language}}`,
      variables: [
        { name: 'user_name', type: 'string', required: false, description: 'Name' },
        { name: 'user_role', type: 'string', required: false, description: 'Role', default: 'operator' },
        { name: 'user_unit', type: 'string', required: false, description: 'Unit' },
        { name: 'language', type: 'string', required: false, description: 'Language', default: 'en' },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['system', 'chat'] },
    });

    this.register({
      id: 'chat-assistant', name: 'Chat Query', description: 'Chat message',
      version: '1.0.0', category: 'chat',
      template: `History: {{history}}\nMessage: {{message}}`,
      variables: [
        { name: 'message', type: 'string', required: true, description: 'Message' },
        { name: 'history', type: 'array', required: false, description: 'History', default: [] },
      ],
      metadata: { author: 'system', created_at: '2025-01-01', updated_at: '2025-01-01', tags: ['chat'] },
    });
  }
}

export default PromptRegistry;
