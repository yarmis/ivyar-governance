# Snapshot Logic

## Update Rules

| Trigger | Action |
|---------|--------|
| Data change | Refresh view |
| Hourly tick | Update trends |
| Daily tick | Update forecasts |

## Snapshot Structure

| Field | Type |
|-------|------|
| timestamp | datetime |
| readiness | object |
| risk | object |
| gaps | object |

## Retention

| Type | Keep |
|------|------|
| Hourly | 24 |
| Daily | 30 |
| Weekly | 12 |

## Auto-Archive

- Daily at 00:00 UTC
- Weekly on Sunday
- Monthly on 1st
