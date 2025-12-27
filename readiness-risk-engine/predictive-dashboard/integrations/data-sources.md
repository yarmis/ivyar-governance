# Data Source Integrations

## Input Sources

| Source | Data | Frequency |
|--------|------|-----------|
| Risk Engine | Scores | Real-time |
| Validation Loop | Test results | Hourly |
| GAP Matrix | Progress | Daily |
| Fleet DB | Status | Real-time |

## Output Targets

| Target | Format | Frequency |
|--------|--------|-----------|
| Dashboard | JSON | Real-time |
| Ministry | PDF | Weekly |
| Alerts | Push | Immediate |

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| /api/predict/readiness | Forecast |
| /api/predict/risk | Risk trend |
| /api/predict/gaps | GAP trajectory |
