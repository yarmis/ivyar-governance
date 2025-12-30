/**
 * Pension Benefit Calculator
 * CORRECTED VERSION with proper formula implementation
 */

import {
  Pensioner,
  PensionBenefit,
  CalculationStep,
  MilitaryRank,
  DisabilityGroup,
  DisabilityCause,
  PensionType,
} from '../models/types';
import { PensionConfig, defaultConfig } from '../config/pension-config';

export interface CalculationInput {
  pensioner: Pensioner;
  dependents_count?: number;
  awards?: string[];
  calculation_date?: string;
}

export interface CalculationResult {
  benefit: PensionBenefit;
  summary: {
    monthly: number;
    annual: number;
    effective_years: number;
    pension_percentage: number;
  };
}

export class BenefitCalculator {
  private config: PensionConfig;

  constructor(config: PensionConfig = defaultConfig) {
    this.config = config;
  }

  /**
   * Calculate pension benefit with full step-by-step breakdown
   */
  calculate(input: CalculationInput): CalculationResult {
    const { pensioner, dependents_count = 0, awards = [] } = input;
    const steps: CalculationStep[] = [];
    let stepNum = 1;

    // ========================================================================
    // STEP 1: Calculate Effective Service Years
    // Combat years count as multiplied years for pension percentage
    // ========================================================================
    const combatMultiplier = this.config.military.combat_year_multiplier;
    const combatBonusYears = pensioner.combat_service_years * (combatMultiplier - 1);
    const effectiveYears = pensioner.total_service_years + combatBonusYears;

    steps.push({
      step: stepNum++,
      name: 'Effective Service Years',
      formula: `${pensioner.total_service_years} + (${pensioner.combat_service_years} × ${combatMultiplier - 1}) = ${effectiveYears}`,
      inputs: {
        total_service_years: pensioner.total_service_years,
        combat_service_years: pensioner.combat_service_years,
        combat_multiplier: combatMultiplier,
      },
      result: effectiveYears,
      description: `Combat years count ${combatMultiplier}× (${combatMultiplier - 1} bonus years each)`,
    });

    // ========================================================================
    // STEP 2: Calculate Pension Percentage
    // Base 50% for 20 years, +2% per additional year, max 90%
    // ========================================================================
    const { base_percentage, year_increment, max_percentage } = this.config.military;
    const minYears = this.config.eligibility.military.min_service_years;
    
    const extraYears = Math.max(0, effectiveYears - minYears);
    let pensionPercentage = base_percentage + (year_increment * extraYears);
    pensionPercentage = Math.min(pensionPercentage, max_percentage);

    steps.push({
      step: stepNum++,
      name: 'Pension Percentage',
      formula: `min(${base_percentage}% + (${extraYears} × ${year_increment}%), ${max_percentage}%) = ${pensionPercentage}%`,
      inputs: {
        base_percentage,
        extra_years: extraYears,
        year_increment,
        max_percentage,
      },
      result: pensionPercentage,
      description: `Base ${base_percentage}% + ${year_increment}% per year over ${minYears}, capped at ${max_percentage}%`,
    });

    // ========================================================================
    // STEP 3: Calculate Base Pension Amount
    // ========================================================================
    const baseSalary = pensioner.base_salary_at_retirement;
    const baseAmount = baseSalary * (pensionPercentage / 100);

    steps.push({
      step: stepNum++,
      name: 'Base Pension Amount',
      formula: `${baseSalary.toLocaleString()} × ${pensionPercentage}% = ${baseAmount.toLocaleString()}`,
      inputs: {
        base_salary: baseSalary,
        pension_percentage: pensionPercentage,
      },
      result: baseAmount,
      description: 'Base salary × pension percentage',
    });

    // ========================================================================
    // STEP 4: Calculate Service Coefficient
    // Based on EFFECTIVE years (including combat bonus)
    // ========================================================================
    const serviceCoefficient = this.getServiceCoefficient(effectiveYears);

    steps.push({
      step: stepNum++,
      name: 'Service Coefficient',
      formula: `f(${effectiveYears} effective years) = ${serviceCoefficient}`,
      inputs: { effective_years: effectiveYears },
      result: serviceCoefficient,
      description: this.getServiceCoefficientDescription(effectiveYears),
    });

    // ========================================================================
    // STEP 5: Calculate Rank Coefficient
    // ========================================================================
    const rankCoefficient = this.getRankCoefficient(pensioner.military_rank);

    steps.push({
      step: stepNum++,
      name: 'Rank Coefficient',
      formula: `rank(${pensioner.military_rank || 'none'}) = ${rankCoefficient}`,
      inputs: { rank: pensioner.military_rank ? 1 : 0 },
      result: rankCoefficient,
      description: `Rank: ${pensioner.military_rank || 'N/A'}`,
    });

    // ========================================================================
    // STEP 6: Calculate Intermediate Pension
    // Base × Service Coefficient × Rank Coefficient
    // ========================================================================
    const intermediateAmount = baseAmount * serviceCoefficient * rankCoefficient;

    steps.push({
      step: stepNum++,
      name: 'Intermediate Pension',
      formula: `${baseAmount.toLocaleString()} × ${serviceCoefficient} × ${rankCoefficient} = ${intermediateAmount.toLocaleString()}`,
      inputs: {
        base_amount: baseAmount,
        service_coefficient: serviceCoefficient,
        rank_coefficient: rankCoefficient,
      },
      result: intermediateAmount,
      description: 'Base × Service Coefficient × Rank Coefficient',
    });

    // ========================================================================
    // STEP 7: Calculate Combat Bonus
    // Additional 2% of BASE per combat year (not intermediate)
    // ========================================================================
    const combatBonusRate = this.config.military.combat_bonus_rate;
    const combatBonus = baseAmount * combatBonusRate * pensioner.combat_service_years;

    if (pensioner.combat_service_years > 0) {
      steps.push({
        step: stepNum++,
        name: 'Combat Service Bonus',
        formula: `${baseAmount.toLocaleString()} × ${combatBonusRate * 100}% × ${pensioner.combat_service_years} = ${combatBonus.toLocaleString()}`,
        inputs: {
          base_amount: baseAmount,
          combat_bonus_rate: combatBonusRate,
          combat_years: pensioner.combat_service_years,
        },
        result: combatBonus,
        description: `${combatBonusRate * 100}% per combat year`,
      });
    }

    // ========================================================================
    // STEP 8: Calculate Disability Bonus
    // ========================================================================
    let disabilityBonus = 0;
    if (pensioner.disability_group) {
      const disabilityRate = this.config.military.disability_rates[pensioner.disability_group] || 0;
      const causeMultiplier = pensioner.disability_cause 
        ? this.config.military.disability_cause_multipliers[pensioner.disability_cause] || 1
        : 1;
      
      disabilityBonus = baseAmount * disabilityRate * causeMultiplier;

      steps.push({
        step: stepNum++,
        name: 'Disability Bonus',
        formula: `${baseAmount.toLocaleString()} × ${disabilityRate * 100}% × ${causeMultiplier} = ${disabilityBonus.toLocaleString()}`,
        inputs: {
          base_amount: baseAmount,
          disability_rate: disabilityRate,
          cause_multiplier: causeMultiplier,
        },
        result: disabilityBonus,
        description: `${pensioner.disability_group} (${pensioner.disability_cause || 'general'})`,
      });
    }

    // ========================================================================
    // STEP 9: Calculate Special Conditions Bonus
    // ========================================================================
    const specialConditionsBonus = baseAmount * 0.01 * pensioner.special_conditions_years;

    if (pensioner.special_conditions_years > 0) {
      steps.push({
        step: stepNum++,
        name: 'Special Conditions Bonus',
        formula: `${baseAmount.toLocaleString()} × 1% × ${pensioner.special_conditions_years} = ${specialConditionsBonus.toLocaleString()}`,
        inputs: {
          base_amount: baseAmount,
          special_years: pensioner.special_conditions_years,
        },
        result: specialConditionsBonus,
        description: '1% per year in special conditions',
      });
    }

    // ========================================================================
    // STEP 10: Calculate Dependents Bonus
    // ========================================================================
    const maxDependents = Math.min(dependents_count, this.config.limits.max_dependents);
    const dependentsBonus = this.config.general.minimum_pension * 0.10 * maxDependents;

    if (dependents_count > 0) {
      steps.push({
        step: stepNum++,
        name: 'Dependents Bonus',
        formula: `${this.config.general.minimum_pension.toLocaleString()} × 10% × ${maxDependents} = ${dependentsBonus.toLocaleString()}`,
        inputs: {
          minimum_pension: this.config.general.minimum_pension,
          dependents: maxDependents,
        },
        result: dependentsBonus,
        description: '10% of minimum pension per dependent',
      });
    }

    // ========================================================================
    // STEP 11: Calculate Awards Bonus
    // ========================================================================
    const awardsBonus = this.calculateAwardsBonus(awards, baseAmount);

    if (awards.length > 0 && awardsBonus > 0) {
      steps.push({
        step: stepNum++,
        name: 'Awards Bonus',
        formula: `Awards: ${awards.join(', ')} = ${awardsBonus.toLocaleString()}`,
        inputs: { awards_count: awards.length },
        result: awardsBonus,
        description: 'Bonuses for military awards',
      });
    }

    // ========================================================================
    // STEP 12: Calculate Gross Pension
    // ========================================================================
    const grossAmount = intermediateAmount + combatBonus + disabilityBonus + 
                        specialConditionsBonus + dependentsBonus + awardsBonus;

    steps.push({
      step: stepNum++,
      name: 'Gross Pension',
      formula: `${intermediateAmount.toLocaleString()} + bonuses = ${grossAmount.toLocaleString()}`,
      inputs: {
        intermediate: intermediateAmount,
        combat_bonus: combatBonus,
        disability_bonus: disabilityBonus,
        special_bonus: specialConditionsBonus,
        dependents_bonus: dependentsBonus,
        awards_bonus: awardsBonus,
      },
      result: grossAmount,
      description: 'Sum of intermediate pension and all bonuses',
    });

    // ========================================================================
    // STEP 13: Apply Limits
    // ========================================================================
    const { minimum_pension, maximum_pension } = this.config.general;
    let finalAmount = Math.max(minimum_pension, Math.min(maximum_pension, grossAmount));
    const limitApplied = finalAmount !== grossAmount;

    steps.push({
      step: stepNum++,
      name: 'Apply Limits',
      formula: `clamp(${grossAmount.toLocaleString()}, ${minimum_pension.toLocaleString()}, ${maximum_pension.toLocaleString()}) = ${finalAmount.toLocaleString()}`,
      inputs: {
        gross: grossAmount,
        minimum: minimum_pension,
        maximum: maximum_pension,
      },
      result: finalAmount,
      description: limitApplied 
        ? `Limit applied (${finalAmount === minimum_pension ? 'MIN' : 'MAX'})`
        : 'Within limits',
    });

    // ========================================================================
    // STEP 14: Calculate Tax (usually 0 for military)
    // ========================================================================
    const taxAmount = pensioner.pension_type === PensionType.MILITARY 
      ? 0 
      : finalAmount * this.config.general.tax_rate;
    const netAmount = finalAmount - taxAmount;

    steps.push({
      step: stepNum++,
      name: 'Final Net Pension',
      formula: `${finalAmount.toLocaleString()} - ${taxAmount.toLocaleString()} = ${netAmount.toLocaleString()}`,
      inputs: {
        gross: finalAmount,
        tax: taxAmount,
      },
      result: netAmount,
      description: pensioner.pension_type === PensionType.MILITARY 
        ? 'Military pensions are tax-exempt'
        : `Tax rate: ${this.config.general.tax_rate * 100}%`,
    });

    // Build result
    const benefit: PensionBenefit = {
      id: this.generateId(),
      pensioner_id: pensioner.id,
      calculation_date: input.calculation_date || new Date().toISOString(),
      effective_from: new Date().toISOString(),
      
      base_salary: baseSalary,
      pension_percentage: pensionPercentage,
      base_amount: baseAmount,
      
      service_coefficient: serviceCoefficient,
      rank_coefficient: rankCoefficient,
      
      combat_bonus: combatBonus,
      disability_bonus: disabilityBonus,
      special_conditions_bonus: specialConditionsBonus,
      dependents_bonus: dependentsBonus,
      awards_bonus: awardsBonus,
      
      indexation_amount: 0,
      deductions: 0,
      
      gross_amount: grossAmount,
      tax_amount: taxAmount,
      net_amount: netAmount,
      
      formula_version: this.config.general.formula_version,
      calculation_steps: steps,
    };

    return {
      benefit,
      summary: {
        monthly: netAmount,
        annual: netAmount * 12,
        effective_years: effectiveYears,
        pension_percentage: pensionPercentage,
      },
    };
  }

  /**
   * Get service coefficient based on EFFECTIVE years
   */
  private getServiceCoefficient(effectiveYears: number): number {
    if (effectiveYears < 15) return 0.90;
    if (effectiveYears < 20) return 0.95;
    if (effectiveYears < 25) return 1.00;
    if (effectiveYears < 30) return 1.10;
    if (effectiveYears < 35) return 1.20;
    return 1.30;
  }

  private getServiceCoefficientDescription(years: number): string {
    if (years < 15) return 'Less than 15 years: 0.90';
    if (years < 20) return '15-19 years: 0.95';
    if (years < 25) return '20-24 years: 1.00 (standard)';
    if (years < 30) return '25-29 years: 1.10 (+10%)';
    if (years < 35) return '30-34 years: 1.20 (+20%)';
    return '35+ years: 1.30 (+30%)';
  }

  /**
   * Get rank coefficient
   */
  private getRankCoefficient(rank?: MilitaryRank): number {
    if (!rank) return 1.0;
    return this.config.military.rank_coefficients[rank] || 1.0;
  }

  /**
   * Calculate awards bonus
   */
  private calculateAwardsBonus(awards: string[], baseAmount: number): number {
    const awardRates: Record<string, number> = {
      'hero_of_ukraine': 0.25,
      'order_bohdan_khmelnytsky': 0.15,
      'order_courage': 0.10,
      'medal_military_service': 0.05,
    };

    return awards.reduce((total, award) => {
      return total + (baseAmount * (awardRates[award] || 0));
    }, 0);
  }

  private generateId(): string {
    return `BEN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default BenefitCalculator;
