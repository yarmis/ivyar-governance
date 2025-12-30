/**
 * Main Pension Service
 * Orchestrates all pension operations
 */

import { Pensioner, PensionBenefit, Payment, EligibilityResult, ActuarialForecast } from '../models/types';
import { BenefitCalculator, CalculationInput } from '../calculators/benefit-calculator';
import { PensionConfig, defaultConfig } from '../config/pension-config';

export class PensionService {
  private calculator: BenefitCalculator;
  private config: PensionConfig;

  constructor(config: PensionConfig = defaultConfig) {
    this.config = config;
    this.calculator = new BenefitCalculator(config);
  }

  /**
   * Calculate pension benefit
   */
  calculateBenefit(input: CalculationInput) {
    return this.calculator.calculate(input);
  }

  /**
   * Check eligibility for pension
   */
  checkEligibility(pensioner: Pensioner): EligibilityResult {
    const { military, government } = this.config.eligibility;
    const age = this.calculateAge(pensioner.date_of_birth);
    const reasons: string[] = [];
    const missing: string[] = [];
    const warnings: string[] = [];

    // Calculate effective years
    const effectiveYears = pensioner.total_service_years + 
      (pensioner.combat_service_years * (this.config.military.combat_year_multiplier - 1));

    // Check military eligibility
    if (pensioner.pension_type === 'military') {
      // Age check (with combat veteran exception)
      if (age >= military.min_age) {
        reasons.push(`Age requirement met (${age} >= ${military.min_age})`);
      } else if (pensioner.combat_service_years >= military.early_retirement_combat_years) {
        reasons.push(`Early retirement eligible: ${pensioner.combat_service_years} combat years`);
      } else {
        missing.push(`Age ${military.min_age} required (current: ${age})`);
      }

      // Service check
      if (effectiveYears >= military.min_service_years) {
        reasons.push(`Service requirement met (${effectiveYears} effective years >= ${military.min_service_years})`);
      } else {
        missing.push(`${military.min_service_years} years service required (current: ${effectiveYears} effective)`);
      }
    }

    // Estimate pension if eligible
    let estimatedPension: number | undefined;
    if (missing.length === 0) {
      const result = this.calculator.calculate({ pensioner });
      estimatedPension = result.summary.monthly;
    }

    return {
      eligible: missing.length === 0,
      pension_type: pensioner.pension_type,
      reasons,
      missing_requirements: missing,
      warnings,
      estimated_pension: estimatedPension,
    };
  }

  /**
   * Apply indexation to pension
   */
  applyIndexation(benefit: PensionBenefit, rate: number): PensionBenefit {
    const indexationAmount = benefit.net_amount * rate;
    const newGross = benefit.gross_amount + indexationAmount;
    const newNet = benefit.net_amount + indexationAmount;

    return {
      ...benefit,
      indexation_amount: benefit.indexation_amount + indexationAmount,
      gross_amount: newGross,
      net_amount: newNet,
    };
  }

  private calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}

export default PensionService;
