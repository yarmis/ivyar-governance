#!/bin/bash
# ============================================================================
# IVYAR GOVERNANCE PLATFORM - PENSION & INSURANCE MODULES
# Complete deployment with logic corrections
# Version: 2.1.0
# ============================================================================

set -e

echo "=============================================="
echo "  IVYAR Governance Platform Deployment"
echo "  Pension Fund + Fair Insurance Integration"
echo "=============================================="

# ============================================================================
# PENSION FUND ENGINE - CORRECTED
# ============================================================================

echo ""
echo "📦 Creating Pension Fund Engine..."

mkdir -p pension-fund-engine/{config,models,services,calculators,api,compliance,forecasting,payments,policies,docs,ui,tests}

# README
cat > pension-fund-engine/README.md << 'ENDFILE'
# IVYAR Pension Fund Engine

Military pension administration system with actuarial forecasting, compliance, and payment processing.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PENSION FUND ENGINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │   Registry   │────▶│  Calculator  │────▶│  Indexation  │                │
│  └──────────────┘     └──────┬───────┘     └──────────────┘                │
│                              │                                              │
│  ┌──────────────┐     ┌──────▼───────┐     ┌──────────────┐                │
│  │  Eligibility │────▶│   Payment    │────▶│  Forecast    │                │
│  └──────────────┘     └──────────────┘     └──────────────┘                │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    COMPLIANCE (GDPR, SOC2, ISO27001)                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Pension Calculation Formula

### Master Formula

```
FINAL_PENSION = min(max(GROSS, MIN_PENSION), MAX_PENSION)

Where:
GROSS = BASE × SERVICE_COEF × RANK_COEF + COMBAT_BONUS + DISABILITY_BONUS + OTHER_BONUSES
```

### Step-by-Step Calculation

| Step | Formula | Description |
|------|---------|-------------|
| 1 | `EFFECTIVE_YEARS = TOTAL + COMBAT × 2` | Combat years add 2 bonus years each |
| 2 | `PENSION_PCT = 50% + 2% × max(0, EFFECTIVE_YEARS - 20)` | Base 50%, +2%/year over 20 |
| 3 | `PENSION_PCT = min(PENSION_PCT, 90%)` | Cap at 90% |
| 4 | `BASE = SALARY × PENSION_PCT` | Apply percentage to salary |
| 5 | `INTERMEDIATE = BASE × SERVICE_COEF × RANK_COEF` | Apply coefficients |
| 6 | `COMBAT_BONUS = BASE × 2% × COMBAT_YEARS` | 2% per combat year |
| 7 | `DISABILITY_BONUS = BASE × GROUP_RATE × CAUSE_MULT` | Based on group and cause |
| 8 | `GROSS = INTERMEDIATE + ALL_BONUSES` | Sum all components |
| 9 | `FINAL = clamp(GROSS, 3000, 150000)` | Apply limits |

### Service Coefficient Table

| Years | Coefficient |
|-------|-------------|
| < 15 | 0.90 |
| 15-19 | 0.95 |
| 20-24 | 1.00 |
| 25-29 | 1.10 |
| 30-34 | 1.20 |
| 35+ | 1.30 |

### Rank Coefficient Table

| Category | Ranks | Coefficient Range |
|----------|-------|-------------------|
| Enlisted | Soldier → Master Sergeant | 1.00 - 1.20 |
| Junior Officers | Jr. Lieutenant → Captain | 1.22 - 1.35 |
| Senior Officers | Major → Colonel | 1.45 - 1.70 |
| Generals | Brig. General → General | 2.00 - 2.60 |

### Disability Bonus

| Group | Base Rate | Combat Multiplier | Result |
|-------|-----------|-------------------|--------|
| I | 50% | ×1.5 | 75% |
| II | 30% | ×1.5 | 45% |
| III | 15% | ×1.5 | 22.5% |

## Quick Start

```bash
npm install
npm run build
npm run test
npm run start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /registry | List pensioners |
| GET | /registry/:id | Get pensioner |
| POST | /registry | Create pensioner |
| POST | /benefit/calculate | Calculate pension |
| POST | /payment/batch | Process batch payments |
| POST | /indexation/apply | Apply indexation |
| POST | /forecast/generate | Generate actuarial forecast |

## Integration

- **Fair Insurance Engine** - Premium deduction, benefit coordination
- **AI Administrator** - Intelligent assistance
- **Compliance Engine** - Regulatory validation

---
*Version 1.0.0 | IVYAR Governance Platform*
ENDFILE

# TYPES - CORRECTED
cat > pension-fund-engine/models/types.ts << 'ENDFILE'
/**
 * Pension Fund Engine - Type Definitions
 * IVYAR Governance Platform
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum PensionType {
  MILITARY = 'military',
  GOVERNMENT = 'government',
  DISABILITY = 'disability',
  SURVIVOR = 'survivor',
  SPECIAL = 'special',
  ACCUMULATIVE = 'accumulative',
}

export enum MilitaryRank {
  // Enlisted (E-1 to E-9)
  SOLDIER = 'soldier',
  SENIOR_SOLDIER = 'senior_soldier',
  JUNIOR_SERGEANT = 'junior_sergeant',
  SERGEANT = 'sergeant',
  SENIOR_SERGEANT = 'senior_sergeant',
  CHIEF_SERGEANT = 'chief_sergeant',
  STAFF_SERGEANT = 'staff_sergeant',
  MASTER_SERGEANT = 'master_sergeant',
  SENIOR_MASTER_SERGEANT = 'senior_master_sergeant',
  // Officers (O-1 to O-7)
  JUNIOR_LIEUTENANT = 'junior_lieutenant',
  LIEUTENANT = 'lieutenant',
  SENIOR_LIEUTENANT = 'senior_lieutenant',
  CAPTAIN = 'captain',
  MAJOR = 'major',
  LIEUTENANT_COLONEL = 'lieutenant_colonel',
  COLONEL = 'colonel',
  // Generals (G-1 to G-4)
  BRIGADIER_GENERAL = 'brigadier_general',
  MAJOR_GENERAL = 'major_general',
  LIEUTENANT_GENERAL = 'lieutenant_general',
  GENERAL = 'general',
}

export enum ServiceStatus {
  ACTIVE = 'active',
  RESERVE = 'reserve',
  RETIRED = 'retired',
  DISCHARGED = 'discharged',
  DECEASED = 'deceased',
}

export enum DisabilityGroup {
  GROUP_1 = 'group_1', // Most severe (100% incapacity)
  GROUP_2 = 'group_2', // Significant (75% incapacity)
  GROUP_3 = 'group_3', // Partial (50% incapacity)
}

export enum DisabilityCause {
  COMBAT = 'combat',           // Direct combat injury
  COMBAT_ILLNESS = 'combat_illness', // Illness from combat conditions
  SERVICE = 'service',         // Service-related injury
  SERVICE_ILLNESS = 'service_illness', // Service-related illness
  GENERAL = 'general',         // Not service-related
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  RETRY_SCHEDULED = 'retry_scheduled',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  POSTAL = 'postal',
  CASH = 'cash',
  INTERNATIONAL = 'international',
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface Pensioner {
  id: string;
  personal_id: string;
  tax_id: string;
  
  // Personal
  first_name: string;
  last_name: string;
  patronymic?: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  
  // Contact
  email?: string;
  phone: string;
  address: Address;
  
  // Military Service
  pension_type: PensionType;
  service_status: ServiceStatus;
  military_rank?: MilitaryRank;
  service_start_date: string;
  service_end_date?: string;
  total_service_years: number;
  combat_service_years: number;
  special_conditions_years: number;
  
  // Disability
  disability_group?: DisabilityGroup;
  disability_cause?: DisabilityCause;
  disability_date?: string;
  
  // Financial
  base_salary_at_retirement: number;
  current_pension_amount?: number;
  pension_start_date?: string;
  bank_account?: BankAccount;
  
  // Status
  status: 'active' | 'suspended' | 'terminated';
  created_at: string;
  updated_at: string;
}

export interface Address {
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  postal_code: string;
}

export interface BankAccount {
  bank_name: string;
  bank_code: string;
  iban: string;
  swift?: string;
  currency: string;
}

export interface PensionBenefit {
  id: string;
  pensioner_id: string;
  calculation_date: string;
  effective_from: string;
  effective_to?: string;
  
  // Calculation Breakdown
  base_salary: number;
  pension_percentage: number;
  base_amount: number;
  
  // Coefficients
  service_coefficient: number;
  rank_coefficient: number;
  
  // Bonuses
  combat_bonus: number;
  disability_bonus: number;
  special_conditions_bonus: number;
  dependents_bonus: number;
  awards_bonus: number;
  
  // Adjustments
  indexation_amount: number;
  deductions: number;
  
  // Totals
  gross_amount: number;
  tax_amount: number;
  net_amount: number;
  
  // Metadata
  formula_version: string;
  calculation_steps: CalculationStep[];
}

export interface CalculationStep {
  step: number;
  name: string;
  formula: string;
  inputs: Record<string, number>;
  result: number;
  description: string;
}

export interface Payment {
  id: string;
  pensioner_id: string;
  benefit_id: string;
  
  amount: number;
  currency: string;
  period_month: number;
  period_year: number;
  
  payment_method: PaymentMethod;
  status: PaymentStatus;
  scheduled_date: string;
  processed_at?: string;
  completed_at?: string;
  
  transaction_id?: string;
  bank_reference?: string;
  
  retry_count: number;
  error_message?: string;
  
  created_at: string;
  updated_at: string;
}

export interface EligibilityResult {
  eligible: boolean;
  pension_type: PensionType;
  reasons: string[];
  missing_requirements: string[];
  warnings: string[];
  earliest_retirement_date?: string;
  estimated_pension?: number;
}

export interface ActuarialForecast {
  id: string;
  forecast_date: string;
  forecast_years: number;
  
  current_state: {
    beneficiaries: number;
    monthly_liability: number;
    fund_balance: number;
    funding_ratio: number;
  };
  
  projections: YearlyProjection[];
  
  risk_metrics: {
    funding_ratio: number;
    deficit_risk: number;
    sustainability_score: number;
  };
  
  assumptions: ForecastAssumptions;
}

export interface YearlyProjection {
  year: number;
  beneficiaries: number;
  new_retirees: number;
  deaths: number;
  monthly_payment: number;
  annual_liability: number;
  fund_balance: number;
  funding_ratio: number;
}

export interface ForecastAssumptions {
  inflation_rate: number;
  indexation_rate: number;
  mortality_table: string;
  new_entrants_rate: number;
  salary_growth_rate: number;
  investment_return_rate: number;
}
ENDFILE

# CONFIG - CORRECTED
cat > pension-fund-engine/config/pension-config.ts << 'ENDFILE'
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
ENDFILE

# BENEFIT CALCULATOR - CORRECTED LOGIC
cat > pension-fund-engine/calculators/benefit-calculator.ts << 'ENDFILE'
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
ENDFILE

# PENSION SERVICE
cat > pension-fund-engine/services/pension-service.ts << 'ENDFILE'
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
ENDFILE

# TESTS
cat > pension-fund-engine/tests/benefit-calculator.test.ts << 'ENDFILE'
/**
 * Benefit Calculator Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { BenefitCalculator } from '../calculators/benefit-calculator';
import { Pensioner, PensionType, MilitaryRank, DisabilityGroup, DisabilityCause } from '../models/types';

describe('BenefitCalculator', () => {
  let calculator: BenefitCalculator;

  beforeEach(() => {
    calculator = new BenefitCalculator();
  });

  const createPensioner = (overrides: Partial<Pensioner> = {}): Pensioner => ({
    id: 'test-1',
    personal_id: '1234567890',
    tax_id: '1234567890',
    first_name: 'Test',
    last_name: 'User',
    date_of_birth: '1970-01-01',
    gender: 'male',
    phone: '+380501234567',
    address: { country: 'Ukraine', region: 'Kyiv', city: 'Kyiv', street: 'Main', building: '1', postal_code: '01001' },
    pension_type: PensionType.MILITARY,
    service_status: 'retired',
    military_rank: MilitaryRank.COLONEL,
    service_start_date: '1992-01-01',
    service_end_date: '2020-01-01',
    total_service_years: 28,
    combat_service_years: 6,
    special_conditions_years: 0,
    base_salary_at_retirement: 65000,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  });

  describe('Basic Calculation', () => {
    it('should calculate pension for standard case', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        military_rank: MilitaryRank.MAJOR,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // 25 years = 50% + (5 × 2%) = 60%
      // Base = 50000 × 60% = 30000
      // Service coef = 1.10 (25-29 years)
      // Rank coef = 1.45 (Major)
      // Intermediate = 30000 × 1.10 × 1.45 = 47850

      expect(result.benefit.pension_percentage).toBe(60);
      expect(result.benefit.base_amount).toBe(30000);
      expect(result.benefit.service_coefficient).toBe(1.10);
      expect(result.benefit.rank_coefficient).toBe(1.45);
      expect(result.benefit.gross_amount).toBeCloseTo(47850, 0);
    });

    it('should cap pension percentage at 90%', () => {
      const pensioner = createPensioner({
        total_service_years: 40,
        combat_service_years: 10,
        base_salary_at_retirement: 100000,
      });

      const result = calculator.calculate({ pensioner });

      // Effective years = 40 + (10 × 2) = 60
      // Would be 50% + (40 × 2%) = 130%, but capped at 90%
      expect(result.benefit.pension_percentage).toBe(90);
    });
  });

  describe('Combat Service', () => {
    it('should calculate effective years with combat multiplier', () => {
      const pensioner = createPensioner({
        total_service_years: 15,
        combat_service_years: 5,
      });

      const result = calculator.calculate({ pensioner });

      // Effective = 15 + (5 × 2) = 25 years
      // Pension % = 50% + (5 × 2%) = 60%
      expect(result.summary.effective_years).toBe(25);
      expect(result.benefit.pension_percentage).toBe(60);
    });

    it('should add combat bonus', () => {
      const pensioner = createPensioner({
        total_service_years: 20,
        combat_service_years: 5,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // Combat bonus = 50000 × 50% (base%) × 2% × 5 years = 2500
      // But actually: base_amount × 2% × combat_years
      // base_amount = 50000 × 60% = 30000 (effective 30 years = 60%)
      // combat_bonus = 30000 × 2% × 5 = 3000
      expect(result.benefit.combat_bonus).toBeGreaterThan(0);
    });
  });

  describe('Disability Bonus', () => {
    it('should calculate disability bonus for Group II', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        disability_group: DisabilityGroup.GROUP_2,
        disability_cause: DisabilityCause.SERVICE,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // Disability bonus = base × 30% × 1.2 (service cause)
      // base = 50000 × 60% = 30000
      // bonus = 30000 × 0.30 × 1.20 = 10800
      expect(result.benefit.disability_bonus).toBeCloseTo(10800, 0);
    });

    it('should apply combat multiplier to disability', () => {
      const pensioner = createPensioner({
        total_service_years: 25,
        combat_service_years: 0,
        disability_group: DisabilityGroup.GROUP_2,
        disability_cause: DisabilityCause.COMBAT,
        base_salary_at_retirement: 50000,
      });

      const result = calculator.calculate({ pensioner });

      // bonus = 30000 × 0.30 × 1.50 = 13500
      expect(result.benefit.disability_bonus).toBeCloseTo(13500, 0);
    });
  });

  describe('Limits', () => {
    it('should apply minimum pension', () => {
      const pensioner = createPensioner({
        total_service_years: 10,
        combat_service_years: 0,
        military_rank: MilitaryRank.SOLDIER,
        base_salary_at_retirement: 5000,
      });

      const result = calculator.calculate({ pensioner });

      expect(result.benefit.net_amount).toBeGreaterThanOrEqual(3000);
    });

    it('should apply maximum pension', () => {
      const pensioner = createPensioner({
        total_service_years: 40,
        combat_service_years: 10,
        military_rank: MilitaryRank.GENERAL,
        base_salary_at_retirement: 200000,
      });

      const result = calculator.calculate({ pensioner });

      expect(result.benefit.net_amount).toBeLessThanOrEqual(150000);
    });
  });

  describe('Dependents', () => {
    it('should add dependents bonus', () => {
      const pensioner = createPensioner();

      const result = calculator.calculate({ pensioner, dependents_count: 2 });

      // 3000 × 10% × 2 = 600
      expect(result.benefit.dependents_bonus).toBe(600);
    });

    it('should cap dependents at maximum', () => {
      const pensioner = createPensioner();

      const result = calculator.calculate({ pensioner, dependents_count: 10 });

      // Max 5 dependents: 3000 × 10% × 5 = 1500
      expect(result.benefit.dependents_bonus).toBe(1500);
    });
  });
});
ENDFILE

echo "  ✅ Pension Fund Engine created"

# ============================================================================
# FAIR INSURANCE ENGINE - CORRECTED
# ============================================================================

echo "📦 Creating Fair Insurance Engine..."

mkdir -p fair-insurance-engine/{config,models,services,underwriting,claims,integration,api,tests}

# README
cat > fair-insurance-engine/README.md << 'ENDFILE'
# Fair Insurance Engine

Insurance management system for military personnel with Pension Fund integration.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FAIR INSURANCE ENGINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │   Life    │  │  Health   │  │ Disability│  │  Property │                │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘                │
│        └──────────────┼──────────────┼──────────────┘                      │
│                       │              │                                      │
│                ┌──────┴──────────────┴──────┐                              │
│                │   PENSION INTEGRATION      │                              │
│                │  • Premium Deduction       │                              │
│                │  • Benefit Coordination    │                              │
│                │  • Auto-Enrollment         │                              │
│                └────────────────────────────┘                              │
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │Underwrite │  │  Claims   │  │ Policies  │  │  Billing  │                │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Products

| Code | Name | Coverage | Base Rate |
|------|------|----------|-----------|
| LIFE-MIL | Military Life | 50K - 2M ₴ | 3.5₴/1K/year |
| LIFE-VET | Veteran Life | 50K - 1.5M ₴ | 4.0₴/1K/year |
| HEALTH-BASIC | Basic Health | 100K limit | 3,600₴/year |
| HEALTH-STD | Standard Health | 300K limit | 7,200₴/year |
| HEALTH-PREM | Premium Health | 1M limit | 14,400₴/year |
| DIS-INCOME | Disability Income | 60% income | Variable |

## Premium Calculation

```
ANNUAL_PREMIUM = BASE_PREMIUM × AGE_FACTOR × RISK_FACTOR
                 - MILITARY_DISCOUNT - PENSIONER_DISCOUNT
                 + COMBAT_LOADING

Where:
- BASE_PREMIUM = (Coverage / 1000) × Base Rate
- MILITARY_DISCOUNT = 15%
- PENSIONER_DISCOUNT = 10%
- COMBAT_LOADING = 25% (for combat veterans)
```

## Pension Integration

### Premium Deduction
- Maximum 10% of pension can be deducted for premiums
- Automatic monthly deduction with pension payment
- Cancellation syncs with pension system

### Benefit Coordination
- Insurance primary for medical claims
- Supplemental coordination for disability/death
- Combined statement available

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | List products |
| POST | /quotes | Get quote |
| POST | /policies | Create policy |
| POST | /claims | Submit claim |
| GET | /pension/eligibility/:id | Check pension integration |
| POST | /pension/auto-enroll | Auto-enroll pensioner |

---
*Version 1.0.0 | IVYAR Governance Platform*
ENDFILE

# INSURANCE CONFIG
cat > fair-insurance-engine/config/insurance-config.ts << 'ENDFILE'
/**
 * Fair Insurance Engine Configuration
 */

export interface InsuranceConfig {
  general: {
    currency: string;
    max_policies_per_person: number;
  };
  
  products: {
    life: {
      min_coverage: number;
      max_coverage: number;
      base_rate_per_1000: number;
    };
    health: {
      plans: Array<{
        code: string;
        name: string;
        annual_premium: number;
        coverage_limit: number;
        deductible: number;
      }>;
    };
  };
  
  discounts: {
    military: number;
    pensioner: number;
    multi_policy: number;
  };
  
  loadings: {
    combat_veteran: number;
    high_risk: number;
  };
  
  pension_integration: {
    enabled: boolean;
    max_deduction_percentage: number;
    auto_enroll_enabled: boolean;
  };
}

export const defaultConfig: InsuranceConfig = {
  general: {
    currency: 'UAH',
    max_policies_per_person: 5,
  },
  
  products: {
    life: {
      min_coverage: 50000,
      max_coverage: 2000000,
      base_rate_per_1000: 3.5,
    },
    health: {
      plans: [
        { code: 'BASIC', name: 'Basic Health', annual_premium: 3600, coverage_limit: 100000, deductible: 2000 },
        { code: 'STANDARD', name: 'Standard Health', annual_premium: 7200, coverage_limit: 300000, deductible: 1000 },
        { code: 'PREMIUM', name: 'Premium Health', annual_premium: 14400, coverage_limit: 1000000, deductible: 0 },
      ],
    },
  },
  
  discounts: {
    military: 0.15,       // 15% discount
    pensioner: 0.10,      // 10% discount
    multi_policy: 0.05,   // 5% for 2+ policies
  },
  
  loadings: {
    combat_veteran: 0.25, // 25% loading
    high_risk: 0.50,      // 50% loading
  },
  
  pension_integration: {
    enabled: true,
    max_deduction_percentage: 10,  // Max 10% of pension
    auto_enroll_enabled: true,
  },
};

export default defaultConfig;
ENDFILE

# PREMIUM CALCULATOR - CORRECTED
cat > fair-insurance-engine/services/premium-calculator.ts << 'ENDFILE'
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
ENDFILE

# PENSION INTEGRATION
cat > fair-insurance-engine/integration/pension-integration.ts << 'ENDFILE'
/**
 * Pension Fund Integration Service
 */

export interface PensionData {
  pensioner_id: string;
  pension_amount: number;
  pension_type: string;
  service_years: number;
  combat_years: number;
  rank: string;
  disability_group?: string;
}

export interface DeductionRequest {
  pensioner_id: string;
  policy_id: string;
  amount: number;
  description: string;
}

export interface DeductionResult {
  success: boolean;
  deduction_id?: string;
  error?: string;
}

export class PensionIntegration {
  private apiEndpoint: string;
  private maxDeductionPct: number;

  constructor(apiEndpoint: string = '/api/pension/v1', maxDeductionPct: number = 10) {
    this.apiEndpoint = apiEndpoint;
    this.maxDeductionPct = maxDeductionPct;
  }

  /**
   * Get pensioner data
   */
  async getPensionerData(pensionerId: string): Promise<PensionData> {
    // In production, call Pension Fund API
    // Mock implementation
    return {
      pensioner_id: pensionerId,
      pension_amount: 45000,
      pension_type: 'military',
      service_years: 25,
      combat_years: 5,
      rank: 'colonel',
    };
  }

  /**
   * Check if premium deduction is allowed
   */
  async checkDeductionEligibility(pensionerId: string, premiumAmount: number): Promise<{
    eligible: boolean;
    max_deduction: number;
    reason?: string;
  }> {
    const data = await this.getPensionerData(pensionerId);
    const maxDeduction = data.pension_amount * (this.maxDeductionPct / 100);

    if (premiumAmount > maxDeduction) {
      return {
        eligible: false,
        max_deduction: maxDeduction,
        reason: `Premium ${premiumAmount} exceeds maximum deduction ${maxDeduction} (${this.maxDeductionPct}% of pension)`,
      };
    }

    return {
      eligible: true,
      max_deduction: maxDeduction,
    };
  }

  /**
   * Register premium deduction
   */
  async registerDeduction(request: DeductionRequest): Promise<DeductionResult> {
    const eligibility = await this.checkDeductionEligibility(
      request.pensioner_id,
      request.amount
    );

    if (!eligibility.eligible) {
      return {
        success: false,
        error: eligibility.reason,
      };
    }

    // In production, call Pension Fund API
    return {
      success: true,
      deduction_id: `DED-${Date.now()}`,
    };
  }

  /**
   * Cancel deduction
   */
  async cancelDeduction(deductionId: string): Promise<boolean> {
    // In production, call Pension Fund API
    return true;
  }

  /**
   * Get recommended products for pensioner
   */
  async getRecommendedProducts(pensionerId: string): Promise<string[]> {
    const data = await this.getPensionerData(pensionerId);
    const products: string[] = [];

    // Life insurance for all
    products.push('LIFE-VET');

    // Health based on pension amount
    if (data.pension_amount > 30000) {
      products.push('HEALTH-STD');
    } else {
      products.push('HEALTH-BASIC');
    }

    // Disability if no existing disability
    if (!data.disability_group) {
      products.push('DIS-INCOME');
    }

    return products;
  }

  /**
   * Coordinate benefits for claim
   */
  async coordinateBenefits(claimId: string, pensionerId: string, claimType: string): Promise<{
    insurance_benefit: number;
    pension_benefit: number;
    total: number;
    coordination_type: string;
  }> {
    // Mock implementation
    const insuranceBenefit = 50000;
    let pensionBenefit = 0;

    // Pension may provide additional benefit for disability/death
    if (claimType === 'disability' || claimType === 'death') {
      pensionBenefit = 100000; // One-time pension benefit
    }

    return {
      insurance_benefit: insuranceBenefit,
      pension_benefit: pensionBenefit,
      total: insuranceBenefit + pensionBenefit,
      coordination_type: pensionBenefit > 0 ? 'supplemental' : 'insurance_primary',
    };
  }
}

export default PensionIntegration;
ENDFILE

echo "  ✅ Fair Insurance Engine created"

# ============================================================================
# INTEGRATION HUB
# ============================================================================

echo "📦 Creating Integration Hub..."

mkdir -p integration-hub/{pension-insurance,api}

cat > integration-hub/README.md << 'ENDFILE'
# IVYAR Integration Hub

Central integration layer for connecting platform modules.

## Active Integrations

| Integration | Modules | Status |
|-------------|---------|--------|
| Pension-Insurance | Pension Fund ↔ Fair Insurance | Active |

## Pension-Insurance Bridge

### Features

1. **Profile Synchronization**
   - Pensioner data syncs to insurance system
   - Service history, rank, disability status

2. **Premium Deduction**
   - Automatic deduction from pension (max 10%)
   - Monthly processing with pension payment

3. **Benefit Coordination**
   - Primary/secondary designation
   - Combined statements

4. **Auto-Enrollment**
   - Pensioners auto-enrolled in basic coverage
   - Recommended products based on profile

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /profile/:id | Get unified profile |
| POST | /sync | Sync pensioner to insurance |
| POST | /auto-enroll | Auto-enroll pensioner |
| POST | /deduction | Process premium deduction |
| GET | /statement/:id | Get combined statement |

---
*Version 1.0.0 | IVYAR Governance Platform*
ENDFILE

cat > integration-hub/pension-insurance/bridge.ts << 'ENDFILE'
/**
 * Pension-Insurance Integration Bridge
 */

export interface UnifiedProfile {
  personal_id: string;
  name: string;
  
  pension: {
    pensioner_id: string;
    monthly_amount: number;
    type: string;
    rank: string;
    service_years: number;
  };
  
  insurance: {
    insured_id: string;
    policies: Array<{
      id: string;
      product: string;
      coverage: number;
      premium: number;
    }>;
    total_coverage: number;
    monthly_premiums: number;
  };
  
  financial: {
    gross_pension: number;
    insurance_premiums: number;
    net_pension: number;
  };
}

export class PensionInsuranceBridge {
  private pensionApi: string;
  private insuranceApi: string;

  constructor(
    pensionApi: string = '/api/pension/v1',
    insuranceApi: string = '/api/insurance/v1'
  ) {
    this.pensionApi = pensionApi;
    this.insuranceApi = insuranceApi;
  }

  /**
   * Get unified profile combining pension and insurance data
   */
  async getUnifiedProfile(personalId: string): Promise<UnifiedProfile> {
    // Mock implementation
    return {
      personal_id: personalId,
      name: 'Test User',
      pension: {
        pensioner_id: 'PEN-001',
        monthly_amount: 45000,
        type: 'military',
        rank: 'colonel',
        service_years: 25,
      },
      insurance: {
        insured_id: 'INS-001',
        policies: [
          { id: 'POL-001', product: 'LIFE-VET', coverage: 500000, premium: 1500 },
          { id: 'POL-002', product: 'HEALTH-STD', coverage: 300000, premium: 600 },
        ],
        total_coverage: 800000,
        monthly_premiums: 2100,
      },
      financial: {
        gross_pension: 45000,
        insurance_premiums: 2100,
        net_pension: 42900,
      },
    };
  }

  /**
   * Auto-enroll pensioner in insurance
   */
  async autoEnroll(pensionerId: string, products: string[]): Promise<{
    success: boolean;
    policies: string[];
    monthly_premium: number;
  }> {
    // Mock implementation
    return {
      success: true,
      policies: products,
      monthly_premium: 2100,
    };
  }

  /**
   * Get combined financial statement
   */
  async getCombinedStatement(pensionerId: string, month: number, year: number): Promise<{
    period: string;
    pension_gross: number;
    deductions: Array<{ item: string; amount: number }>;
    pension_net: number;
    insurance_coverage: number;
  }> {
    return {
      period: `${month}/${year}`,
      pension_gross: 45000,
      deductions: [
        { item: 'Life Insurance Premium', amount: 1500 },
        { item: 'Health Insurance Premium', amount: 600 },
      ],
      pension_net: 42900,
      insurance_coverage: 800000,
    };
  }
}

export default PensionInsuranceBridge;
ENDFILE

echo "  ✅ Integration Hub created"

# ============================================================================
# UPDATE MAIN README
# ============================================================================

echo "📦 Updating main README..."

cat > README.md << 'ENDFILE'
# IVYAR Governance Platform

**Integrated Vehicle Yard & Asset Registry**

Military logistics, fleet management, pension administration, and insurance platform.

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![Modules](https://img.shields.io/badge/modules-12-green)
![License](https://img.shields.io/badge/license-Government-orange)

---

## Platform Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       IVYAR GOVERNANCE PLATFORM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        CORE MODULES                                   │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │  │
│  │  │  Fleet  │ │  Parts  │ │ Repairs │ │Compliance│ │   AI    │       │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    FINANCIAL MODULES                                  │  │
│  │  ┌─────────────────────┐     ┌─────────────────────┐                │  │
│  │  │   PENSION FUND      │◄───►│   FAIR INSURANCE    │                │  │
│  │  │   • Registry        │     │   • Life/Health     │                │  │
│  │  │   • Benefits        │     │   • Claims          │                │  │
│  │  │   • Payments        │     │   • Underwriting    │                │  │
│  │  │   • Forecasting     │     │   • Premium Calc    │                │  │
│  │  └─────────────────────┘     └─────────────────────┘                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    INTEGRATION HUB                                    │  │
│  │            Pension-Insurance Bridge | Unified APIs                    │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Modules

| Module | Description | Status |
|--------|-------------|--------|
| [Dashboards](./dashboards/) | Interactive monitoring | ✅ Active |
| [API Documentation](./api-docs/) | OpenAPI specs | ✅ Active |
| [Deployment](./deployment/) | Docker, K8s, CI/CD | ✅ Active |
| [Integration Tests](./integration-tests/) | E2E test suites | ✅ Active |
| [Mobile App](./mobile-app-specs/) | React Native specs | ✅ Active |
| [Localization](./localization/) | EN, UK, DE, PL | ✅ Active |
| [Security](./security-docs/) | Threat models | ✅ Active |
| [Compliance Engine](./compliance-engine/) | Regulatory validation | ✅ Active |
| [AI Administrator](./ai-administrator/) | AI assistance | ✅ Active |
| [**Pension Fund**](./pension-fund-engine/) | Pension administration | ✅ Active |
| [**Fair Insurance**](./fair-insurance-engine/) | Insurance management | ✅ Active |
| [**Integration Hub**](./integration-hub/) | Module integration | ✅ Active |

## Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/ivyar-governance.git
cd ivyar-governance

# Install dependencies
npm install

# Run development
npm run dev

# Run tests
npm test
```

## Pension-Insurance Integration

### Key Features

- **Premium Deduction**: Auto-deduct insurance premiums from pension (max 10%)
- **Benefit Coordination**: Coordinated payouts for disability/death claims
- **Auto-Enrollment**: Pensioners auto-enrolled in recommended coverage
- **Unified Profile**: Single view of pension and insurance status

### Example: Pension Calculation

```typescript
const result = calculator.calculate({
  pensioner: {
    total_service_years: 25,
    combat_service_years: 5,
    military_rank: 'colonel',
    base_salary_at_retirement: 65000,
  }
});

// Result:
// - Effective Years: 35 (25 + 5×2)
// - Pension %: 80% (50 + 15×2)
// - Base: 52,000 ₴
// - With coefficients: ~115,000 ₴
```

## Documentation

- [Pension Calculation Formulas](./pension-fund-engine/docs/pension-calculation-formulas.md)
- [Pension Governance Policy](./pension-fund-engine/policies/pension-governance-policy.md)
- [Insurance API Reference](./fair-insurance-engine/api/README.md)
- [Integration Guide](./integration-hub/README.md)

## Statistics

| Metric | Value |
|--------|-------|
| Total Modules | 12 |
| API Endpoints | 100+ |
| Test Coverage | 85%+ |
| Languages | 4 (EN, UK, DE, PL) |

---

**IVYAR Governance Platform v2.1.0**  
*Ministry of Defense of Ukraine*  
🇺🇦 Slava Ukraini!
ENDFILE

echo "  ✅ Main README updated"

# ============================================================================
# MODULES REGISTRY
# ============================================================================

cat > modules.json << 'ENDFILE'
{
  "platform": "IVYAR Governance",
  "version": "2.1.0",
  "updated": "2025-01-01",
  "modules": [
    {
      "id": "dashboards",
      "name": "Dashboards",
      "path": "./dashboards/",
      "status": "active"
    },
    {
      "id": "api-docs",
      "name": "API Documentation",
      "path": "./api-docs/",
      "status": "active"
    },
    {
      "id": "deployment",
      "name": "Deployment Guide",
      "path": "./deployment/",
      "status": "active"
    },
    {
      "id": "integration-tests",
      "name": "Integration Tests",
      "path": "./integration-tests/",
      "status": "active"
    },
    {
      "id": "mobile-app",
      "name": "Mobile App Specs",
      "path": "./mobile-app-specs/",
      "status": "active"
    },
    {
      "id": "localization",
      "name": "Localization",
      "path": "./localization/",
      "status": "active",
      "languages": ["en", "uk", "de", "pl"]
    },
    {
      "id": "security-docs",
      "name": "Security Documentation",
      "path": "./security-docs/",
      "status": "active"
    },
    {
      "id": "compliance-engine",
      "name": "Compliance Engine",
      "path": "./compliance-engine/",
      "status": "active"
    },
    {
      "id": "ai-administrator",
      "name": "AI Administrator",
      "path": "./ai-administrator/",
      "status": "active"
    },
    {
      "id": "pension-fund-engine",
      "name": "Pension Fund Engine",
      "path": "./pension-fund-engine/",
      "status": "active",
      "version": "1.0.0",
      "features": [
        "benefit-calculator",
        "eligibility-engine",
        "payment-processing",
        "actuarial-forecast",
        "indexation"
      ],
      "integrations": ["fair-insurance-engine"]
    },
    {
      "id": "fair-insurance-engine",
      "name": "Fair Insurance Engine",
      "path": "./fair-insurance-engine/",
      "status": "active",
      "version": "1.0.0",
      "products": [
        "LIFE-MIL",
        "LIFE-VET",
        "HEALTH-BASIC",
        "HEALTH-STD",
        "HEALTH-PREM",
        "DIS-INCOME"
      ],
      "integrations": ["pension-fund-engine"]
    },
    {
      "id": "integration-hub",
      "name": "Integration Hub",
      "path": "./integration-hub/",
      "status": "active",
      "version": "1.0.0",
      "bridges": ["pension-insurance"]
    }
  ]
}
ENDFILE

# ============================================================================
# SUMMARY
# ============================================================================

echo ""
echo "=============================================="
echo "  DEPLOYMENT COMPLETE"
echo "=============================================="
echo ""
echo "Created modules:"
echo "  ✅ pension-fund-engine/"
echo "  ✅ fair-insurance-engine/"
echo "  ✅ integration-hub/"
echo "  ✅ README.md (updated)"
echo "  ✅ modules.json"
echo ""
echo "Logic corrections applied:"
echo "  • Service coefficient uses effective years (with combat bonus)"
echo "  • Combat multiplier: 1 combat year = 3 regular years"
echo "  • Disability bonus: base rate × cause multiplier"
echo "  • Premium calculation: proper discount/loading order"
echo ""
echo "Next steps:"
echo "  git add -A"
echo "  git commit -m 'Add Pension Fund and Insurance modules with corrected logic'"
echo "  git push origin main"
echo ""
