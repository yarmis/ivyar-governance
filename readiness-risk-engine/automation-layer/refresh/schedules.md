# Data Refresh Schedules

## Real-time (< 1 min)

| Data | Source | Trigger |
|------|--------|---------|
| Fleet status | Fleet DB | On change |
| Active alerts | Risk Engine | On event |
| Critical GAPs | GAP Matrix | On update |

## Hourly

| Data | Source | Time |
|------|--------|------|
| Risk scores | Risk Engine | :00 |
| Readiness index | Calc Engine | :15 |
| Trend data | Analytics | :30 |

## Daily

| Data | Source | Time |
|------|--------|------|
| Forecasts | Prediction | 00:00 UTC |
| Snapshots | Dashboard | 00:30 UTC |
| GAP progress | GAP Matrix | 01:00 UTC |

## Weekly

| Data | Source | Day |
|------|--------|-----|
| Ministry report | Reports | Sunday |
| Full validation | Loop | Saturday |
| Archive cleanup | Storage | Sunday |
