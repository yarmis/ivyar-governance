/**
 * Pension Fund Configuration
 */

import { MilitaryRank, DisabilityGroup, PensionType } from '../models/types';

export interface PensionConfig {
  general: GeneralConfig;
  military: MilitaryPensionConfig;
  eligibility: EligibilityConfig;
  indexation: IndexationConfig;
  payments: PaymentConfig;
  limits: LimitConfig;
}

export interface GeneralConfig {
  currency: string;
  minimum_pension: number;
  maximum_pension: number;
  tax_rate: number;
  formula_version: string;
}

export interface MilitaryPensionConfig {
  base_percentage: number; // % of salary for minimum service
  year_increment: number; // Additional % per year over minimum
  max_percentage: number; // Maximum % of salary
  combat_multiplier: number; // Combat service year multiplier
  special_conditions_multiplier: number;
  rank_coefficients: Record<MilitaryRank, number>;
  disability_coefficients: Record<DisabilityGroup, number>;
}

export interface EligibilityConfig {
  military: {
    min_age: number;
    min_service_years: number;
    min_combat_years_for_early: number;
  };
  government: {
    male_retirement_age: number;
    female_retirement_age: number;
    min_service_years: number;
  };
  disability: {
    min_service_years: number;
    combat_service_required: boolean;
  };
}

export interface IndexationConfig {
  auto_indexation: boolean;
  indexation_frequency: 'monthly' | 'quarterly' | 'annually';
  min_inflation_threshold: number;
  max_single_indexation: number;
}

export interface PaymentConfig {
  payment_day: number; // Day of month
  retry_attempts: number;
  retry_delay_hours: number;
  batch_size: number;
}

export interface LimitConfig {
  max_dependents: number;
  max_retroactive_months: number;
  max_one_time_payment: number;
}

// Default Configuration (Ukrainian Military Pension System)
export const defaultConfig: PensionConfig = {
  general: {
    currency: 'UAH',
    minimum_pension: 3000,
    maximum_pension: 150000,
    tax_rate: 0, // Military pensions are tax-exempt in Ukraine
    formula_version: '2025.1',
  },
  
  military: {
    base_percentage: 50, // 50% of salary for 20 years
    year_increment: 2, // +2% for each year over 20
    max_percentage: 90, // Maximum 90% of salary
    combat_multiplier: 3, // 1 combat year = 3 regular years
    special_conditions_multiplier: 1.5,
    
    rank_coefficients: {
      [MilitaryRank.SOLDIER]: 1.0,
      [MilitaryRank.SENIOR_SOLDIER]: 1.02,
      [MilitaryRank.JUNIOR_SERGEANT]: 1.05,
      [MilitaryRank.SERGEANT]: 1.08,
      [MilitaryRank.SENIOR_SERGEANT]: 1.10,
      [MilitaryRank.CHIEF_SERGEANT]: 1.12,
      [MilitaryRank.STAFF_SERGEANT]: 1.15,
      [MilitaryRank.MASTER_SERGEANT]: 1.18,
      [MilitaryRank.JUNIOR_LIEUTENANT]: 1.20,
      [MilitaryRank.LIEUTENANT]: 1.25,
      [MilitaryRank.SENIOR_LIEUTENANT]: 1.30,
      [MilitaryRank.CAPTAIN]: 1.35,
      [MilitaryRank.MAJOR]: 1.45,
      [MilitaryRank.LIEUTENANT_COLONEL]: 1.55,
      [MilitaryRank.COLONEL]: 1.70,
      [MilitaryRank.BRIGADIER_GENERAL]: 2.00,
      [MilitaryRank.MAJOR_GENERAL]: 2.20,
      [MilitaryRank.LIEUTENANT_GENERAL]: 2.40,
      [MilitaryRank.GENERAL]: 2.60,
    },
    
    disability_coefficients: {
      [DisabilityGroup.GROUP_1]: 1.50, // +50% for Group 1
      [DisabilityGroup.GROUP_2]: 1.30, // +30% for Group 2
      [DisabilityGroup.GROUP_3]: 1.15, // +15% for Group 3
    },
  },
  
  eligibility: {
    military: {
      min_age: 45,
      min_service_years: 20,
      min_combat_years_for_early: 2,
    },
    government: {
      male_retirement_age: 65,
      female_retirement_age: 60,
      min_service_years: 25,
    },
    disability: {
      min_service_years: 0,
      combat_service_required: false,
    },
  },
  
  indexation: {
    auto_indexation: true,
    indexation_frequency: 'annually',
    min_inflation_threshold: 0.03, // 3%
    max_single_indexation: 0.20, // 20% max single increase
  },
  
  payments: {
    payment_day: 5,
    retry_attempts: 3,
    retry_delay_hours: 24,
    batch_size: 1000,
  },
  
  limits: {
    max_dependents: 5,
    max_retroactive_months: 12,
    max_one_time_payment: 500000,
  },
};

export default defaultConfig;
