# Risk Triggers

## Automatic Triggers

| Condition | Action |
|-----------|--------|
| Risk > 75 | Alert RED |
| Readiness < 50 | Alert RED |
| GAP behind 10% | Alert AMBER |
| Parts stock < 7 days | Alert AMBER |

## Escalation Triggers

| Condition | Escalate To |
|-----------|-------------|
| RED alert 4h | Ops Lead |
| RED alert 24h | Ministry |
| Multiple RED | Emergency meeting |

## Recovery Triggers

| Condition | Action |
|-----------|--------|
| Risk drops < 50 | Clear AMBER |
| Risk drops < 40 | Clear alert |
| GAP on track | Update status |

## Notification Channels

| Level | Channel |
|-------|---------|
| INFO | Dashboard only |
| AMBER | Email + Dashboard |
| RED | SMS + Email + Dashboard |
