/**
 * Field Format Validator
 */

import { BaseValidator } from './base-validator';
import { ComplianceResult, EntityType, Violation } from '../rules/rule-schema';

export class FieldFormatValidator extends BaseValidator {
  async validate(entity: any): Promise<ComplianceResult> {
    const entityType = this.rule.applies_to[0];
    const entityId = entity.id || 'unknown';

    if (!this.checkConditions(entity)) {
      return this.createResult(entityType, entityId, 'not_applicable');
    }

    const violations: Violation[] = [];
    const params = this.rule.parameters;
    const field = params.field as string;
    const pattern = params.pattern as string;
    const message = params.message as string;

    const value = this.getNestedValue(entity, field);

    if (value !== undefined && value !== null) {
      const regex = new RegExp(pattern);
      if (!regex.test(String(value))) {
        violations.push(
          this.createViolation(
            field,
            message || `Field "${field}" does not match required format`,
            pattern,
            value
          )
        );
      }
    }

    return this.createResult(
      entityType,
      entityId,
      violations.length > 0 ? 'non_compliant' : 'compliant',
      violations
    );
  }
}
