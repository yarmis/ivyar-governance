# Repair Pipeline Diagram

## Repair Flow
```
FIELD (R1) --> BASE (R2) --> DEPOT (R3) --> FACTORY (R4)
  15-30 min     2-8 hours     1-5 days       1-4 weeks
```

## R1 - Field Repair
- Location: Front line
- Time: 15-30 minutes
- Scope: Component swap
- Executors: Crew, mobile teams

## R2 - Base Repair
- Location: Brigade rear
- Time: 2-8 hours
- Scope: Basic diagnostics
- Executors: Mobile workshops

## R3 - Deep Repair
- Location: Stationary facilities
- Time: 1-5 days
- Scope: Full diagnostics, overhaul
- Executors: Repair plants

## R4 - Capital Repair
- Location: Factories
- Time: 1-4 weeks
- Scope: Complete overhaul
- Executors: OEM partners

## Decision Matrix

| Damage | Platform | Level |
|--------|----------|-------|
| Minor | LTV/MTV | R1 |
| Moderate | LTV | R2 |
| Moderate | HTV | R2-R3 |
| Severe | Any | R3 |
| Critical | Any | R4 |
