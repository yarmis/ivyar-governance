import { describe, it, expect } from 'vitest';
import PromptRegistry from '../prompts/prompt-registry';

describe('PromptRegistry', () => {
  const registry = new PromptRegistry();

  it('should load prompts', () => { expect(registry.list().length).toBeGreaterThan(0); });
  it('should get by ID', () => { expect(registry.get('part-search')?.id).toBe('part-search'); });
  it('should render with variables', () => { expect(registry.render('part-search', { query: 'test' })).toContain('test'); });
  it('should throw on missing required', () => { expect(() => registry.render('part-search', {})).toThrow(); });
});
