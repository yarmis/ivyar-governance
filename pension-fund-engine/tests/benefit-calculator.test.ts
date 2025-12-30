/**
 * Benefit Calculator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { BenefitCalculator } from '../calculators/benefit-calculator';
import { Pensioner, PensionType, MilitaryRank, DisabilityGroup, DisabilityCause } from '../models/types';

describe('BenefitCalculator', () => {
  let calculator: BenefitCalculator;

  beforeEach(() => {
    calculator = new BenefitCalculator();
  });

  const createPensioner = (overrides: Partial<Pensioner> = {}): Pensioner => ({
    id: 'test-1',
    personal_id: '1234567890',
    tax_id: '1234567890',
    first_name: 'Test',
    last_name: 'User',
    date_of_birth: '1970-01-01',
    gender: 'male',
    phone: '+380501234567',
    address: { country: 'Ukraine', region: 'Kyiv', city: 'Kyiv', street: 'Main', building: '1', postal_code: '01001' },
    pension_type: PensionType.MILITARY,
    service_status: 'retired',
    military_rank: MilitaryRank.COLONEL,
    service_start_date: '1992-01-01',
    service_end_date: '2020-01-01',
    total_service_years: 28,
    combat_service_years: 6,
    special_conditions_years: 0,
    base_salary_at_retirement: 65000,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  });

  describe('Basic Calculation', () => {
    it('should calculate pension for standard case', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        military_rank: MilitaryRank.MAJOR,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // 25 years = 50% + (5 × 2%) = 60%
      // Base = 50000 × 60% = 30000
      // Service coef = 1.10 (25-29 years)
      // Rank coef = 1.45 (Major)
      // Intermediate = 30000 × 1.10 × 1.45 = 47850

      expect(result.benefit.pension_percentage).toBe(60);
      expect(result.benefit.base_amount).toBe(30000);
      expect(result.benefit.service_coefficient).toBe(1.10);
      expect(result.benefit.rank_coefficient).toBe(1.45);
      expect(result.benefit.gross_amount).toBeCloseTo(47850, 0);
    });

    it('should cap pension percentage at 90%', () => {
      const pensioner = createPensioner({
        total_service_years: 40,
        combat_service_years: 10,
        base_salary_at_retirement: 100000,
      });

      const result = calculator.calculate({ pensioner });

      // Effective years = 40 + (10 × 2) = 60
      // Would be 50% + (40 × 2%) = 130%, but capped at 90%
      expect(result.benefit.pension_percentage).toBe(90);
    });
  });

  describe('Combat Service', () => {
    it('should calculate effective years with combat multiplier', () => {
      const pensioner = createPensioner({
        total_service_years: 15,
        combat_service_years: 5,
      });

      const result = calculator.calculate({ pensioner });

      // Effective = 15 + (5 × 2) = 25 years
      // Pension % = 50% + (5 × 2%) = 60%
      expect(result.summary.effective_years).toBe(25);
      expect(result.benefit.pension_percentage).toBe(60);
    });

    it('should add combat bonus', () => {
      const pensioner = createPensioner({
        total_service_years: 20,
        combat_service_years: 5,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // Combat bonus = 50000 × 50% (base%) × 2% × 5 years = 2500
      // But actually: base_amount × 2% × combat_years
      // base_amount = 50000 × 60% = 30000 (effective 30 years = 60%)
      // combat_bonus = 30000 × 2% × 5 = 3000
      expect(result.benefit.combat_bonus).toBeGreaterThan(0);
    });
  });

  describe('Disability Bonus', () => {
    it('should calculate disability bonus for Group II', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        disability_group: DisabilityGroup.GROUP_2,
        disability_cause: DisabilityCause.SERVICE,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // Disability bonus = base × 30% × 1.2 (service cause)
      // base = 50000 × 60% = 30000
      // bonus = 30000 × 0.30 × 1.20 = 10800
      expect(result.benefit.disability_bonus).toBeCloseTo(10800, 0);
    });

    it('should apply combat multiplier to disability', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        disability_group: DisabilityGroup.GROUP_2,
        disability_cause: DisabilityCause.COMBAT,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // bonus = 30000 × 0.30 × 1.50 = 13500
      expect(result.benefit.disability_bonus).toBeCloseTo(13500, 0);
    });
  });

  describe('Limits', () => {
    it('should apply minimum pension', () => {
      const pensioner = createPensioner({
        total_service_years: 10,
        combat_service_years: 0,
        military_rank: MilitaryRank.SOLDIER,
        base_salary_at_retirement: 5000,
      });

      const result = calculator.calculate({ pensioner });

      expect(result.benefit.net_amount).toBeGreaterThanOrEqual(3000);
    });

    it('should apply maximum pension', () => {
      const pensioner = createPensioner({
        total_service_years: 40,
        combat_service_years: 10,
        military_rank: MilitaryRank.GENERAL,
        base_salary_at_retirement: 200000,
      });

      const result = calculator.calculate({ pensioner });

      expect(result.benefit.net_amount).toBeLessThanOrEqual(150000);
    });
  });

  describe('Dependents', () => {
    it('should add dependents bonus', () => {
      const pensioner = createPensioner();

      const result = calculator.calculate({ pensioner, dependents_count: 2 });

      // 3000 × 10% × 2 = 600
      expect(result.benefit.dependents_bonus).toBe(600);
    });

    it('should cap dependents at maximum', () => {
      const pensioner = createPensioner();

      const result = calculator.calculate({ pensioner, dependents_count: 10 });

      // Max 5 dependents: 3000 × 10% × 5 = 1500
      expect(result.benefit.dependents_bonus).toBe(1500);
    });
  });
});
