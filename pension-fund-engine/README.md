# IVYAR Pension Fund Engine

Military pension administration system with actuarial forecasting, compliance, and payment processing.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PENSION FUND ENGINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │   Registry   │────▶│  Calculator  │────▶│  Indexation  │                │
│  └──────────────┘     └──────┬───────┘     └──────────────┘                │
│                              │                                              │
│  ┌──────────────┐     ┌──────▼───────┐     ┌──────────────┐                │
│  │  Eligibility │────▶│   Payment    │────▶│  Forecast    │                │
│  └──────────────┘     └──────────────┘     └──────────────┘                │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    COMPLIANCE (GDPR, SOC2, ISO27001)                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Pension Calculation Formula

### Master Formula

```
FINAL_PENSION = min(max(GROSS, MIN_PENSION), MAX_PENSION)

Where:
GROSS = BASE × SERVICE_COEF × RANK_COEF + COMBAT_BONUS + DISABILITY_BONUS + OTHER_BONUSES
```

### Step-by-Step Calculation

| Step | Formula | Description |
|------|---------|-------------|
| 1 | `EFFECTIVE_YEARS = TOTAL + COMBAT × 2` | Combat years add 2 bonus years each |
| 2 | `PENSION_PCT = 50% + 2% × max(0, EFFECTIVE_YEARS - 20)` | Base 50%, +2%/year over 20 |
| 3 | `PENSION_PCT = min(PENSION_PCT, 90%)` | Cap at 90% |
| 4 | `BASE = SALARY × PENSION_PCT` | Apply percentage to salary |
| 5 | `INTERMEDIATE = BASE × SERVICE_COEF × RANK_COEF` | Apply coefficients |
| 6 | `COMBAT_BONUS = BASE × 2% × COMBAT_YEARS` | 2% per combat year |
| 7 | `DISABILITY_BONUS = BASE × GROUP_RATE × CAUSE_MULT` | Based on group and cause |
| 8 | `GROSS = INTERMEDIATE + ALL_BONUSES` | Sum all components |
| 9 | `FINAL = clamp(GROSS, 3000, 150000)` | Apply limits |

### Service Coefficient Table

| Years | Coefficient |
|-------|-------------|
| < 15 | 0.90 |
| 15-19 | 0.95 |
| 20-24 | 1.00 |
| 25-29 | 1.10 |
| 30-34 | 1.20 |
| 35+ | 1.30 |

### Rank Coefficient Table

| Category | Ranks | Coefficient Range |
|----------|-------|-------------------|
| Enlisted | Soldier → Master Sergeant | 1.00 - 1.20 |
| Junior Officers | Jr. Lieutenant → Captain | 1.22 - 1.35 |
| Senior Officers | Major → Colonel | 1.45 - 1.70 |
| Generals | Brig. General → General | 2.00 - 2.60 |

### Disability Bonus

| Group | Base Rate | Combat Multiplier | Result |
|-------|-----------|-------------------|--------|
| I | 50% | ×1.5 | 75% |
| II | 30% | ×1.5 | 45% |
| III | 15% | ×1.5 | 22.5% |

## Quick Start

```bash
npm install
npm run build
npm run test
npm run start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /registry | List pensioners |
| GET | /registry/:id | Get pensioner |
| POST | /registry | Create pensioner |
| POST | /benefit/calculate | Calculate pension |
| POST | /payment/batch | Process batch payments |
| POST | /indexation/apply | Apply indexation |
| POST | /forecast/generate | Generate actuarial forecast |

## Integration

- **Fair Insurance Engine** - Premium deduction, benefit coordination
- **AI Administrator** - Intelligent assistance
- **Compliance Engine** - Regulatory validation

---
*Version 1.0.0 | IVYAR Governance Platform*
