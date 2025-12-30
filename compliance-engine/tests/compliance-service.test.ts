/**
 * Compliance Service Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import ComplianceService from '../services/compliance-service';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(() => {
    service = new ComplianceService();
  });

  describe('checkEntity', () => {
    it('should check part compliance', async () => {
      const part = {
        id: 'part-001',
        part_number: 'ABC-123456',
        brand: 'Toyota',
        description: 'Test part description',
        description_uk: 'Тестовий опис запчастини',
        category: 'brakes',
        domain: 'automotive',
        safety_critical: false,
      };

      const summary = await service.checkEntity(part, {
        entityType: 'part',
      });

      expect(summary).toBeDefined();
      expect(summary.total_rules).toBeGreaterThan(0);
      expect(summary.checked).toBeGreaterThan(0);
    });

    it('should detect missing required fields', async () => {
      const part = {
        id: 'part-002',
        part_number: 'DEF-789',
        brand: 'Toyota',
        // Missing description and description_uk
        category: 'brakes',
        domain: 'automotive',
      };

      const summary = await service.checkEntity(part, {
        entityType: 'part',
        ruleIds: ['PART-004'], // Required fields rule
      });

      expect(summary.non_compliant).toBeGreaterThan(0);
    });

    it('should validate part number format', async () => {
      const validPart = {
        id: 'part-003',
        part_number: 'ABC-123456',
      };

      const invalidPart = {
        id: 'part-004',
        part_number: 'invalid',
      };

      const validSummary = await service.checkEntity(validPart, {
        entityType: 'part',
        ruleIds: ['PART-001'],
      });

      const invalidSummary = await service.checkEntity(invalidPart, {
        entityType: 'part',
        ruleIds: ['PART-001'],
      });

      expect(validSummary.compliant).toBe(1);
      expect(invalidSummary.non_compliant).toBe(1);
    });
  });

  describe('getRules', () => {
    it('should return all rules', () => {
      const rules = service.getAllRules();
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should return rule by ID', () => {
      const rule = service.getRule('PART-001');
      expect(rule).toBeDefined();
      expect(rule?.id).toBe('PART-001');
    });

    it('should return undefined for unknown rule', () => {
      const rule = service.getRule('UNKNOWN-RULE');
      expect(rule).toBeUndefined();
    });

    it('should filter rules by category', () => {
      const rules = service.getRulesByCategory('safety_critical');
      rules.forEach(rule => {
        expect(rule.category).toBe('safety_critical');
      });
    });
  });
});
