/**
 * Compliance Service
 * Main service for running compliance checks
 */

import { 
  ComplianceRule, 
  ComplianceResult, 
  EntityType,
  ComplianceStatus,
  Severity
} from '../rules/rule-schema';
import { createValidator } from '../validators';
import { AuditService } from './audit-service';
import { NotificationService } from './notification-service';

// Rule storage
import partsRules from '../rules/parts-rules.json';
import repairsRules from '../rules/repairs-rules.json';
import fleetRules from '../rules/fleet-rules.json';

export interface ComplianceCheckOptions {
  entityType: EntityType;
  ruleIds?: string[];
  categories?: string[];
  severities?: Severity[];
  stopOnFirstViolation?: boolean;
}

export interface ComplianceSummary {
  total_rules: number;
  checked: number;
  compliant: number;
  non_compliant: number;
  warnings: number;
  errors: number;
  not_applicable: number;
  results: ComplianceResult[];
  checked_at: string;
}

export class ComplianceService {
  private rules: Map<string, ComplianceRule> = new Map();
  private auditService: AuditService;
  private notificationService: NotificationService;

  constructor() {
    this.loadRules();
    this.auditService = new AuditService();
    this.notificationService = new NotificationService();
  }

  private loadRules(): void {
    // Load all rules
    const allRules = [
      ...partsRules.rules,
      ...repairsRules.rules,
      ...fleetRules.rules,
    ] as ComplianceRule[];

    allRules.forEach(rule => {
      this.rules.set(rule.id, rule);
    });

    console.log(`Loaded ${this.rules.size} compliance rules`);
  }

  /**
   * Check single entity against all applicable rules
   */
  async checkEntity(
    entity: any,
    options: ComplianceCheckOptions
  ): Promise<ComplianceSummary> {
    const applicableRules = this.getApplicableRules(options);
    const results: ComplianceResult[] = [];
    
    for (const rule of applicableRules) {
      if (!rule.enabled) continue;

      try {
        const validator = createValidator(rule);
        const result = await validator.validate(entity);
        results.push(result);

        // Log to audit
        await this.auditService.logComplianceCheck(result);

        // Handle violations
        if (result.status === 'non_compliant') {
          await this.handleViolations(rule, result);
          
          if (options.stopOnFirstViolation) {
            break;
          }
        }
      } catch (error) {
        results.push({
          rule_id: rule.id,
          entity_type: options.entityType,
          entity_id: entity.id,
          status: 'error',
          violations: [],
          checked_at: new Date().toISOString(),
          checked_by: 'compliance-engine',
          metadata: { error: (error as Error).message },
        });
      }
    }

    return this.createSummary(applicableRules.length, results);
  }

  /**
   * Check multiple entities
   */
  async checkEntities(
    entities: any[],
    options: ComplianceCheckOptions
  ): Promise<Map<string, ComplianceSummary>> {
    const summaries = new Map<string, ComplianceSummary>();

    for (const entity of entities) {
      const summary = await this.checkEntity(entity, options);
      summaries.set(entity.id, summary);
    }

    return summaries;
  }

  /**
   * Get applicable rules based on options
   */
  private getApplicableRules(options: ComplianceCheckOptions): ComplianceRule[] {
    let rules = Array.from(this.rules.values());

    // Filter by entity type
    rules = rules.filter(r => r.applies_to.includes(options.entityType));

    // Filter by specific rule IDs
    if (options.ruleIds?.length) {
      rules = rules.filter(r => options.ruleIds!.includes(r.id));
    }

    // Filter by categories
    if (options.categories?.length) {
      rules = rules.filter(r => options.categories!.includes(r.category));
    }

    // Filter by severities
    if (options.severities?.length) {
      rules = rules.filter(r => options.severities!.includes(r.severity));
    }

    return rules;
  }

  /**
   * Handle rule violations
   */
  private async handleViolations(
    rule: ComplianceRule,
    result: ComplianceResult
  ): Promise<void> {
    for (const action of rule.on_violation) {
      switch (action.type) {
        case 'log':
          console.log(`[VIOLATION] ${rule.id}: ${result.violations.length} violations`);
          break;
        case 'alert':
          await this.notificationService.sendAlert(action.target!, result);
          break;
        case 'notify':
          await this.notificationService.sendNotification(action.target!, result);
          break;
        case 'escalate':
          await this.notificationService.escalate(action.target!, result);
          break;
        case 'block':
          // Return blocked status
          result.metadata = { ...result.metadata, blocked: true };
          break;
      }
    }
  }

  /**
   * Create compliance summary
   */
  private createSummary(totalRules: number, results: ComplianceResult[]): ComplianceSummary {
    return {
      total_rules: totalRules,
      checked: results.length,
      compliant: results.filter(r => r.status === 'compliant').length,
      non_compliant: results.filter(r => r.status === 'non_compliant').length,
      warnings: results.filter(r => r.status === 'warning').length,
      errors: results.filter(r => r.status === 'error').length,
      not_applicable: results.filter(r => r.status === 'not_applicable').length,
      results,
      checked_at: new Date().toISOString(),
    };
  }

  /**
   * Get rule by ID
   */
  getRule(ruleId: string): ComplianceRule | undefined {
    return this.rules.get(ruleId);
  }

  /**
   * Get all rules
   */
  getAllRules(): ComplianceRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * Get rules by category
   */
  getRulesByCategory(category: string): ComplianceRule[] {
    return Array.from(this.rules.values()).filter(r => r.category === category);
  }
}

export default ComplianceService;
