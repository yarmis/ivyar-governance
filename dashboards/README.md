# IVYAR Dashboards Module

## Overview

Централізована система дашбордів для моніторингу флоту, ремонтних операцій, покриття каталогу та ключових бізнес-метрик IVYAR.

## Dashboard Types

| Dashboard | Refresh | Audience | Purpose |
|-----------|---------|----------|---------|
| Fleet Readiness | Real-time | Operations | Vehicle operational status |
| Repair Queue | 5 min | Workshop | Active repairs tracking |
| Coverage Analytics | Hourly | Analysts | Catalog coverage metrics |
| Supply Chain | 15 min | Logistics | Inventory & procurement |
| Financial | Daily | Finance | Cost & budget tracking |
| Executive Summary | Daily | Leadership | KPIs overview |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DASHBOARD SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         PRESENTATION LAYER                           │   │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│   │  │  Fleet   │ │  Repair  │ │ Coverage │ │  Supply  │ │Executive │  │   │
│   │  │ Readiness│ │  Queue   │ │ Analytics│ │  Chain   │ │ Summary  │  │   │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          WIDGET LIBRARY                              │   │
│   │  KPICard │ Chart │ Table │ Map │ Timeline │ Gauge │ Alert │ Filter │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                           DATA LAYER                                 │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │   │
│   │  │  REST API    │  │  WebSocket   │  │  GraphQL     │               │   │
│   │  │  (polling)   │  │  (realtime)  │  │  (flexible)  │               │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘               │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         DATA SOURCES                                 │   │
│   │  Catalog DB │ Fleet Telemetry │ Repair System │ ERP │ External APIs │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Module Structure

```
dashboards/
├── README.md                    # This file
├── specs/
│   ├── fleet-readiness.md      # Fleet status dashboard
│   ├── repair-queue.md         # Repair operations dashboard
│   ├── coverage-analytics.md   # Catalog coverage dashboard
│   ├── supply-chain.md         # Logistics dashboard
│   ├── financial.md            # Financial dashboard
│   └── executive-summary.md    # Executive KPIs dashboard
├── reports/
│   └── templates/
│       ├── daily-ops.md        # Daily operations report
│       ├── weekly-summary.md   # Weekly summary report
│       └── monthly-review.md   # Monthly review report
├── widgets/
│   ├── widget-library.md       # Widget specifications
│   └── components/             # React components
├── api/
│   └── dashboard-api.yaml      # OpenAPI specification
└── exports/
    └── export-formats.md       # Export capabilities
```

## Quick Start

### Embed Dashboard

```html
<iframe 
  src="https://dashboard.ivyar.org/fleet-readiness?token=xxx"
  width="100%" 
  height="600"
></iframe>
```

### React Component

```tsx
import { Dashboard, FleetReadiness } from '@ivyar/dashboards';

<Dashboard type="fleet-readiness" filters={{ brigade: '72' }} />
```

### API Access

```bash
curl -X GET "https://api.ivyar.org/v1/dashboards/fleet-readiness/data" \
  -H "Authorization: Bearer $TOKEN"
```

## Features

- ✅ Real-time updates via WebSocket
- ✅ Role-based access control
- ✅ Customizable layouts
- ✅ Export to PDF/Excel/PNG
- ✅ Scheduled reports
- ✅ Mobile responsive
- ✅ Dark mode support
- ✅ Drill-down capabilities
- ✅ Alert thresholds
- ✅ Multi-language (EN/UK/DE)

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | <2s |
| Data Refresh | <500ms |
| Chart Render | <100ms |
| Export Generation | <5s |

*Version: 1.0.0 | December 2025*
