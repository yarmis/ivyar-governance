# Fair Insurance Engine

Insurance management system for military personnel with Pension Fund integration.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FAIR INSURANCE ENGINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │   Life    │  │  Health   │  │ Disability│  │  Property │                │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘                │
│        └──────────────┼──────────────┼──────────────┘                      │
│                       │              │                                      │
│                ┌──────┴──────────────┴──────┐                              │
│                │   PENSION INTEGRATION      │                              │
│                │  • Premium Deduction       │                              │
│                │  • Benefit Coordination    │                              │
│                │  • Auto-Enrollment         │                              │
│                └────────────────────────────┘                              │
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │Underwrite │  │  Claims   │  │ Policies  │  │  Billing  │                │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Products

| Code | Name | Coverage | Base Rate |
|------|------|----------|-----------|
| LIFE-MIL | Military Life | 50K - 2M ₴ | 3.5₴/1K/year |
| LIFE-VET | Veteran Life | 50K - 1.5M ₴ | 4.0₴/1K/year |
| HEALTH-BASIC | Basic Health | 100K limit | 3,600₴/year |
| HEALTH-STD | Standard Health | 300K limit | 7,200₴/year |
| HEALTH-PREM | Premium Health | 1M limit | 14,400₴/year |
| DIS-INCOME | Disability Income | 60% income | Variable |

## Premium Calculation

```
ANNUAL_PREMIUM = BASE_PREMIUM × AGE_FACTOR × RISK_FACTOR
                 - MILITARY_DISCOUNT - PENSIONER_DISCOUNT
                 + COMBAT_LOADING

Where:
- BASE_PREMIUM = (Coverage / 1000) × Base Rate
- MILITARY_DISCOUNT = 15%
- PENSIONER_DISCOUNT = 10%
- COMBAT_LOADING = 25% (for combat veterans)
```

## Pension Integration

### Premium Deduction
- Maximum 10% of pension can be deducted for premiums
- Automatic monthly deduction with pension payment
- Cancellation syncs with pension system

### Benefit Coordination
- Insurance primary for medical claims
- Supplemental coordination for disability/death
- Combined statement available

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | List products |
| POST | /quotes | Get quote |
| POST | /policies | Create policy |
| POST | /claims | Submit claim |
| GET | /pension/eligibility/:id | Check pension integration |
| POST | /pension/auto-enroll | Auto-enroll pensioner |

---
*Version 1.0.0 | IVYAR Governance Platform*
