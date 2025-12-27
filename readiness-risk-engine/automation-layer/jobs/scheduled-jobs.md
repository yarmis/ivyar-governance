# Scheduled Jobs

## Cron Schedule

| Job | Cron | Description |
|-----|------|-------------|
| risk-calc | 0 * * * * | Hourly risk calc |
| readiness-calc | 15 * * * * | Hourly readiness |
| snapshot | 0 0 * * * | Daily snapshot |
| forecast | 30 0 * * * | Daily forecast |
| validation | 0 2 * * 6 | Weekly tests |
| report | 0 3 * * 0 | Weekly report |

## Job Dependencies

| Job | Depends On |
|-----|------------|
| readiness-calc | risk-calc |
| snapshot | readiness-calc |
| forecast | snapshot |
| report | validation |

## Failure Handling

| Failure | Action |
|---------|--------|
| Job timeout | Retry 3x |
| Job error | Alert Ops |
| Critical job fail | Escalate |

## Monitoring

- All jobs logged
- Duration tracked
- Failures alerted
