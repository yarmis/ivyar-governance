/**
 * Pension Fund Compliance Rules
 */

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'eligibility' | 'calculation' | 'payment' | 'data' | 'audit';
  severity: 'critical' | 'high' | 'medium' | 'low';
  standard: string;
  check: (data: any) => ComplianceCheckResult;
}

export interface ComplianceCheckResult {
  passed: boolean;
  rule_id: string;
  violations: string[];
  warnings: string[];
}

export const complianceRules: ComplianceRule[] = [
  {
    id: 'PENSION-001',
    name: 'Minimum Service Requirement',
    description: 'Military pension requires minimum 20 years of service',
    category: 'eligibility',
    severity: 'critical',
    standard: 'UA-MIL-PENSION-2024',
    check: (pensioner) => ({
      passed: pensioner.total_service_years >= 20,
      rule_id: 'PENSION-001',
      violations: pensioner.total_service_years < 20 
        ? [`Service years ${pensioner.total_service_years} below minimum 20`] 
        : [],
      warnings: [],
    }),
  },
  {
    id: 'PENSION-002',
    name: 'Maximum Pension Limit',
    description: 'Pension cannot exceed 90% of base salary',
    category: 'calculation',
    severity: 'high',
    standard: 'UA-MIL-PENSION-2024',
    check: (benefit) => {
      const percentage = (benefit.gross_amount / benefit.calculation_details.base_salary) * 100;
      return {
        passed: percentage <= 90,
        rule_id: 'PENSION-002',
        violations: percentage > 90 
          ? [`Pension ${percentage.toFixed(1)}% exceeds 90% maximum`] 
          : [],
        warnings: percentage > 85 
          ? ['Pension approaching maximum limit'] 
          : [],
      };
    },
  },
  {
    id: 'PENSION-003',
    name: 'Combat Disability Verification',
    description: 'Combat disability requires documentation',
    category: 'eligibility',
    severity: 'critical',
    standard: 'UA-MIL-PENSION-2024',
    check: (pensioner) => ({
      passed: !(pensioner.disability_cause === 'combat' && !pensioner.disability_date),
      rule_id: 'PENSION-003',
      violations: pensioner.disability_cause === 'combat' && !pensioner.disability_date
        ? ['Combat disability requires disability date documentation']
        : [],
      warnings: [],
    }),
  },
  {
    id: 'PENSION-004',
    name: 'Personal Data Completeness',
    description: 'All required personal data must be present',
    category: 'data',
    severity: 'high',
    standard: 'GDPR',
    check: (pensioner) => {
      const required = ['personal_id', 'tax_id', 'first_name', 'last_name', 'date_of_birth'];
      const missing = required.filter(f => !pensioner[f]);
      return {
        passed: missing.length === 0,
        rule_id: 'PENSION-004',
        violations: missing.map(f => `Missing required field: ${f}`),
        warnings: [],
      };
    },
  },
  {
    id: 'PENSION-005',
    name: 'Payment Bank Account Validation',
    description: 'Bank account must be valid for payments',
    category: 'payment',
    severity: 'medium',
    standard: 'ISO-13616',
    check: (pensioner) => {
      const hasAccount = pensioner.bank_account?.iban || pensioner.bank_account?.account_number;
      return {
        passed: !!hasAccount,
        rule_id: 'PENSION-005',
        violations: !hasAccount ? ['No valid bank account for payments'] : [],
        warnings: !pensioner.bank_account?.iban ? ['IBAN recommended for international payments'] : [],
      };
    },
  },
];

export class ComplianceChecker {
  private rules: ComplianceRule[];

  constructor(rules: ComplianceRule[] = complianceRules) {
    this.rules = rules;
  }

  checkAll(data: any, category?: string): ComplianceCheckResult[] {
    const applicableRules = category 
      ? this.rules.filter(r => r.category === category)
      : this.rules;

    return applicableRules.map(rule => rule.check(data));
  }

  checkCritical(data: any): ComplianceCheckResult[] {
    return this.rules
      .filter(r => r.severity === 'critical')
      .map(rule => rule.check(data));
  }

  getViolations(results: ComplianceCheckResult[]): string[] {
    return results.flatMap(r => r.violations);
  }
}

export default ComplianceChecker;
