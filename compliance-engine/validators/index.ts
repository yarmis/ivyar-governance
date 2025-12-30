/**
 * Validator Index
 */

import { ComplianceRule, ValidatorType } from '../rules/rule-schema';
import { BaseValidator } from './base-validator';
import { RequiredFieldValidator } from './required-field-validator';
import { FieldFormatValidator } from './field-format-validator';
import { FieldRangeValidator } from './field-range-validator';

export function createValidator(rule: ComplianceRule): BaseValidator {
  switch (rule.validator) {
    case 'required_field':
      return new RequiredFieldValidator(rule);
    case 'field_format':
      return new FieldFormatValidator(rule);
    case 'field_range':
      return new FieldRangeValidator(rule);
    case 'cross_reference':
      return new CrossReferenceValidator(rule);
    case 'certification_check':
      return new CertificationValidator(rule);
    case 'date_validity':
      return new DateValidityValidator(rule);
    case 'approval_chain':
      return new ApprovalChainValidator(rule);
    case 'custom_function':
      return new CustomFunctionValidator(rule);
    default:
      throw new Error(`Unknown validator type: ${rule.validator}`);
  }
}

// Placeholder implementations
class CrossReferenceValidator extends BaseValidator {
  async validate(entity: any) {
    return this.createResult(this.rule.applies_to[0], entity.id, 'compliant');
  }
}

class CertificationValidator extends BaseValidator {
  async validate(entity: any) {
    return this.createResult(this.rule.applies_to[0], entity.id, 'compliant');
  }
}

class DateValidityValidator extends BaseValidator {
  async validate(entity: any) {
    return this.createResult(this.rule.applies_to[0], entity.id, 'compliant');
  }
}

class ApprovalChainValidator extends BaseValidator {
  async validate(entity: any) {
    return this.createResult(this.rule.applies_to[0], entity.id, 'compliant');
  }
}

class CustomFunctionValidator extends BaseValidator {
  async validate(entity: any) {
    return this.createResult(this.rule.applies_to[0], entity.id, 'compliant');
  }
}

export { BaseValidator };
