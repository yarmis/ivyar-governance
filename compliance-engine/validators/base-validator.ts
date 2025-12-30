/**
 * Base Validator Class
 */

import { 
  ComplianceRule, 
  ComplianceResult, 
  ComplianceStatus, 
  Violation,
  EntityType 
} from '../rules/rule-schema';

export abstract class BaseValidator {
  protected rule: ComplianceRule;

  constructor(rule: ComplianceRule) {
    this.rule = rule;
  }

  abstract validate(entity: any): Promise<ComplianceResult>;

  protected createResult(
    entityType: EntityType,
    entityId: string,
    status: ComplianceStatus,
    violations: Violation[] = []
  ): ComplianceResult {
    return {
      rule_id: this.rule.id,
      entity_type: entityType,
      entity_id: entityId,
      status,
      violations,
      checked_at: new Date().toISOString(),
      checked_by: 'compliance-engine',
    };
  }

  protected createViolation(
    field: string,
    message: string,
    expected: any,
    actual: any,
    remediation?: string
  ): Violation {
    return {
      field,
      message,
      expected,
      actual,
      severity: this.rule.severity,
      remediation: remediation || this.rule.remediation?.steps.join('; '),
    };
  }

  protected checkConditions(entity: any): boolean {
    if (!this.rule.conditions || this.rule.conditions.length === 0) {
      return true;
    }

    return this.rule.conditions.every(condition => {
      const value = this.getNestedValue(entity, condition.field);
      return this.evaluateCondition(value, condition.operator, condition.value);
    });
  }

  protected getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  protected evaluateCondition(actual: any, operator: string, expected: any): boolean {
    switch (operator) {
      case 'equals':
        return actual === expected;
      case 'not_equals':
        return actual !== expected;
      case 'contains':
        return Array.isArray(actual) ? actual.includes(expected) : String(actual).includes(expected);
      case 'not_contains':
        return Array.isArray(actual) ? !actual.includes(expected) : !String(actual).includes(expected);
      case 'greater_than':
        return actual > expected;
      case 'less_than':
        return actual < expected;
      case 'in':
        return Array.isArray(expected) && expected.includes(actual);
      case 'not_in':
        return Array.isArray(expected) && !expected.includes(actual);
      case 'exists':
        return actual !== undefined && actual !== null;
      case 'not_exists':
        return actual === undefined || actual === null;
      case 'matches_regex':
        return new RegExp(expected).test(String(actual));
      default:
        return false;
    }
  }
}
