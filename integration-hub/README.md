# IVYAR Integration Hub

Central integration layer connecting IVYAR platform modules.

## Active Integrations

| Integration | Modules | Status |
|-------------|---------|--------|
| Pension-Insurance | Pension Fund ↔ Fair Insurance | ✅ Active |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         IVYAR INTEGRATION HUB                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    PENSION-INSURANCE BRIDGE                          │   │
│  │                                                                       │   │
│  │   PENSION FUND ENGINE              FAIR INSURANCE ENGINE             │   │
│  │   ┌─────────────────┐              ┌─────────────────┐              │   │
│  │   │                 │   ◄──────►   │                 │              │   │
│  │   │  • Registry     │   Data Sync  │  • Policies     │              │   │
│  │   │  • Benefits     │              │  • Claims       │              │   │
│  │   │  • Payments     │   ◄──────►   │  • Premiums     │              │   │
│  │   │  • Indexation   │   Premium    │  • Underwriting │              │   │
│  │   │                 │   Deduction  │                 │              │   │
│  │   └─────────────────┘              └─────────────────┘              │   │
│  │              │                              │                        │   │
│  │              └──────────────┬───────────────┘                       │   │
│  │                             │                                        │   │
│  │                    ┌────────▼────────┐                              │   │
│  │                    │   UNIFIED API   │                              │   │
│  │                    └─────────────────┘                              │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Features

### Data Synchronization
- Pensioner profile sync to Insurance
- Service history import
- Disability status sync
- Rank and service years sync

### Premium Deduction
- Automatic premium deduction from pension
- Maximum deduction limits (10% of pension)
- Monthly processing with pension payments

### Benefit Coordination
- Primary/Secondary benefit designation
- Duplicate benefit prevention
- Combined benefit statements

### Unified Portal
- Single login for both systems
- Combined dashboard
- Unified document management
