import { describe, it, expect } from 'vitest';
import EligibilityEngine from '../calculators/eligibility-engine';
import { defaultConfig } from '../config/pension-config';
import { PensionType, ServiceStatus, MilitaryRank } from '../models/types';

describe('EligibilityEngine', () => {
  const engine = new EligibilityEngine(defaultConfig.eligibility);

  it('should approve eligible military pensioner', () => {
    const pensioner = {
      id: 'test-1',
      pension_type: PensionType.MILITARY,
      service_status: ServiceStatus.RETIRED,
      date_of_birth: '1970-01-01',
      total_service_years: 25,
      combat_service_years: 3,
      gender: 'male' as const,
    };

    const result = engine.checkEligibility(pensioner as any);
    expect(result.eligible).toBe(true);
  });

  it('should reject insufficient service', () => {
    const pensioner = {
      id: 'test-2',
      pension_type: PensionType.MILITARY,
      service_status: ServiceStatus.RETIRED,
      date_of_birth: '1990-01-01',
      total_service_years: 10,
      combat_service_years: 0,
      gender: 'male' as const,
    };

    const result = engine.checkEligibility(pensioner as any);
    expect(result.eligible).toBe(false);
    expect(result.missing_requirements.length).toBeGreaterThan(0);
  });

  it('should allow early retirement for combat veterans', () => {
    const pensioner = {
      id: 'test-3',
      pension_type: PensionType.MILITARY,
      service_status: ServiceStatus.RETIRED,
      date_of_birth: '1985-01-01', // Young
      total_service_years: 20,
      combat_service_years: 5, // Significant combat
      gender: 'male' as const,
    };

    const result = engine.checkEligibility(pensioner as any);
    expect(result.reasons.some(r => r.includes('combat'))).toBe(true);
  });
});
