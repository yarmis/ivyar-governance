import { describe, it, expect } from 'vitest';
import PremiumCalculator from '../services/premium-calculator';
import { defaultConfig } from '../config/insurance-config';
import { RiskCategory, MilitaryStatus } from '../models/types';

describe('PremiumCalculator', () => {
  const calculator = new PremiumCalculator(defaultConfig);

  const mockInsured = {
    id: 'test-1',
    personal_id: '1234567890',
    tax_id: '1234567890',
    first_name: 'Test',
    last_name: 'User',
    date_of_birth: '1970-01-01',
    gender: 'male' as const,
    phone: '+380501234567',
    address: { country: 'Ukraine', region: 'Kyiv', city: 'Kyiv', street: 'Main', building: '1', postal_code: '01001' },
    military_status: MilitaryStatus.VETERAN,
    service_years: 25,
    combat_service: true,
    risk_category: RiskCategory.MEDIUM,
    risk_score: 70,
    health_conditions: [],
    status: 'active' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it('should calculate base premium', () => {
    const result = calculator.calculate({
      productCode: 'LIFE-MIL',
      coverageAmount: 500000,
      insured: mockInsured,
    });

    expect(result.base_premium).toBeGreaterThan(0);
    expect(result.annual_premium).toBeGreaterThan(0);
    expect(result.monthly_premium).toBe(Math.round(result.annual_premium / 12));
  });

  it('should apply military discount', () => {
    const result = calculator.calculate({
      productCode: 'LIFE-MIL',
      coverageAmount: 500000,
      insured: mockInsured,
    });

    expect(result.military_discount).toBeGreaterThan(0);
  });

  it('should apply combat loading', () => {
    const result = calculator.calculate({
      productCode: 'LIFE-MIL',
      coverageAmount: 500000,
      insured: mockInsured,
    });

    expect(result.combat_loading).toBeGreaterThan(0);
  });

  it('should apply pensioner discount when pension data provided', () => {
    const result = calculator.calculate({
      productCode: 'LIFE-MIL',
      coverageAmount: 500000,
      insured: mockInsured,
      pensionData: {
        pensioner_id: 'PEN-001',
        pension_amount: 45000,
        pension_type: 'military',
        service_years: 25,
        combat_years: 5,
        rank: 'colonel',
      },
    });

    expect(result.pensioner_discount).toBeGreaterThan(0);
  });
});
