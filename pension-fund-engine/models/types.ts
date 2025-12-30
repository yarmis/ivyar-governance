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
