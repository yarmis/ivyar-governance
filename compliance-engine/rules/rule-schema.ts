/**
 * Compliance Rule Schema
 */

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  severity: Severity;
  standard: ComplianceStandard;
  enabled: boolean;
  version: string;
  
  // Applicability
  applies_to: EntityType[];
  conditions?: RuleCondition[];
  
  // Validation
  validator: ValidatorType;
  parameters: Record<string, any>;
  
  // Actions
  on_violation: ViolationAction[];
  remediation?: RemediationGuide;
  
  // Metadata
  effective_date: string;
  expiry_date?: string;
  created_by: string;
  tags: string[];
}

export type RuleCategory =
  | 'part_certification'
  | 'repair_procedure'
  | 'safety_critical'
  | 'data_classification'
  | 'fleet_readiness'
  | 'documentation'
  | 'training'
  | 'audit';

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface ComplianceStandard {
  code: string;
  name: string;
  version: string;
  organization: string;
  url?: string;
}

export type EntityType = 
  | 'part' 
  | 'repair' 
  | 'vehicle' 
  | 'user' 
  | 'procedure'
  | 'document';

export interface RuleCondition {
  field: string;
  operator: ConditionOperator;
  value: any;
}

export type ConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'in'
  | 'not_in'
  | 'exists'
  | 'not_exists'
  | 'matches_regex';

export type ValidatorType =
  | 'required_field'
  | 'field_format'
  | 'field_range'
  | 'cross_reference'
  | 'certification_check'
  | 'date_validity'
  | 'approval_chain'
  | 'custom_function';

export interface ViolationAction {
  type: 'log' | 'alert' | 'block' | 'notify' | 'escalate';
  target?: string;
  template?: string;
}

export interface RemediationGuide {
  steps: string[];
  documentation_url?: string;
  contact?: string;
  auto_fix_available: boolean;
}

// Compliance Result
export interface ComplianceResult {
  rule_id: string;
  entity_type: EntityType;
  entity_id: string;
  status: ComplianceStatus;
  violations: Violation[];
  checked_at: string;
  checked_by: string;
  metadata?: Record<string, any>;
}

export type ComplianceStatus = 'compliant' | 'non_compliant' | 'warning' | 'not_applicable' | 'error';

export interface Violation {
  field: string;
  message: string;
  expected: any;
  actual: any;
  severity: Severity;
  remediation?: string;
}
