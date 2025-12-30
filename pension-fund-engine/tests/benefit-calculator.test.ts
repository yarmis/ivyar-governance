import { describe, it, expect } from 'vitest';
import BenefitCalculator from '../calculators/benefit-calculator';
import { defaultConfig } from '../config/pension-config';
import { PensionType, ServiceStatus, MilitaryRank } from '../models/types';

describe('BenefitCalculator', () => {
  const calculator = new BenefitCalculator(defaultConfig);

  const mockPensioner = {
    id: 'test-1',
    personal_id: '1234567890',
    tax_id: '1234567890',
    first_name: 'Ivan',
    last_name: 'Petrenko',
    date_of_birth: '1970-01-01',
    gender: 'male' as const,
    phone: '+380501234567',
    address: { country: 'Ukraine', region: 'Kyiv', city: 'Kyiv', street: 'Main', building: '1', postal_code: '01001' },
    pension_type: PensionType.MILITARY,
    service_status: ServiceStatus.RETIRED,
    military_rank: MilitaryRank.COLONEL,
    service_start_date: '1990-01-01',
    service_end_date: '2020-01-01',
    total_service_years: 30,
    combat_service_years: 5,
    special_conditions_years: 2,
    base_salary_at_retirement: 50000,
    current_pension_amount: 0,
    status: 'active' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it('should calculate basic pension', () => {
    const benefit = calculator.calculate(mockPensioner);
    expect(benefit.net_amount).toBeGreaterThan(0);
    expect(benefit.net_amount).toBeGreaterThanOrEqual(defaultConfig.general.minimum_pension);
  });

  it('should apply rank coefficient', () => {
    const benefit = calculator.calculate(mockPensioner);
    expect(benefit.rank_coefficient).toBe(defaultConfig.military.rank_coefficients[MilitaryRank.COLONEL]);
  });

  it('should calculate combat bonus', () => {
    const benefit = calculator.calculate(mockPensioner);
    expect(benefit.combat_bonus).toBeGreaterThan(0);
  });

  it('should respect maximum pension limit', () => {
    const benefit = calculator.calculate(mockPensioner);
    expect(benefit.gross_amount).toBeLessThanOrEqual(defaultConfig.general.maximum_pension);
  });

  it('should add dependents bonus', () => {
    const withoutDependents = calculator.calculate(mockPensioner, 0);
    const withDependents = calculator.calculate(mockPensioner, 2);
    expect(withDependents.dependents_bonus).toBeGreaterThan(withoutDependents.dependents_bonus);
  });
});
