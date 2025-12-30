/**
 * Audit Logger - Complete audit trail
 */

export interface AuditEntry {
  id: string; timestamp: string; requestId: string; userId: string;
  feature: string; action: string; status: 'success' | 'error' | 'filtered' | 'blocked';
  metadata: Record<string, any>;
}

export class AuditLogger {
  private entries: AuditEntry[] = [];

  async log(entry: Omit<AuditEntry, 'id' | 'timestamp'>): Promise<void> {
    this.entries.push({ id: `audit_${Date.now()}`, timestamp: new Date().toISOString(), ...entry });
  }

  async query(filters: { userId?: string; feature?: string; limit?: number }): Promise<AuditEntry[]> {
    let results = [...this.entries];
    if (filters.userId) results = results.filter(e => e.userId === filters.userId);
    if (filters.feature) results = results.filter(e => e.feature === filters.feature);
    results.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return filters.limit ? results.slice(0, filters.limit) : results;
  }
}

export default AuditLogger;
