/**
 * Safety Filter - Content filtering and safety controls
 */

import { SafetyConfig } from '../config/ai-config';

export interface SafetyCheckResult { safe: boolean; reason?: string; filtered?: string; flags: string[] }

export class SafetyFilter {
  private config: SafetyConfig;

  constructor(config: SafetyConfig) { this.config = config; }

  async checkInput(content: string): Promise<SafetyCheckResult> {
    if (content.length > this.config.maxInputLength) return { safe: false, reason: 'Input exceeds max length', flags: ['length'] };
    for (const topic of this.config.blockedTopics) {
      if (content.toLowerCase().includes(topic.replace('_', ' '))) return { safe: false, reason: `Blocked topic: ${topic}`, flags: ['blocked'] };
    }
    return { safe: true, flags: [] };
  }

  async checkOutput(content: string): Promise<SafetyCheckResult> {
    let filtered = content;
    const flags: string[] = [];
    
    if (content.length > this.config.maxOutputLength) {
      filtered = content.substring(0, this.config.maxOutputLength) + '...';
      flags.push('truncated');
    }

    if (this.config.enablePiiFilter) {
      filtered = filtered.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL]');
      filtered = filtered.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]');
    }

    if (this.config.enableMilitaryFilter) {
      filtered = filtered.replace(/\b\d{1,3}°\s*\d{1,2}['′]\s*\d{1,2}["″]?\s*[NSEW]\b/gi, '[COORDS]');
    }

    return { safe: true, filtered, flags };
  }
}

export default SafetyFilter;
