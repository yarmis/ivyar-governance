/**
 * Premium Calculator
 */

import { Insured, PremiumCalculation, PensionIntegrationData } from '../models/types';
import { InsuranceConfig } from '../config/insurance-config';

export interface PremiumCalculationInput {
  productCode: string;
  coverageAmount: number;
  insured: Insured;
  pensionData?: PensionIntegrationData;
}

export class PremiumCalculator {
  private config: InsuranceConfig;

  constructor(config: InsuranceConfig) {
    this.config = config;
  }

  /**
   * Calculate premium
   */
  calculate(input: PremiumCalculationInput): PremiumCalculation {
    const { productCode, coverageAmount, insured, pensionData } = input;
    
    // Base premium
    const basePremium = this.calculateBasePremium(productCode, coverageAmount);
    
    // Age adjustment
    const ageAdjustment = this.calculateAgeAdjustment(insured.date_of_birth, basePremium);
    
    // Risk adjustment
    const riskAdjustment = this.calculateRiskAdjustment(insured.risk_category, basePremium);
    
    // Military discount
    const militaryDiscount = this.calculateMilitaryDiscount(insured, basePremium);
    
    // Pensioner discount
    const pensionerDiscount = pensionData 
      ? basePremium * this.config.products.life.pensioner_discount
      : 0;
    
    // Combat loading
    const combatLoading = insured.combat_service 
      ? basePremium * this.config.products.life.combat_loading
      : 0;
    
    // Multi-policy discount (mock)
    const multiPolicyDiscount = 0;
    
    // Calculate annual premium
    const annualPremium = Math.round(
      basePremium + 
      ageAdjustment + 
      riskAdjustment + 
      combatLoading - 
      militaryDiscount - 
      pensionerDiscount - 
      multiPolicyDiscount
    );
    
    const monthlyPremium = Math.round(annualPremium / 12);

    return {
      product_code: productCode,
      coverage_amount: coverageAmount,
      base_premium: basePremium,
      age_adjustment: ageAdjustment,
      risk_adjustment: riskAdjustment,
      military_discount: militaryDiscount,
      pensioner_discount: pensionerDiscount,
      multi_policy_discount: multiPolicyDiscount,
      combat_loading: combatLoading,
      annual_premium: annualPremium,
      monthly_premium: monthlyPremium,
      calculation_date: new Date().toISOString(),
    };
  }

  private calculateBasePremium(productCode: string, coverage: number): number {
    const rate = this.config.products.life.base_rate_per_1000;
    return (coverage / 1000) * rate;
  }

  private calculateAgeAdjustment(dateOfBirth: string, basePremium: number): number {
    const age = this.calculateAge(dateOfBirth);
    let factor = 1.0;
    
    if (age <= 30) factor = 0.8;
    else if (age <= 40) factor = 1.0;
    else if (age <= 50) factor = 1.3;
    else if (age <= 60) factor = 1.6;
    else if (age <= 70) factor = 2.0;
    else factor = 2.5;
    
    return basePremium * (factor - 1);
  }

  private calculateRiskAdjustment(riskCategory: string, basePremium: number): number {
    const factors = this.config.underwriting.risk_factors;
    const factor = factors[riskCategory as keyof typeof factors] || 1.0;
    return basePremium * (factor - 1);
  }

  private calculateMilitaryDiscount(insured: Insured, basePremium: number): number {
    if (insured.military_status === 'active_duty' || 
        insured.military_status === 'veteran' ||
        insured.military_status === 'retired') {
      return basePremium * this.config.products.life.military_discount;
    }
    return 0;
  }

  private calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}

export default PremiumCalculator;
