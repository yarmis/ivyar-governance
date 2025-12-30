/**
 * Notification Service
 * Handles compliance notifications and alerts
 */

import { ComplianceResult } from '../rules/rule-schema';

export interface Notification {
  id: string;
  type: 'alert' | 'notification' | 'escalation';
  target: string;
  subject: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  data: Record<string, any>;
  sent_at: string;
  status: 'pending' | 'sent' | 'failed';
}

export class NotificationService {
  private notifications: Notification[] = [];

  /**
   * Send alert for violation
   */
  async sendAlert(target: string, result: ComplianceResult): Promise<void> {
    const notification: Notification = {
      id: this.generateId(),
      type: 'alert',
      target,
      subject: `Compliance Alert: ${result.rule_id}`,
      message: this.formatAlertMessage(result),
      priority: 'high',
      data: { result },
      sent_at: new Date().toISOString(),
      status: 'pending',
    };

    await this.send(notification);
  }

  /**
   * Send notification
   */
  async sendNotification(target: string, result: ComplianceResult): Promise<void> {
    const notification: Notification = {
      id: this.generateId(),
      type: 'notification',
      target,
      subject: `Compliance Notice: ${result.rule_id}`,
      message: this.formatNotificationMessage(result),
      priority: 'medium',
      data: { result },
      sent_at: new Date().toISOString(),
      status: 'pending',
    };

    await this.send(notification);
  }

  /**
   * Escalate violation
   */
  async escalate(target: string, result: ComplianceResult): Promise<void> {
    const notification: Notification = {
      id: this.generateId(),
      type: 'escalation',
      target,
      subject: `ESCALATION: Compliance Violation ${result.rule_id}`,
      message: this.formatEscalationMessage(result),
      priority: 'high',
      data: { result },
      sent_at: new Date().toISOString(),
      status: 'pending',
    };

    await this.send(notification);
  }

  /**
   * Send compliance report
   */
  async sendReport(
    recipients: string[],
    reportType: string,
    reportData: any
  ): Promise<void> {
    for (const recipient of recipients) {
      const notification: Notification = {
        id: this.generateId(),
        type: 'notification',
        target: recipient,
        subject: `Compliance Report: ${reportType}`,
        message: `Compliance report generated. See attached.`,
        priority: 'low',
        data: { reportType, reportData },
        sent_at: new Date().toISOString(),
        status: 'pending',
      };

      await this.send(notification);
    }
  }

  private async send(notification: Notification): Promise<void> {
    try {
      // In production, integrate with email/Slack/Teams
      console.log(`[NOTIFICATION] ${notification.type} to ${notification.target}: ${notification.subject}`);
      notification.status = 'sent';
    } catch (error) {
      notification.status = 'failed';
    }
    
    this.notifications.push(notification);
  }

  private formatAlertMessage(result: ComplianceResult): string {
    return `
Compliance violation detected:

Rule: ${result.rule_id}
Entity: ${result.entity_type} (${result.entity_id})
Status: ${result.status}
Violations: ${result.violations.length}

${result.violations.map(v => `- ${v.field}: ${v.message}`).join('\n')}

Please take immediate action.
    `.trim();
  }

  private formatNotificationMessage(result: ComplianceResult): string {
    return `
A compliance issue has been identified:

Rule: ${result.rule_id}
Entity: ${result.entity_type} (${result.entity_id})

${result.violations.map(v => `- ${v.message}`).join('\n')}

Please review and address.
    `.trim();
  }

  private formatEscalationMessage(result: ComplianceResult): string {
    return `
ESCALATION - Compliance violation requires immediate attention:

Rule: ${result.rule_id}
Entity: ${result.entity_type} (${result.entity_id})
Severity: Critical

Violations:
${result.violations.map(v => `- ${v.field}: ${v.message}`).join('\n')}

This issue has been escalated due to its severity.
Immediate action required.
    `.trim();
  }

  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default NotificationService;
