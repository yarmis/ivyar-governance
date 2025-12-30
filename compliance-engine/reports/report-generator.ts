/**
 * Compliance Report Generator
 */

import { ComplianceResult, ComplianceRule, Severity } from '../rules/rule-schema';
import { ComplianceSummary } from '../services/compliance-service';
import { AuditEntry } from '../services/audit-service';

export interface ComplianceReport {
  id: string;
  title: string;
  type: ReportType;
  generated_at: string;
  generated_by: string;
  period: {
    start: string;
    end: string;
  };
  summary: ReportSummary;
  sections: ReportSection[];
  recommendations: string[];
}

export type ReportType = 
  | 'full_compliance'
  | 'violations_summary'
  | 'entity_compliance'
  | 'rule_effectiveness'
  | 'trend_analysis';

export interface ReportSummary {
  overall_compliance_rate: number;
  total_checks: number;
  total_violations: number;
  critical_violations: number;
  high_violations: number;
  medium_violations: number;
  low_violations: number;
  top_violated_rules: Array<{ rule_id: string; count: number }>;
  compliance_by_category: Record<string, number>;
}

export interface ReportSection {
  title: string;
  content: any;
  charts?: ChartData[];
}

export interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'gauge';
  title: string;
  data: any;
}

export class ReportGenerator {
  /**
   * Generate full compliance report
   */
  async generateFullReport(
    results: ComplianceResult[],
    rules: ComplianceRule[],
    auditEntries: AuditEntry[],
    period: { start: string; end: string }
  ): Promise<ComplianceReport> {
    const summary = this.calculateSummary(results);

    return {
      id: this.generateId(),
      title: 'Full Compliance Report',
      type: 'full_compliance',
      generated_at: new Date().toISOString(),
      generated_by: 'compliance-engine',
      period,
      summary,
      sections: [
        this.generateOverviewSection(summary),
        this.generateViolationsSection(results),
        this.generateCategorySection(results, rules),
        this.generateTrendSection(auditEntries),
        this.generateEntitySection(results),
      ],
      recommendations: this.generateRecommendations(results, rules),
    };
  }

  /**
   * Generate violations summary report
   */
  async generateViolationsReport(
    results: ComplianceResult[],
    period: { start: string; end: string }
  ): Promise<ComplianceReport> {
    const violations = results.filter(r => r.status === 'non_compliant');
    const summary = this.calculateSummary(results);

    return {
      id: this.generateId(),
      title: 'Violations Summary Report',
      type: 'violations_summary',
      generated_at: new Date().toISOString(),
      generated_by: 'compliance-engine',
      period,
      summary,
      sections: [
        this.generateViolationsSection(results),
        this.generateViolationsByRuleSection(violations),
        this.generateViolationsBySeveritySection(violations),
      ],
      recommendations: this.generateRecommendations(results, []),
    };
  }

  /**
   * Generate entity compliance report
   */
  async generateEntityReport(
    entityId: string,
    results: ComplianceResult[]
  ): Promise<ComplianceReport> {
    const entityResults = results.filter(r => r.entity_id === entityId);
    const summary = this.calculateSummary(entityResults);

    return {
      id: this.generateId(),
      title: `Entity Compliance Report: ${entityId}`,
      type: 'entity_compliance',
      generated_at: new Date().toISOString(),
      generated_by: 'compliance-engine',
      period: {
        start: entityResults[0]?.checked_at || new Date().toISOString(),
        end: entityResults[entityResults.length - 1]?.checked_at || new Date().toISOString(),
      },
      summary,
      sections: [
        this.generateEntityDetailsSection(entityId, entityResults),
        this.generateEntityViolationsSection(entityResults),
      ],
      recommendations: [],
    };
  }

  private calculateSummary(results: ComplianceResult[]): ReportSummary {
    const compliant = results.filter(r => r.status === 'compliant').length;
    const violations = results.filter(r => r.status === 'non_compliant');
    
    const violationsBySeverity = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    const ruleViolationCounts: Record<string, number> = {};
    const categoryCompliance: Record<string, { compliant: number; total: number }> = {};

    violations.forEach(v => {
      v.violations.forEach(viol => {
        violationsBySeverity[viol.severity as keyof typeof violationsBySeverity]++;
      });
      ruleViolationCounts[v.rule_id] = (ruleViolationCounts[v.rule_id] || 0) + 1;
    });

    const topViolatedRules = Object.entries(ruleViolationCounts)
      .map(([rule_id, count]) => ({ rule_id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      overall_compliance_rate: results.length > 0 
        ? Math.round((compliant / results.length) * 100) 
        : 100,
      total_checks: results.length,
      total_violations: violations.length,
      critical_violations: violationsBySeverity.critical,
      high_violations: violationsBySeverity.high,
      medium_violations: violationsBySeverity.medium,
      low_violations: violationsBySeverity.low,
      top_violated_rules: topViolatedRules,
      compliance_by_category: {},
    };
  }

  private generateOverviewSection(summary: ReportSummary): ReportSection {
    return {
      title: 'Executive Overview',
      content: {
        compliance_rate: `${summary.overall_compliance_rate}%`,
        total_checks: summary.total_checks,
        violations: summary.total_violations,
        status: summary.overall_compliance_rate >= 90 ? 'Good' :
                summary.overall_compliance_rate >= 70 ? 'Needs Attention' : 'Critical',
      },
      charts: [
        {
          type: 'gauge',
          title: 'Overall Compliance Rate',
          data: { value: summary.overall_compliance_rate, max: 100 },
        },
        {
          type: 'pie',
          title: 'Violations by Severity',
          data: [
            { label: 'Critical', value: summary.critical_violations },
            { label: 'High', value: summary.high_violations },
            { label: 'Medium', value: summary.medium_violations },
            { label: 'Low', value: summary.low_violations },
          ],
        },
      ],
    };
  }

  private generateViolationsSection(results: ComplianceResult[]): ReportSection {
    const violations = results
      .filter(r => r.status === 'non_compliant')
      .flatMap(r => r.violations.map(v => ({
        rule_id: r.rule_id,
        entity_id: r.entity_id,
        ...v,
      })));

    return {
      title: 'Violations Detail',
      content: {
        total: violations.length,
        violations: violations.slice(0, 50), // Top 50
      },
    };
  }

  private generateCategorySection(
    results: ComplianceResult[],
    rules: ComplianceRule[]
  ): ReportSection {
    // Implementation
    return {
      title: 'Compliance by Category',
      content: {},
    };
  }

  private generateTrendSection(auditEntries: AuditEntry[]): ReportSection {
    // Implementation
    return {
      title: 'Compliance Trend',
      content: {},
    };
  }

  private generateEntitySection(results: ComplianceResult[]): ReportSection {
    // Implementation
    return {
      title: 'Compliance by Entity',
      content: {},
    };
  }

  private generateViolationsByRuleSection(violations: ComplianceResult[]): ReportSection {
    // Implementation
    return {
      title: 'Violations by Rule',
      content: {},
    };
  }

  private generateViolationsBySeveritySection(violations: ComplianceResult[]): ReportSection {
    // Implementation
    return {
      title: 'Violations by Severity',
      content: {},
    };
  }

  private generateEntityDetailsSection(
    entityId: string,
    results: ComplianceResult[]
  ): ReportSection {
    // Implementation
    return {
      title: 'Entity Details',
      content: { entityId },
    };
  }

  private generateEntityViolationsSection(results: ComplianceResult[]): ReportSection {
    // Implementation
    return {
      title: 'Entity Violations',
      content: {},
    };
  }

  private generateRecommendations(
    results: ComplianceResult[],
    rules: ComplianceRule[]
  ): string[] {
    const recommendations: string[] = [];

    const criticalViolations = results.filter(r => 
      r.violations.some(v => v.severity === 'critical')
    );

    if (criticalViolations.length > 0) {
      recommendations.push(
        `Address ${criticalViolations.length} critical violations immediately`
      );
    }

    // Add more recommendations based on patterns
    return recommendations;
  }

  private generateId(): string {
    return `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default ReportGenerator;
