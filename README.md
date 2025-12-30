# IVYAR Governance Platform

**Integrated Vehicle Yard & Asset Registry**

Military logistics, fleet management, and pension administration platform for Ukraine's Armed Forces.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-Government-green)
![Status](https://img.shields.io/badge/status-Production-success)

---

## 🎯 Overview

IVYAR is a comprehensive governance platform providing:

- **Fleet Management** — Vehicle tracking, maintenance, parts inventory
- **Repair Coverage** — Warranty management, service contracts
- **Compliance** — STANAG, MIL-STD, NATO standards
- **AI Administrator** — Intelligent assistance for logistics
- **Pension Fund** — Military pension administration

---

## 📦 Platform Modules

| Module | Description | Status |
|--------|-------------|--------|
| [Dashboards](./dashboards/) | Interactive monitoring dashboards | ✅ Active |
| [API Documentation](./api-docs/) | OpenAPI 3.1 specifications | ✅ Active |
| [Deployment Guide](./deployment/) | Docker, K8s, CI/CD | ✅ Active |
| [Integration Tests](./integration-tests/) | E2E test suites | ✅ Active |
| [Mobile App](./mobile-app-specs/) | React Native specifications | ✅ Active |
| [Localization](./localization/) | EN, UK, DE, PL | ✅ Active |
| [Security](./security-docs/) | Threat models, incident response | ✅ Active |
| [Compliance Engine](./compliance-engine/) | Regulatory validation | ✅ Active |
| [AI Administrator](./ai-administrator/) | AI-powered assistance | ✅ Active |
| [**Pension Fund**](./pension-fund-engine/) | **Military pension system** | ✅ **NEW** |

---

## 🏛️ Pension Fund Engine

### Overview

Complete military pension administration system:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PENSION FUND ENGINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📋 Registry        💰 Benefits       💳 Payments               │
│  125,430 pensioners  Formula-based    Monthly batch              │
│                      calculations     processing                 │
│                                                                  │
│  📊 Forecasting     🔒 Compliance     📈 Analytics              │
│  30-year actuarial  GDPR, SOC2       Real-time                  │
│  projections        ISO 27001        dashboards                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Benefit Calculator** | Base + Combat + Disability + Rank coefficients |
| **Eligibility Engine** | Military, Government, Disability, Survivor |
| **Payment Processing** | Bank transfer, Postal, International |
| **Indexation** | Automatic inflation adjustments |
| **Actuarial Forecast** | Long-term fund sustainability |
| **Fraud Detection** | AI-powered anomaly detection |

### Pension Formula

```
PENSION = BASE_SALARY × (50% + 2% × EXTRA_YEARS) × RANK_COEF + BONUSES

Where:
- Combat years count 3× (1 combat year = 3 regular years)
- Rank coefficients: 1.00 (Soldier) → 2.60 (General)
- Disability bonus: 15-75% based on group and cause
- Maximum: 90% of base salary, capped at 150,000 ₴
```

### Quick Links

- [📘 Governance Policy](./pension-fund-engine/policies/pension-governance-policy.md)
- [🔢 Calculation Formulas](./pension-fund-engine/docs/pension-calculation-formulas.md)
- [🎨 UI Design System](./pension-fund-engine/ui/pension-portal-ui-design.md)
- [🔌 API Reference](./pension-fund-engine/api/docs/pension-api-reference.md)
- [📄 OpenAPI Spec](./pension-fund-engine/api/docs/pension-api-openapi.yaml)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/ivyar-governance.git
cd ivyar-governance

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

### Docker Deployment

```bash
docker-compose up -d
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           IVYAR GOVERNANCE PLATFORM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         PRESENTATION LAYER                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │  │
│  │  │   Web App   │  │ Mobile App  │  │   Admin     │  │  Pension    │ │  │
│  │  │  (React)    │  │   (RN)      │  │  Portal     │  │  Portal     │ │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                           API GATEWAY                                 │  │
│  │              Authentication │ Rate Limiting │ Routing                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                          SERVICE LAYER                                │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │  │
│  │  │  Fleet   │ │  Parts   │ │ Repairs  │ │Compliance│ │ Pension  │  │  │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Engine   │ │ Engine   │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                          DATA LAYER                                   │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │  │
│  │  │PostgreSQL│ │  Redis   │ │   S3     │ │Elasticsearch│            │  │
│  │  │  (Main)  │ │ (Cache)  │ │ (Files)  │ │ (Search)   │             │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Module Statistics

| Metric | Value |
|--------|-------|
| Total Modules | 10 |
| Total Files | ~170+ |
| API Endpoints | 100+ |
| Test Coverage | 85%+ |
| Languages | EN, UK, DE, PL |

---

## 🔐 Security

- JWT + mTLS authentication
- Role-based access control (RBAC)
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Audit logging
- GDPR compliant

---

## 📞 Support

| Channel | Contact |
|---------|---------|
| Documentation | [docs.ivyar.gov.ua](https://docs.ivyar.gov.ua) |
| API Support | api-support@ivyar.gov.ua |
| Security | security@ivyar.gov.ua |
| General | support@ivyar.gov.ua |

---

## 📜 License

Government Use License — Ministry of Defense of Ukraine

---

*IVYAR Governance Platform v2.0.0*  
*Serving Ukraine's Armed Forces*  
🇺🇦 **Слава Україні!**
