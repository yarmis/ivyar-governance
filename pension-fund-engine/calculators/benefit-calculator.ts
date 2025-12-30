/**
 * Pension Benefit Calculator
 */

import {
  Pensioner,
  PensionBenefit,
  CalculationDetails,
  MilitaryRank,
  DisabilityGroup,
  PensionType,
  CoefficientBreakdown,
  BonusBreakdown,
} from '../models/types';
import { PensionConfig } from '../config/pension-config';

export class BenefitCalculator {
  private config: PensionConfig;

  constructor(config: PensionConfig) {
    this.config = config;
  }

  /**
   * Calculate full pension benefit
   */
  calculate(pensioner: Pensioner, dependentsCount: number = 0): PensionBenefit {
    const details = this.buildCalculationDetails(pensioner, dependentsCount);
    
    // Calculate base pension
    const baseAmount = this.calculateBasePension(pensioner);
    
    // Calculate coefficients
    const serviceCoefficient = this.calculateServiceCoefficient(pensioner);
    const rankCoefficient = this.calculateRankCoefficient(pensioner.military_rank);
    
    // Calculate bonuses
    const combatBonus = this.calculateCombatBonus(pensioner, baseAmount);
    const disabilityBonus = this.calculateDisabilityBonus(pensioner, baseAmount);
    const specialConditionsBonus = this.calculateSpecialConditionsBonus(pensioner, baseAmount);
    const dependentsBonus = this.calculateDependentsBonus(dependentsCount);
    
    // Apply coefficients to base
    let grossAmount = baseAmount * serviceCoefficient * rankCoefficient;
    
    // Add bonuses
    grossAmount += combatBonus + disabilityBonus + specialConditionsBonus + dependentsBonus;
    
    // Apply limits
    grossAmount = this.applyLimits(grossAmount);
    
    // Calculate tax (usually 0 for military)
    const taxAmount = this.calculateTax(grossAmount, pensioner.pension_type);
    const netAmount = grossAmount - taxAmount;

    return {
      id: this.generateId(),
      pensioner_id: pensioner.id,
      calculation_date: new Date().toISOString(),
      base_amount: baseAmount,
      service_coefficient: serviceCoefficient,
      rank_coefficient: rankCoefficient,
      combat_bonus: combatBonus,
      disability_bonus: disabilityBonus,
      special_conditions_bonus: specialConditionsBonus,
      dependents_bonus: dependentsBonus,
      indexation_amount: 0,
      one_time_payments: 0,
      deductions: 0,
      gross_amount: grossAmount,
      tax_amount: taxAmount,
      net_amount: netAmount,
      formula_version: this.config.general.formula_version,
      calculation_details: details,
      effective_from: new Date().toISOString(),
    };
  }

  /**
   * Calculate base pension from salary and service
   * Formula: Base = Salary × (BaseRate + YearIncrement × ExtraYears)
   */
  private calculateBasePension(pensioner: Pensioner): number {
    const { base_percentage, year_increment, max_percentage, combat_multiplier } = this.config.military;
    const minYears = this.config.eligibility.military.min_service_years;
    
    // Calculate effective years (combat years count more)
    const effectiveYears = pensioner.total_service_years + 
      (pensioner.combat_service_years * (combat_multiplier - 1));
    
    // Calculate percentage
    let percentage = base_percentage;
    if (effectiveYears > minYears) {
      percentage += year_increment * (effectiveYears - minYears);
    }
    percentage = Math.min(percentage, max_percentage);
    
    return pensioner.base_salary_at_retirement * (percentage / 100);
  }

  /**
   * Calculate service coefficient
   * Longer service = higher coefficient
   */
  private calculateServiceCoefficient(pensioner: Pensioner): number {
    const years = pensioner.total_service_years;
    
    if (years < 10) return 0.8;
    if (years < 15) return 0.9;
    if (years < 20) return 1.0;
    if (years < 25) return 1.1;
    if (years < 30) return 1.2;
    return 1.3;
  }

  /**
   * Get rank coefficient from config
   */
  private calculateRankCoefficient(rank?: MilitaryRank): number {
    if (!rank) return 1.0;
    return this.config.military.rank_coefficients[rank] || 1.0;
  }

  /**
   * Calculate combat service bonus
   * Formula: CombatBonus = Base × CombatYears × 0.02
   */
  private calculateCombatBonus(pensioner: Pensioner, baseAmount: number): number {
    if (pensioner.combat_service_years <= 0) return 0;
    // 2% per combat year
    return baseAmount * pensioner.combat_service_years * 0.02;
  }

  /**
   * Calculate disability bonus
   */
  private calculateDisabilityBonus(pensioner: Pensioner, baseAmount: number): number {
    if (!pensioner.disability_group) return 0;
    
    const coefficient = this.config.military.disability_coefficients[pensioner.disability_group];
    const bonus = baseAmount * (coefficient - 1);
    
    // Additional bonus for combat-related disability
    if (pensioner.disability_cause === 'combat') {
      return bonus * 1.5;
    }
    
    return bonus;
  }

  /**
   * Calculate special conditions bonus
   */
  private calculateSpecialConditionsBonus(pensioner: Pensioner, baseAmount: number): number {
    if (pensioner.special_conditions_years <= 0) return 0;
    // 1% per year in special conditions
    return baseAmount * pensioner.special_conditions_years * 0.01;
  }

  /**
   * Calculate dependents bonus
   */
  private calculateDependentsBonus(dependentsCount: number): number {
    const minPension = this.config.general.minimum_pension;
    // 10% of minimum pension per dependent
    return Math.min(dependentsCount, this.config.limits.max_dependents) * (minPension * 0.1);
  }

  /**
   * Apply minimum and maximum limits
   */
  private applyLimits(amount: number): number {
    const { minimum_pension, maximum_pension } = this.config.general;
    return Math.max(minimum_pension, Math.min(maximum_pension, amount));
  }

  /**
   * Calculate tax (usually 0 for military pensions)
   */
  private calculateTax(grossAmount: number, pensionType: PensionType): number {
    if (pensionType === PensionType.MILITARY) return 0;
    return grossAmount * this.config.general.tax_rate;
  }

  /**
   * Build calculation details for audit
   */
  private buildCalculationDetails(pensioner: Pensioner, dependentsCount: number): CalculationDetails {
    const coefficients: CoefficientBreakdown[] = [];
    const bonuses: BonusBreakdown[] = [];

    // Document coefficients
    coefficients.push({
      name: 'Service Coefficient',
      value: this.calculateServiceCoefficient(pensioner),
      description: `Based on ${pensioner.total_service_years} years of service`,
    });

    if (pensioner.military_rank) {
      coefficients.push({
        name: 'Rank Coefficient',
        value: this.calculateRankCoefficient(pensioner.military_rank),
        description: `Rank: ${pensioner.military_rank}`,
      });
    }

    // Document bonuses
    if (pensioner.combat_service_years > 0) {
      bonuses.push({
        type: 'Combat Service',
        amount: 0, // Will be calculated
        reason: `${pensioner.combat_service_years} years of combat service`,
      });
    }

    if (pensioner.disability_group) {
      bonuses.push({
        type: 'Disability',
        amount: 0,
        reason: `${pensioner.disability_group} - ${pensioner.disability_cause || 'service'}`,
      });
    }

    return {
      base_salary: pensioner.base_salary_at_retirement,
      years_of_service: pensioner.total_service_years,
      combat_years: pensioner.combat_service_years,
      rank_at_retirement: pensioner.military_rank!,
      disability_group: pensioner.disability_group,
      dependents_count: dependentsCount,
      special_status: [],
      applied_coefficients: coefficients,
      applied_bonuses: bonuses,
      indexation_history: [],
    };
  }

  private generateId(): string {
    return `benefit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default BenefitCalculator;
