/**
 * Field Range Validator
 */

import { BaseValidator } from './base-validator';
import { ComplianceResult, EntityType, Violation } from '../rules/rule-schema';

export class FieldRangeValidator extends BaseValidator {
  async validate(entity: any): Promise<ComplianceResult> {
    const entityType = this.rule.applies_to[0];
    const entityId = entity.id || 'unknown';

    if (!this.checkConditions(entity)) {
      return this.createResult(entityType, entityId, 'not_applicable');
    }

    const violations: Violation[] = [];
    const params = this.rule.parameters;
    const field = params.field as string;
    const min = params.min as number;
    const max = params.max as number;
    const message = params.message as string;

    const value = this.getNestedValue(entity, field);

    if (value !== undefined && value !== null) {
      const numValue = Number(value);
      
      if (isNaN(numValue)) {
        violations.push(
          this.createViolation(
            field,
            `Field "${field}" must be a number`,
            'Number',
            typeof value
          )
        );
      } else if (numValue < min || numValue > max) {
        violations.push(
          this.createViolation(
            field,
            message || `Field "${field}" must be between ${min} and ${max}`,
            `${min} - ${max}`,
            numValue
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
