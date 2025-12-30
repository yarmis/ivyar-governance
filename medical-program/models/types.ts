/**
 * Medical Program - Type Definitions
 * IVYAR Governance Platform
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum BeneficiaryCategory {
  CATEGORY_A = 'category_a', // Combat veterans, disabled - no cost sharing
  CATEGORY_B = 'category_b', // Veterans, pensioners - minimal cost sharing
  CATEGORY_C = 'category_c', // Dependents - standard cost sharing
  CATEGORY_D = 'category_d', // Extended family - full cost sharing
}

export enum ServiceType {
  PRIMARY_CARE = 'primary_care',
  SPECIALTY_CARE = 'specialty_care',
  EMERGENCY = 'emergency',
  MENTAL_HEALTH = 'mental_health',
  REHABILITATION = 'rehabilitation',
  PREVENTIVE = 'preventive',
  PHARMACY = 'pharmacy',
  DENTAL = 'dental',
  VISION = 'vision',
  HEARING = 'hearing',
  TELEMEDICINE = 'telemedicine',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum AppointmentType {
  IN_PERSON = 'in_person',
  TELEMEDICINE = 'telemedicine',
  HOME_VISIT = 'home_visit',
}

export enum PrescriptionStatus {
  ACTIVE = 'active',
  REFILL_NEEDED = 'refill_needed',
  EXPIRED = 'expired',
  DISCONTINUED = 'discontinued',
  ON_HOLD = 'on_hold',
}

export enum FormularyTier {
  TIER_1 = 'tier_1', // Generic - ₴0
  TIER_2 = 'tier_2', // Preferred brand - ₴50
  TIER_3 = 'tier_3', // Non-preferred - ₴100
  TIER_4 = 'tier_4', // Specialty - ₴200
  TIER_5 = 'tier_5', // Non-formulary - 50%
}

export enum ClaimStatus {
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  PARTIALLY_APPROVED = 'partially_approved',
  DENIED = 'denied',
  PAID = 'paid',
  APPEALED = 'appealed',
}

export enum AuthorizationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  APPROVED_MODIFIED = 'approved_modified',
  DENIED = 'denied',
  EXPIRED = 'expired',
}

export enum DisabilityGroup {
  GROUP_I = 'group_i',   // 100% incapacity
  GROUP_II = 'group_ii', // 75-99% incapacity
  GROUP_III = 'group_iii', // 50-74% incapacity
}

export enum ProgramType {
  PTSD = 'ptsd',
  SUBSTANCE_USE = 'substance_use',
  PHYSICAL_REHAB = 'physical_rehab',
  VOCATIONAL = 'vocational',
  WELLNESS = 'wellness',
  CAREGIVER = 'caregiver',
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface Patient {
  id: string;
  personal_id: string;
  military_id?: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  patronymic?: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  
  // Contact
  phone: string;
  email?: string;
  address: Address;
  
  // Military/Veteran Status
  service_status: 'active' | 'veteran' | 'reserve' | 'pensioner';
  combat_veteran: boolean;
  service_start_date?: string;
  service_end_date?: string;
  
  // Beneficiary Information
  beneficiary_category: BeneficiaryCategory;
  enrollment_date: string;
  pcp_id?: string; // Primary Care Provider
  
  // Disability
  disability_group?: DisabilityGroup;
  disability_combat_related?: boolean;
  
  // Emergency Contact
  emergency_contact: EmergencyContact;
  
  // Integration IDs
  pension_id?: string;
  insurance_id?: string;
  
  status: 'active' | 'suspended' | 'disenrolled';
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

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternate_phone?: string;
}

export interface Provider {
  id: string;
  npi: string; // National Provider Identifier
  
  // Personal
  first_name: string;
  last_name: string;
  credentials: string[]; // MD, PhD, etc.
  
  // Specialty
  specialty: string;
  subspecialties?: string[];
  
  // Facility
  facility_id: string;
  facility_name: string;
  
  // Contact
  phone: string;
  email: string;
  
  // Availability
  accepting_patients: boolean;
  telemedicine_available: boolean;
  
  // Quality
  rating: number;
  review_count: number;
  
  // Network
  network_status: 'military' | 'network' | 'non_network';
  
  languages: string[];
  
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  provider_id: string;
  facility_id: string;
  
  // Scheduling
  service_type: ServiceType;
  appointment_type: AppointmentType;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  
  // Status
  status: AppointmentStatus;
  confirmed_at?: string;
  checked_in_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  
  // Clinical
  reason_for_visit: string;
  notes?: string;
  referral_id?: string;
  
  // Authorization
  authorization_id?: string;
  authorization_required: boolean;
  
  // Telemedicine
  video_link?: string;
  
  // Reminders
  reminder_sent: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  
  // Record Type
  record_type: 'visit' | 'lab' | 'imaging' | 'procedure' | 'diagnosis' | 'immunization';
  
  // Clinical Data
  date: string;
  provider_id: string;
  facility_id: string;
  
  // Content
  title: string;
  description: string;
  findings?: string;
  
  // Diagnosis
  diagnoses?: Diagnosis[];
  
  // Results
  results?: LabResult[];
  
  // Attachments
  attachments?: Attachment[];
  
  // Status
  status: 'preliminary' | 'final' | 'amended' | 'cancelled';
  
  created_at: string;
  updated_at: string;
}

export interface Diagnosis {
  code: string; // ICD-10
  description: string;
  type: 'primary' | 'secondary';
  onset_date?: string;
  status: 'active' | 'resolved' | 'chronic';
}

export interface LabResult {
  test_name: string;
  value: string;
  unit: string;
  reference_range: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  notes?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  provider_id: string;
  pharmacy_id?: string;
  
  // Medication
  medication_name: string;
  generic_name?: string;
  dosage: string;
  form: string; // tablet, capsule, liquid, etc.
  
  // Instructions
  instructions: string;
  quantity: number;
  days_supply: number;
  refills_authorized: number;
  refills_remaining: number;
  
  // Dates
  prescribed_date: string;
  expiration_date: string;
  last_filled_date?: string;
  next_refill_date?: string;
  
  // Formulary
  formulary_tier: FormularyTier;
  prior_authorization_required: boolean;
  authorization_id?: string;
  
  // Cost
  copayment: number;
  
  // Status
  status: PrescriptionStatus;
  
  // Notes
  notes?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  patient_id: string;
  provider_id: string;
  
  // Service
  service_date: string;
  service_type: ServiceType;
  
  // Billing
  billed_amount: number;
  allowed_amount: number;
  paid_amount: number;
  patient_responsibility: number;
  
  // Codes
  procedure_codes: string[];
  diagnosis_codes: string[];
  
  // Status
  status: ClaimStatus;
  submitted_date: string;
  processed_date?: string;
  paid_date?: string;
  
  // Denial
  denial_reason?: string;
  appeal_deadline?: string;
  
  // EOB
  explanation_of_benefits?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Authorization {
  id: string;
  patient_id: string;
  provider_id: string;
  
  // Service
  service_type: ServiceType;
  service_description: string;
  
  // Request
  requested_date: string;
  urgency: 'standard' | 'urgent';
  
  // Clinical
  diagnosis_codes: string[];
  clinical_notes: string;
  
  // Decision
  status: AuthorizationStatus;
  decision_date?: string;
  approved_units?: number;
  valid_from?: string;
  valid_to?: string;
  
  // Denial
  denial_reason?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  name: string;
  type: ProgramType;
  description: string;
  
  // Eligibility
  eligibility_criteria: string[];
  
  // Details
  duration_weeks?: number;
  sessions_per_week?: number;
  
  // Location
  facility_id?: string;
  virtual_available: boolean;
  
  // Enrollment
  max_participants?: number;
  current_participants: number;
  waitlist_count: number;
  
  // Status
  active: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface ProgramEnrollment {
  id: string;
  patient_id: string;
  program_id: string;
  
  // Dates
  enrolled_date: string;
  start_date?: string;
  expected_end_date?: string;
  actual_end_date?: string;
  
  // Progress
  sessions_completed: number;
  sessions_total: number;
  progress_percentage: number;
  
  // Status
  status: 'pending' | 'active' | 'completed' | 'withdrawn' | 'waitlist';
  
  // Outcome
  outcome?: string;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// COST SHARING
// ============================================================================

export interface CostSharingSchedule {
  category: BeneficiaryCategory;
  annual_deductible: number;
  copayment_primary: number;
  copayment_specialty: number;
  copayment_emergency: number;
  coinsurance_percentage: number;
  out_of_pocket_maximum: number;
}

export const COST_SHARING: Record<BeneficiaryCategory, CostSharingSchedule> = {
  [BeneficiaryCategory.CATEGORY_A]: {
    category: BeneficiaryCategory.CATEGORY_A,
    annual_deductible: 0,
    copayment_primary: 0,
    copayment_specialty: 0,
    copayment_emergency: 0,
    coinsurance_percentage: 0,
    out_of_pocket_maximum: 0,
  },
  [BeneficiaryCategory.CATEGORY_B]: {
    category: BeneficiaryCategory.CATEGORY_B,
    annual_deductible: 500,
    copayment_primary: 50,
    copayment_specialty: 100,
    copayment_emergency: 0,
    coinsurance_percentage: 10,
    out_of_pocket_maximum: 2500,
  },
  [BeneficiaryCategory.CATEGORY_C]: {
    category: BeneficiaryCategory.CATEGORY_C,
    annual_deductible: 1000,
    copayment_primary: 100,
    copayment_specialty: 150,
    copayment_emergency: 0,
    coinsurance_percentage: 20,
    out_of_pocket_maximum: 5000,
  },
  [BeneficiaryCategory.CATEGORY_D]: {
    category: BeneficiaryCategory.CATEGORY_D,
    annual_deductible: 2000,
    copayment_primary: 200,
    copayment_specialty: 300,
    copayment_emergency: 100,
    coinsurance_percentage: 30,
    out_of_pocket_maximum: 10000,
  },
};

// ============================================================================
// FORMULARY COPAYMENTS
// ============================================================================

export const FORMULARY_COPAYMENTS: Record<FormularyTier, number> = {
  [FormularyTier.TIER_1]: 0,    // Generic
  [FormularyTier.TIER_2]: 50,   // Preferred brand
  [FormularyTier.TIER_3]: 100,  // Non-preferred
  [FormularyTier.TIER_4]: 200,  // Specialty
  [FormularyTier.TIER_5]: -1,   // 50% coinsurance (calculated)
};
