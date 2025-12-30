/**
 * Fair Insurance Engine Configuration
 */

import { InsuranceType, PaymentFrequency, RiskCategory } from '../models/types';

export interface InsuranceConfig {
  general: GeneralConfig;
  products: ProductConfig;
  underwriting: UnderwritingConfig;
  claims: ClaimsConfig;
  pension_integration: PensionIntegrationConfig;
}

export interface GeneralConfig {
  currency: string;
  tax_rate: number;
  admin_fee_rate: number;
  max_policies_per_person: number;
}

export interface ProductConfig {
  life: LifeInsuranceConfig;
  health: HealthInsuranceConfig;
  disability: DisabilityInsuranceConfig;
}

export interface LifeInsuranceConfig {
  min_coverage: number;
  max_coverage: number;
  base_rate_per_1000: number;
  military_discount: number;
  pensioner_discount: number;
  combat_loading: number;
}

export interface HealthInsuranceConfig {
  plans: Array<{
    code: string;
    name: string;
    annual_premium: number;
    coverage_limit: number;
    deductible: number;
  }>;
}

export interface DisabilityInsuranceConfig {
  income_replacement_rate: number;
  max_benefit_period_months: number;
  waiting_period_days: number;
}

export interface UnderwritingConfig {
  age_factors: Record<string, number>;
  risk_factors: Record<RiskCategory, number>;
  auto_approve_threshold: number;
  decline_threshold: number;
}

export interface ClaimsConfig {
  auto_approve_threshold: number;
  review_sla_days: number;
  payment_sla_days: number;
  appeal_window_days: number;
}

export interface PensionIntegrationConfig {
  enabled: boolean;
  api_endpoint: string;
  auto_enroll: boolean;
  premium_deduction_enabled: boolean;
  max_deduction_percentage: number;
  benefit_coordination: boolean;
}

// Default Configuration
export const defaultConfig: InsuranceConfig = {
  general: {
    currency: 'UAH',
    tax_rate: 0,
    admin_fee_rate: 0.05,
    max_policies_per_person: 5,
  },
  
  products: {
    life: {
      min_coverage: 50000,
      max_coverage: 2000000,
      base_rate_per_1000: 3.5, // 3.5 ₴ per 1000 ₴ coverage per year
      military_discount: 0.15, // 15% discount for military
      pensioner_discount: 0.10, // 10% discount for pensioners
      combat_loading: 0.25, // 25% loading for combat service
    },
    health: {
      plans: [
        { code: 'BASIC', name: 'Basic Health', annual_premium: 3600, coverage_limit: 100000, deductible: 2000 },
        { code: 'STANDARD', name: 'Standard Health', annual_premium: 7200, coverage_limit: 300000, deductible: 1000 },
        { code: 'PREMIUM', name: 'Premium Health', annual_premium: 14400, coverage_limit: 1000000, deductible: 0 },
      ],
    },
    disability: {
      income_replacement_rate: 0.60, // 60% of income
      max_benefit_period_months: 60,
      waiting_period_days: 30,
    },
  },
  
  underwriting: {
    age_factors: {
      '18-30': 0.8,
      '31-40': 1.0,
      '41-50': 1.3,
      '51-60': 1.6,
      '61-70': 2.0,
      '71+': 2.5,
    },
    risk_factors: {
      [RiskCategory.LOW]: 0.9,
      [RiskCategory.MEDIUM]: 1.0,
      [RiskCategory.HIGH]: 1.5,
      [RiskCategory.VERY_HIGH]: 2.0,
      [RiskCategory.DECLINED]: 999,
    },
    auto_approve_threshold: 70, // Score >= 70 auto-approved
    decline_threshold: 30, // Score < 30 declined
  },
  
  claims: {
    auto_approve_threshold: 10000, // Claims under 10k auto-approved
    review_sla_days: 5,
    payment_sla_days: 10,
    appeal_window_days: 30,
  },
  
  pension_integration: {
    enabled: true,
    api_endpoint: '/api/pension/v1',
    auto_enroll: true,
    premium_deduction_enabled: true,
    max_deduction_percentage: 10, // Max 10% of pension for premiums
    benefit_coordination: true,
  },
};

export default defaultConfig;
