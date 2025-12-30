/**
 * Pension Fund Engine - Type Definitions
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
  // Enlisted
  SOLDIER = 'soldier',
  SENIOR_SOLDIER = 'senior_soldier',
  JUNIOR_SERGEANT = 'junior_sergeant',
  SERGEANT = 'sergeant',
  SENIOR_SERGEANT = 'senior_sergeant',
  CHIEF_SERGEANT = 'chief_sergeant',
  STAFF_SERGEANT = 'staff_sergeant',
  MASTER_SERGEANT = 'master_sergeant',
  // Officers
  JUNIOR_LIEUTENANT = 'junior_lieutenant',
  LIEUTENANT = 'lieutenant',
  SENIOR_LIEUTENANT = 'senior_lieutenant',
  CAPTAIN = 'captain',
  MAJOR = 'major',
  LIEUTENANT_COLONEL = 'lieutenant_colonel',
  COLONEL = 'colonel',
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
  GROUP_1 = 'group_1', // Most severe
  GROUP_2 = 'group_2',
  GROUP_3 = 'group_3', // Least severe
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  POSTAL = 'postal',
  CASH = 'cash',
  INTERNATIONAL = 'international',
}

export enum ContributionSource {
  STATE = 'state',
  EMPLOYER = 'employer',
  EMPLOYEE = 'employee',
  DONOR = 'donor',
  MILITARY_BONUS = 'military_bonus',
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface Pensioner {
  id: string;
  personal_id: string; // National ID
  tax_id: string;
  
  // Personal Info
  first_name: string;
  last_name: string;
  patronymic?: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  
  // Contact
  email?: string;
  phone: string;
  address: Address;
  
  // Service Info
  pension_type: PensionType;
  service_status: ServiceStatus;
  military_rank?: MilitaryRank;
  
  // Service History
  service_start_date: string;
  service_end_date?: string;
  total_service_years: number;
  combat_service_years: number;
  special_conditions_years: number;
  
  // Disability (if applicable)
  disability_group?: DisabilityGroup;
  disability_cause?: 'combat' | 'service' | 'general';
  disability_date?: string;
  
  // Pension Details
  pension_start_date?: string;
  base_salary_at_retirement: number;
  current_pension_amount: number;
  
  // Account
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
  bank_code: string; // MFO in Ukraine
  account_number: string;
  iban?: string;
  swift?: string;
  currency: string;
}

export interface Contribution {
  id: string;
  pensioner_id: string;
  source: ContributionSource;
  amount: number;
  currency: string;
  period_start: string;
  period_end: string;
  employer_id?: string;
  donor_program_id?: string;
  notes?: string;
  created_at: string;
}

export interface PensionBenefit {
  id: string;
  pensioner_id: string;
  calculation_date: string;
  
  // Base Calculation
  base_amount: number;
  service_coefficient: number;
  rank_coefficient: number;
  
  // Additions
  combat_bonus: number;
  disability_bonus: number;
  special_conditions_bonus: number;
  dependents_bonus: number;
  
  // Adjustments
  indexation_amount: number;
  one_time_payments: number;
  deductions: number;
  
  // Final
  gross_amount: number;
  tax_amount: number;
  net_amount: number;
  
  // Metadata
  formula_version: string;
  calculation_details: CalculationDetails;
  effective_from: string;
  effective_to?: string;
}

export interface CalculationDetails {
  base_salary: number;
  years_of_service: number;
  combat_years: number;
  rank_at_retirement: MilitaryRank;
  disability_group?: DisabilityGroup;
  dependents_count: number;
  special_status: string[];
  applied_coefficients: CoefficientBreakdown[];
  applied_bonuses: BonusBreakdown[];
  indexation_history: IndexationEntry[];
}

export interface CoefficientBreakdown {
  name: string;
  value: number;
  description: string;
}

export interface BonusBreakdown {
  type: string;
  amount: number;
  reason: string;
}

export interface IndexationEntry {
  date: string;
  rate: number;
  type: 'inflation' | 'special' | 'government';
  amount_change: number;
}

export interface Payment {
  id: string;
  pensioner_id: string;
  benefit_id: string;
  
  amount: number;
  currency: string;
  
  payment_date: string;
  period_month: number;
  period_year: number;
  
  method: PaymentMethod;
  status: PaymentStatus;
  
  bank_reference?: string;
  transaction_id?: string;
  
  retry_count: number;
  failure_reason?: string;
  
  created_at: string;
  processed_at?: string;
  completed_at?: string;
}

export interface ActuarialForecast {
  id: string;
  forecast_date: string;
  forecast_horizon_years: number;
  
  // Current State
  current_beneficiaries: number;
  current_monthly_liability: number;
  current_fund_balance: number;
  
  // Projections
  yearly_projections: YearlyProjection[];
  
  // Risk Metrics
  funding_ratio: number;
  deficit_risk: number;
  sustainability_score: number;
  
  // Assumptions
  assumptions: ForecastAssumptions;
  
  created_by: string;
  created_at: string;
}

export interface YearlyProjection {
  year: number;
  expected_beneficiaries: number;
  expected_new_retirees: number;
  expected_deaths: number;
  projected_monthly_payment: number;
  projected_annual_liability: number;
  projected_fund_balance: number;
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

export interface EligibilityResult {
  eligible: boolean;
  pension_type: PensionType;
  earliest_retirement_date?: string;
  reasons: string[];
  missing_requirements: string[];
  warnings: string[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  entity_type: string;
  entity_id: string;
  action: string;
  user_id: string;
  old_value?: any;
  new_value?: any;
  ip_address?: string;
  details: Record<string, any>;
}
