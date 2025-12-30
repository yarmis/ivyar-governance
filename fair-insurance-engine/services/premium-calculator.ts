/**
 * Insurance Premium Calculator
 */

import { InsuranceConfig, defaultConfig } from '../config/insurance-config';

export interface PremiumInput {
  product_code: string;
  coverage_amount: number;
  age: number;
  is_military: boolean;
  is_pensioner: boolean;
  is_combat_veteran: boolean;
  existing_policies: number;
  risk_category: 'low' | 'medium' | 'high';
}

export interface PremiumResult {
  base_premium: number;
  age_adjustment: number;
  risk_adjustment: number;
  military_discount: number;
  pensioner_discount: number;
  multi_policy_discount: number;
  combat_loading: number;
  annual_premium: number;
  monthly_premium: number;
  breakdown: PremiumBreakdown[];
}

export interface PremiumBreakdown {
  item: string;
  amount: number;
  type: 'base' | 'adjustment' | 'discount' | 'loading';
}

export class PremiumCalculator {
  private config: InsuranceConfig;

  constructor(config: InsuranceConfig = defaultConfig) {
    this.config = config;
  }

  calculate(input: PremiumInput): PremiumResult {
    const breakdown: PremiumBreakdown[] = [];

    // Base premium
    const basePremium = this.calculateBasePremium(input.product_code, input.coverage_amount);
    breakdown.push({ item: 'Base Premium', amount: basePremium, type: 'base' });

    // Age adjustment
    const ageFactor = this.getAgeFactor(input.age);
    const ageAdjustment = basePremium * (ageFactor - 1);
    if (ageAdjustment !== 0) {
      breakdown.push({ item: `Age Factor (${ageFactor})`, amount: ageAdjustment, type: 'adjustment' });
    }

    // Risk adjustment
    const riskFactor = this.getRiskFactor(input.risk_category);
    const riskAdjustment = basePremium * (riskFactor - 1);
    if (riskAdjustment !== 0) {
      breakdown.push({ item: `Risk Factor (${input.risk_category})`, amount: riskAdjustment, type: 'adjustment' });
    }

    // Military discount
    let militaryDiscount = 0;
    if (input.is_military) {
      militaryDiscount = basePremium * this.config.discounts.military;
      breakdown.push({ item: 'Military Discount (15%)', amount: -militaryDiscount, type: 'discount' });
    }

    // Pensioner discount
    let pensionerDiscount = 0;
    if (input.is_pensioner) {
      pensionerDiscount = basePremium * this.config.discounts.pensioner;
      breakdown.push({ item: 'Pensioner Discount (10%)', amount: -pensionerDiscount, type: 'discount' });
    }

    // Multi-policy discount
    let multiPolicyDiscount = 0;
    if (input.existing_policies >= 1) {
      multiPolicyDiscount = basePremium * this.config.discounts.multi_policy;
      breakdown.push({ item: 'Multi-Policy Discount (5%)', amount: -multiPolicyDiscount, type: 'discount' });
    }

    // Combat loading
    let combatLoading = 0;
    if (input.is_combat_veteran) {
      combatLoading = basePremium * this.config.loadings.combat_veteran;
      breakdown.push({ item: 'Combat Veteran Loading (25%)', amount: combatLoading, type: 'loading' });
    }

    // Calculate total
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

    breakdown.push({ item: 'Annual Total', amount: annualPremium, type: 'base' });

    return {
      base_premium: basePremium,
      age_adjustment: ageAdjustment,
      risk_adjustment: riskAdjustment,
      military_discount: militaryDiscount,
      pensioner_discount: pensionerDiscount,
      multi_policy_discount: multiPolicyDiscount,
      combat_loading: combatLoading,
      annual_premium: annualPremium,
      monthly_premium: monthlyPremium,
      breakdown,
    };
  }

  private calculateBasePremium(productCode: string, coverage: number): number {
    if (productCode.startsWith('LIFE')) {
      return (coverage / 1000) * this.config.products.life.base_rate_per_1000;
    }
    
    if (productCode.startsWith('HEALTH')) {
      const plan = this.config.products.health.plans.find(p => 
        productCode.includes(p.code)
      );
      return plan?.annual_premium || 3600;
    }

    return coverage * 0.005; // Default 0.5% of coverage
  }

  private getAgeFactor(age: number): number {
    if (age <= 30) return 0.80;
    if (age <= 40) return 1.00;
    if (age <= 50) return 1.30;
    if (age <= 60) return 1.60;
    if (age <= 70) return 2.00;
    return 2.50;
  }

  private getRiskFactor(category: string): number {
    switch (category) {
      case 'low': return 0.90;
      case 'medium': return 1.00;
      case 'high': return 1.50;
      default: return 1.00;
    }
  }
}

export default PremiumCalculator;
