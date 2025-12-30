/**
 * Usage Tracker - Track AI usage, costs, performance
 */

export interface UsageRecord {
  requestId: string; userId: string; feature: string; model: string; provider: string;
  usage: { inputTokens: number; outputTokens: number; totalTokens: number; estimatedCost: number };
  latencyMs: number; timestamp: string;
}

export interface UserUsage { requestsLastMinute: number; requestsLastHour: number; requestsLastDay: number; tokensLastDay: number; totalCost: number }

export class UsageTracker {
  private records: UsageRecord[] = [];

  async track(record: UsageRecord): Promise<void> { this.records.push(record); }

  async getUserUsage(userId: string): Promise<UserUsage> {
    const now = Date.now();
    const user = this.records.filter(r => r.userId === userId);
    const lastMin = user.filter(r => new Date(r.timestamp).getTime() > now - 60000);
    const lastHour = user.filter(r => new Date(r.timestamp).getTime() > now - 3600000);
    const lastDay = user.filter(r => new Date(r.timestamp).getTime() > now - 86400000);
    return {
      requestsLastMinute: lastMin.length, requestsLastHour: lastHour.length, requestsLastDay: lastDay.length,
      tokensLastDay: lastDay.reduce((s, r) => s + r.usage.totalTokens, 0),
      totalCost: lastDay.reduce((s, r) => s + r.usage.estimatedCost, 0),
    };
  }

  async getSummary(startDate: string, endDate: string) {
    const filtered = this.records.filter(r => r.timestamp >= startDate && r.timestamp <= endDate);
    const byFeature: Record<string, number> = {};
    filtered.forEach(r => { byFeature[r.feature] = (byFeature[r.feature] || 0) + 1; });
    return {
      totalRequests: filtered.length,
      totalTokens: filtered.reduce((s, r) => s + r.usage.totalTokens, 0),
      totalCost: filtered.reduce((s, r) => s + r.usage.estimatedCost, 0),
      avgLatencyMs: filtered.length ? filtered.reduce((s, r) => s + r.latencyMs, 0) / filtered.length : 0,
      byFeature,
    };
  }

  async getDailyUsage(days: number = 30) {
    const result: Array<{ date: string; requests: number; tokens: number; cost: number }> = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const day = this.records.filter(r => r.timestamp.startsWith(dateStr));
      result.push({ date: dateStr, requests: day.length, tokens: day.reduce((s, r) => s + r.usage.totalTokens, 0), cost: day.reduce((s, r) => s + r.usage.estimatedCost, 0) });
    }
    return result.reverse();
  }
}

export default UsageTracker;
