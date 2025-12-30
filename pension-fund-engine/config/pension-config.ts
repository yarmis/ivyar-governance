/**
 * Pension Fund Engine - Configuration
 * Ukrainian Military Pension System Parameters
 */

import { MilitaryRank, DisabilityGroup, DisabilityCause } from '../models/types';

export interface PensionConfig {
  general: {
    currency: string;
    minimum_pension: number;
    maximum_pension: number;
    tax_rate: number;
    formula_version: string;
  };
  
  military: {
    base_percentage: number;          // Starting % (for minimum service)
    year_increment: number;           // % increase per year over minimum
    max_percentage: number;           // Maximum % of salary
    combat_year_multiplier: number;   // Combat year = X regular years
    combat_bonus_rate: number;        // Additional % per combat year
    rank_coefficients: Record<string, number>;
    disability_rates: Record<string, number>;
    disability_cause_multipliers: Record<string, number>;
  };
  
  eligibility: {
    military: {
      min_age: number;
      min_service_years: number;
      early_retirement_combat_years: number;
    };
    government: {
      min_age_male: number;
      min_age_female: number;
      min_service_years: number;
    };
  };
  
  indexation: {
    auto_enabled: boolean;
    min_inflation_threshold: number;
    max_single_adjustment: number;
    frequency: 'annual' | 'semi_annual' | 'quarterly';
  };
  
  payment: {
    day_of_month: number;
    retry_attempts: number;
    retry_delay_hours: number;
    batch_size: number;
  };
  
  limits: {
    max_dependents: number;
    max_retroactive_months: number;
    max_one_time_payment: number;
  };
}

export const defaultConfig: PensionConfig = {
  general: {
    currency: 'UAH',
    minimum_pension: 3000,
    maximum_pension: 150000,
    tax_rate: 0,  // Military pensions are tax-exempt
    formula_version: '2025.1',
  },
  
  military: {
    base_percentage: 50,        // 50% base for 20 years
    year_increment: 2,          // +2% per year over 20
    max_percentage: 90,         // Cap at 90%
    combat_year_multiplier: 3,  // 1 combat year = 3 regular years
    combat_bonus_rate: 0.02,    // +2% per combat year
    
    rank_coefficients: {
      // Enlisted
      [MilitaryRank.SOLDIER]: 1.00,
      [MilitaryRank.SENIOR_SOLDIER]: 1.02,
      [MilitaryRank.JUNIOR_SERGEANT]: 1.05,
      [MilitaryRank.SERGEANT]: 1.08,
      [MilitaryRank.SENIOR_SERGEANT]: 1.10,
      [MilitaryRank.CHIEF_SERGEANT]: 1.12,
      [MilitaryRank.STAFF_SERGEANT]: 1.15,
      [MilitaryRank.MASTER_SERGEANT]: 1.18,
      [MilitaryRank.SENIOR_MASTER_SERGEANT]: 1.20,
      // Junior Officers
      [MilitaryRank.JUNIOR_LIEUTENANT]: 1.22,
      [MilitaryRank.LIEUTENANT]: 1.25,
      [MilitaryRank.SENIOR_LIEUTENANT]: 1.30,
      [MilitaryRank.CAPTAIN]: 1.35,
      // Senior Officers
      [MilitaryRank.MAJOR]: 1.45,
      [MilitaryRank.LIEUTENANT_COLONEL]: 1.55,
      [MilitaryRank.COLONEL]: 1.70,
      // Generals
      [MilitaryRank.BRIGADIER_GENERAL]: 2.00,
      [MilitaryRank.MAJOR_GENERAL]: 2.20,
      [MilitaryRank.LIEUTENANT_GENERAL]: 2.40,
      [MilitaryRank.GENERAL]: 2.60,
    },
    
    disability_rates: {
      [DisabilityGroup.GROUP_1]: 0.50,  // +50%
      [DisabilityGroup.GROUP_2]: 0.30,  // +30%
      [DisabilityGroup.GROUP_3]: 0.15,  // +15%
    },
    
    disability_cause_multipliers: {
      [DisabilityCause.COMBAT]: 1.50,         // +50% for combat
      [DisabilityCause.COMBAT_ILLNESS]: 1.30, // +30% for combat illness
      [DisabilityCause.SERVICE]: 1.20,        // +20% for service
      [DisabilityCause.SERVICE_ILLNESS]: 1.10,// +10% for service illness
      [DisabilityCause.GENERAL]: 1.00,        // No multiplier
    },
  },
  
  eligibility: {
    military: {
      min_age: 45,
      min_service_years: 20,
      early_retirement_combat_years: 2,  // 2+ combat years allows early retirement
    },
    government: {
      min_age_male: 65,
      min_age_female: 60,
      min_service_years: 25,
    },
  },
  
  indexation: {
    auto_enabled: true,
    min_inflation_threshold: 0.03,  // 3% minimum inflation to trigger
    max_single_adjustment: 0.20,    // 20% max single adjustment
    frequency: 'annual',
  },
  
  payment: {
    day_of_month: 5,
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
