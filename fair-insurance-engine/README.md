# Fair Insurance Engine

## IVYAR Integrated Insurance System

**Version:** 1.0.0  
**Status:** Active  
**Integration:** Pension Fund Engine

---

## Overview

Comprehensive insurance management system for military personnel, veterans, and pensioners with full integration to the IVYAR Pension Fund Engine.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FAIR INSURANCE ENGINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Life     │  │   Health    │  │  Disability │  │   Property  │        │
│  │  Insurance  │  │  Insurance  │  │  Insurance  │  │  Insurance  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                   │                                          │
│                    ┌──────────────┴──────────────┐                          │
│                    │     INTEGRATION LAYER       │                          │
│                    │  ┌────────────────────────┐ │                          │
│                    │  │   Pension Fund Engine  │ │                          │
│                    │  └────────────────────────┘ │                          │
│                    └─────────────────────────────┘                          │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Underwriting│  │   Claims    │  │   Policies  │  │   Billing   │        │
│  │   Engine    │  │  Processing │  │  Management │  │   Engine    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Insurance Products

| Product | Description | Coverage |
|---------|-------------|----------|
| **Military Life** | Life insurance for active/veteran | Up to 2M ₴ |
| **Health Plus** | Medical coverage | Full medical |
| **Disability Shield** | Disability protection | Income replacement |
| **Combat Cover** | Combat zone coverage | Special terms |
| **Family Protection** | Survivor benefits | Dependents |
| **Property Guard** | Housing/property | Up to 5M ₴ |

## Pension Integration Features

- **Automatic Enrollment** — Pensioners auto-enrolled in basic coverage
- **Premium Deduction** — Premiums deducted from pension payments
- **Benefit Coordination** — Insurance + pension benefit sync
- **Unified Profile** — Single view of pension and insurance
- **Claims Fast-Track** — Expedited claims for pensioners

## Quick Start

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run start
```

## Project Structure

```
fair-insurance-engine/
├── config/           # Configuration
├── models/           # Data models
├── services/         # Business logic
├── policies/         # Policy management
├── claims/           # Claims processing
├── underwriting/     # Risk assessment
├── integration/      # Pension integration
├── api/              # REST API
├── reports/          # Reporting
└── tests/            # Test suites
```
