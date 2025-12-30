# IVYAR Governance Platform

**Integrated Vehicle Yard & Asset Registry**

Military logistics, fleet management, pension administration, and insurance platform.

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![Modules](https://img.shields.io/badge/modules-12-green)
![License](https://img.shields.io/badge/license-Government-orange)

---

## Platform Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       IVYAR GOVERNANCE PLATFORM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        CORE MODULES                                   │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │  │
│  │  │  Fleet  │ │  Parts  │ │ Repairs │ │Compliance│ │   AI    │       │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    FINANCIAL MODULES                                  │  │
│  │  ┌─────────────────────┐     ┌─────────────────────┐                │  │
│  │  │   PENSION FUND      │◄───►│   FAIR INSURANCE    │                │  │
│  │  │   • Registry        │     │   • Life/Health     │                │  │
│  │  │   • Benefits        │     │   • Claims          │                │  │
│  │  │   • Payments        │     │   • Underwriting    │                │  │
│  │  │   • Forecasting     │     │   • Premium Calc    │                │  │
│  │  └─────────────────────┘     └─────────────────────┘                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    INTEGRATION HUB                                    │  │
│  │            Pension-Insurance Bridge | Unified APIs                    │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Modules

| Module | Description | Status |
|--------|-------------|--------|
| [Dashboards](./dashboards/) | Interactive monitoring | ✅ Active |
| [API Documentation](./api-docs/) | OpenAPI specs | ✅ Active |
| [Deployment](./deployment/) | Docker, K8s, CI/CD | ✅ Active |
| [Integration Tests](./integration-tests/) | E2E test suites | ✅ Active |
| [Mobile App](./mobile-app-specs/) | React Native specs | ✅ Active |
| [Localization](./localization/) | EN, UK, DE, PL | ✅ Active |
| [Security](./security-docs/) | Threat models | ✅ Active |
| [Compliance Engine](./compliance-engine/) | Regulatory validation | ✅ Active |
| [AI Administrator](./ai-administrator/) | AI assistance | ✅ Active |
| [**Pension Fund**](./pension-fund-engine/) | Pension administration | ✅ Active |
| [**Fair Insurance**](./fair-insurance-engine/) | Insurance management | ✅ Active |
| [**Integration Hub**](./integration-hub/) | Module integration | ✅ Active |

## Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/ivyar-governance.git
cd ivyar-governance

# Install dependencies
npm install

# Run development
npm run dev

# Run tests
npm test
```

## Pension-Insurance Integration

### Key Features

- **Premium Deduction**: Auto-deduct insurance premiums from pension (max 10%)
- **Benefit Coordination**: Coordinated payouts for disability/death claims
- **Auto-Enrollment**: Pensioners auto-enrolled in recommended coverage
- **Unified Profile**: Single view of pension and insurance status

### Example: Pension Calculation

```typescript
const result = calculator.calculate({
  pensioner: {
    total_service_years: 25,
    combat_service_years: 5,
    military_rank: 'colonel',
    base_salary_at_retirement: 65000,
  }
});

// Result:
// - Effective Years: 35 (25 + 5×2)
// - Pension %: 80% (50 + 15×2)
// - Base: 52,000 ₴
// - With coefficients: ~115,000 ₴
```

## Documentation

- [Pension Calculation Formulas](./pension-fund-engine/docs/pension-calculation-formulas.md)
- [Pension Governance Policy](./pension-fund-engine/policies/pension-governance-policy.md)
- [Insurance API Reference](./fair-insurance-engine/api/README.md)
- [Integration Guide](./integration-hub/README.md)

## Statistics

| Metric | Value |
|--------|-------|
| Total Modules | 12 |
| API Endpoints | 100+ |
| Test Coverage | 85%+ |
| Languages | 4 (EN, UK, DE, PL) |

---

**IVYAR Governance Platform v2.1.0**  
*Ministry of Defense of Ukraine*  
🇺🇦 Slava Ukraini!
