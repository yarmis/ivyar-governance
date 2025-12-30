/**
 * Required Field Validator
 */

import { BaseValidator } from './base-validator';
import { ComplianceResult, EntityType, Violation } from '../rules/rule-schema';

export class RequiredFieldValidator extends BaseValidator {
  async validate(entity: any): Promise<ComplianceResult> {
    const entityType = this.rule.applies_to[0];
    const entityId = entity.id || 'unknown';

    // Check if conditions apply
    if (!this.checkConditions(entity)) {
      return this.createResult(entityType, entityId, 'not_applicable');
    }

    const violations: Violation[] = [];
    const params = this.rule.parameters;
    const fields = params.fields as string[];
    const minLength = params.min_length || 0;

    for (const field of fields) {
      const value = this.getNestedValue(entity, field);

      if (value === undefined || value === null) {
        violations.push(
          this.createViolation(
            field,
            `Field "${field}" is required`,
            'Present',
            'Missing'
          )
        );
      } else if (typeof value === 'string' && value.length < minLength) {
        violations.push(
          this.createViolation(
            field,
            `Field "${field}" must be at least ${minLength} characters`,
            `Min ${minLength} characters`,
            `${value.length} characters`
          )
        );
      }
    }

    // Check nested required fields
    if (params.nested_required) {
      const parentField = fields[0];
      const parentValue = this.getNestedValue(entity, parentField);
      
      if (parentValue && typeof parentValue === 'object') {
        for (const nestedField of params.nested_required) {
          if (parentValue[nestedField] === undefined) {
            violations.push(
              this.createViolation(
                `${parentField}.${nestedField}`,
                `Nested field "${nestedField}" is required in "${parentField}"`,
                'Present',
                'Missing'
              )
            );
          }
        }
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
