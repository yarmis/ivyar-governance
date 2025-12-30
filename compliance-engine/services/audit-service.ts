/**
 * Audit Service
 * Handles compliance audit logging
 */

import { ComplianceResult } from '../rules/rule-schema';

export interface AuditEntry {
  id: string;
  timestamp: string;
  event_type: AuditEventType;
  rule_id?: string;
  entity_type?: string;
  entity_id?: string;
  user_id?: string;
  action: string;
  status: string;
  details: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

export type AuditEventType = 
  | 'compliance_check'
  | 'rule_change'
  | 'violation_detected'
  | 'remediation_action'
  | 'report_generated'
  | 'config_change';

export class AuditService {
  private entries: AuditEntry[] = [];

  /**
   * Log compliance check
   */
  async logComplianceCheck(result: ComplianceResult): Promise<void> {
    const entry: AuditEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      event_type: result.status === 'non_compliant' ? 'violation_detected' : 'compliance_check',
      rule_id: result.rule_id,
      entity_type: result.entity_type,
      entity_id: result.entity_id,
      action: 'compliance_check',
      status: result.status,
      details: {
        violations_count: result.violations.length,
        violations: result.violations,
      },
    };

    await this.saveEntry(entry);
  }

  /**
   * Log rule change
   */
  async logRuleChange(
    ruleId: string,
    userId: string,
    action: 'create' | 'update' | 'delete' | 'enable' | 'disable',
    details: Record<string, any>
  ): Promise<void> {
    const entry: AuditEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      event_type: 'rule_change',
      rule_id: ruleId,
      user_id: userId,
      action,
      status: 'completed',
      details,
    };

    await this.saveEntry(entry);
  }

  /**
   * Log remediation action
   */
  async logRemediation(
    ruleId: string,
    entityId: string,
    userId: string,
    action: string,
    details: Record<string, any>
  ): Promise<void> {
    const entry: AuditEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      event_type: 'remediation_action',
      rule_id: ruleId,
      entity_id: entityId,
      user_id: userId,
      action,
      status: 'completed',
      details,
    };

    await this.saveEntry(entry);
  }

  /**
   * Query audit log
   */
  async query(filters: {
    startDate?: string;
    endDate?: string;
    eventType?: AuditEventType;
    ruleId?: string;
    entityId?: string;
    userId?: string;
    limit?: number;
  }): Promise<AuditEntry[]> {
    let results = [...this.entries];

    if (filters.startDate) {
      results = results.filter(e => e.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      results = results.filter(e => e.timestamp <= filters.endDate!);
    }
    if (filters.eventType) {
      results = results.filter(e => e.event_type === filters.eventType);
    }
    if (filters.ruleId) {
      results = results.filter(e => e.rule_id === filters.ruleId);
    }
    if (filters.entityId) {
      results = results.filter(e => e.entity_id === filters.entityId);
    }
    if (filters.userId) {
      results = results.filter(e => e.user_id === filters.userId);
    }

    results.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    if (filters.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  /**
   * Get compliance history for entity
   */
  async getEntityHistory(entityId: string): Promise<AuditEntry[]> {
    return this.query({ entityId });
  }

  /**
   * Get violations summary
   */
  async getViolationsSummary(startDate: string, endDate: string): Promise<{
    total: number;
    by_rule: Record<string, number>;
    by_severity: Record<string, number>;
    by_entity_type: Record<string, number>;
  }> {
    const violations = await this.query({
      startDate,
      endDate,
      eventType: 'violation_detected',
    });

    const by_rule: Record<string, number> = {};
    const by_severity: Record<string, number> = {};
    const by_entity_type: Record<string, number> = {};

    violations.forEach(v => {
      if (v.rule_id) {
        by_rule[v.rule_id] = (by_rule[v.rule_id] || 0) + 1;
      }
      if (v.entity_type) {
        by_entity_type[v.entity_type] = (by_entity_type[v.entity_type] || 0) + 1;
      }
    });

    return {
      total: violations.length,
      by_rule,
      by_severity,
      by_entity_type,
    };
  }

  private async saveEntry(entry: AuditEntry): Promise<void> {
    this.entries.push(entry);
    // In production, save to database
    console.log(`[AUDIT] ${entry.event_type}: ${entry.action}`);
  }

  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default AuditService;
