import { describe, it, expect, vi } from 'vitest';
import AIService from '../services/ai-service';
import { defaultConfig } from '../config/ai-config';

describe('AIService', () => {
  it('should reject unknown feature', async () => {
    const service = new AIService(defaultConfig);
    await expect(service.process({ feature: 'unknown', promptId: 'test', variables: {}, userId: 'u1' })).rejects.toThrow('Feature not enabled');
  });
});
