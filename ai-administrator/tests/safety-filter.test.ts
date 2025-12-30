import { describe, it, expect } from 'vitest';
import SafetyFilter from '../services/safety-filter';

describe('SafetyFilter', () => {
  const filter = new SafetyFilter({ enableContentFilter: true, enablePiiFilter: true, enableMilitaryFilter: true, maxInputLength: 1000, maxOutputLength: 500, blockedTopics: ['weapons'], allowedDomains: ['parts'] });

  it('should allow safe input', async () => { expect((await filter.checkInput('Find brake pads')).safe).toBe(true); });
  it('should block long input', async () => { expect((await filter.checkInput('a'.repeat(2000))).safe).toBe(false); });
  it('should filter PII', async () => { expect((await filter.checkOutput('email: test@example.com')).filtered).toContain('[EMAIL]'); });
});
