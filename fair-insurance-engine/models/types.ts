/**
 * Fair Insurance Engine - Type Definitions
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum InsuranceType {
  LIFE = 'life',
  HEALTH = 'health',
  DISABILITY = 'disability',
  PROPERTY = 'property',
  COMBAT = 'combat',
  FAMILY = 'family',
}

export enum PolicyStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  CLAIMED = 'claimed',
}

export enum ClaimStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  DOCUMENTS_REQUIRED = 'documents_required',
  APPROVED = 'approved',
  PARTIALLY_APPROVED = 'partially_approved',
  DENIED = 'denied',
  PAID = 'paid',
  APPEALED = 'appealed',
}

export enum PaymentFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi_annual',
  ANNUAL = 'annual',
  SINGLE = 'single',
}

export enum BeneficiaryType {
  SPOUSE = 'spouse',
  CHILD = 'child',
  PARENT = 'parent',
  SIBLING = 'sibling',
  OTHER = 'other',
  ESTATE = 'estate',
}

export enum RiskCategory {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  DECLINED = 'declined',
}

export enum MilitaryStatus {
  ACTIVE_DUTY = 'active_duty',
  RESERVE = 'reserve',
  VETERAN = 'veteran',
  RETIRED = 'retired',
  DISABLED_VETERAN = 'disabled_veteran',
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface Insured {
  id: string;
  pensioner_id?: string; // Link to Pension Fund
  personal_id: string;
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
  
  // Military Info
  military_status: MilitaryStatus;
  military_rank?: string;
  service_years: number;
  combat_service: boolean;
  disability_group?: string;
  
  // Risk Profile
  risk_category: RiskCategory;
  risk_score: number;
  health_conditions: string[];
  
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

export interface Policy {
  id: string;
  policy_number: string;
  insured_id: string;
  pensioner_id?: string;
  
  // Policy Details
  insurance_type: InsuranceType;
  product_code: string;
  product_name: string;
  
  // Coverage
  coverage_amount: number;
  deductible: number;
  currency: string;
  
  // Premium
  premium_amount: number;
  premium_frequency: PaymentFrequency;
  premium_deduct_from_pension: boolean;
  
  // Dates
  effective_date: string;
  expiration_date: string;
  renewal_date?: string;
  
  // Beneficiaries
  beneficiaries: Beneficiary[];
  
  // Status
  status: PolicyStatus;
  underwriting_decision?: UnderwritingDecision;
  
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: BeneficiaryType;
  percentage: number;
  contact_phone?: string;
  personal_id?: string;
}

export interface Claim {
  id: string;
  claim_number: string;
  policy_id: string;
  insured_id: string;
  
  // Claim Details
  claim_type: string;
  incident_date: string;
  reported_date: string;
  description: string;
  
  // Amounts
  claimed_amount: number;
  approved_amount?: number;
  paid_amount?: number;
  currency: string;
  
  // Processing
  status: ClaimStatus;
  assigned_to?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Documents
  documents: ClaimDocument[];
  
  // Timeline
  status_history: StatusChange[];
  
  // Payment
  payment_method?: string;
  payment_date?: string;
  payment_reference?: string;
  
  // Pension Integration
  coordinate_with_pension: boolean;
  pension_benefit_impact?: number;
  
  created_at: string;
  updated_at: string;
}

export interface ClaimDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
  verified: boolean;
}

export interface StatusChange {
  status: ClaimStatus;
  changed_at: string;
  changed_by: string;
  reason?: string;
}

export interface UnderwritingDecision {
  decision: 'approved' | 'approved_with_conditions' | 'declined';
  risk_category: RiskCategory;
  risk_score: number;
  premium_adjustment: number; // Percentage adjustment
  conditions?: string[];
  exclusions?: string[];
  decided_at: string;
  decided_by: string;
}

export interface InsuranceProduct {
  id: string;
  code: string;
  name: string;
  name_uk: string;
  description: string;
  insurance_type: InsuranceType;
  
  // Coverage
  min_coverage: number;
  max_coverage: number;
  default_coverage: number;
  
  // Premium
  base_premium_rate: number; // Per 1000 coverage per year
  min_premium: number;
  
  // Terms
  min_term_months: number;
  max_term_months: number;
  waiting_period_days: number;
  
  // Eligibility
  min_age: number;
  max_age: number;
  military_only: boolean;
  pensioner_eligible: boolean;
  pension_deduction_allowed: boolean;
  
  // Features
  features: string[];
  exclusions: string[];
  
  status: 'active' | 'inactive' | 'deprecated';
}

export interface PremiumCalculation {
  policy_id?: string;
  product_code: string;
  coverage_amount: number;
  
  // Calculation Breakdown
  base_premium: number;
  age_adjustment: number;
  risk_adjustment: number;
  military_discount: number;
  pensioner_discount: number;
  multi_policy_discount: number;
  combat_loading: number;
  
  // Final
  annual_premium: number;
  monthly_premium: number;
  
  calculation_date: string;
}

// Pension Integration Types
export interface PensionIntegrationData {
  pensioner_id: string;
  pension_amount: number;
  pension_type: string;
  disability_group?: string;
  service_years: number;
  combat_years: number;
  rank: string;
}

export interface PremiumDeductionRequest {
  policy_id: string;
  pensioner_id: string;
  amount: number;
  period_month: number;
  period_year: number;
}

export interface BenefitCoordinationResult {
  claim_id: string;
  insurance_benefit: number;
  pension_benefit: number;
  total_benefit: number;
  coordination_type: 'primary' | 'secondary' | 'supplemental';
  notes: string[];
}
