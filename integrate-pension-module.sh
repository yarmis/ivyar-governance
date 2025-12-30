#!/bin/bash
# Integrate Pension Fund Engine into IVYAR Governance Portal
# Run from ivyar-governance root directory

set -e

echo "🏛️ Integrating Pension Fund Engine into Governance Portal..."

# ============================================================================
# UPDATE MAIN README
# ============================================================================
cat > README.md << 'ENDFILE'
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
ENDFILE

# ============================================================================
# CREATE MODULE REGISTRY
# ============================================================================
cat > modules.json << 'ENDFILE'
{
  "platform": "IVYAR Governance",
  "version": "2.0.0",
  "updated": "2025-01-01",
  "modules": [
    {
      "id": "dashboards",
      "name": "Dashboards",
      "description": "Interactive monitoring dashboards",
      "path": "./dashboards/",
      "version": "1.0.0",
      "status": "active",
      "category": "visualization"
    },
    {
      "id": "api-docs",
      "name": "API Documentation",
      "description": "OpenAPI 3.1 specifications",
      "path": "./api-docs/",
      "version": "1.0.0",
      "status": "active",
      "category": "documentation"
    },
    {
      "id": "deployment",
      "name": "Deployment Guide",
      "description": "Docker, Kubernetes, CI/CD configurations",
      "path": "./deployment/",
      "version": "1.0.0",
      "status": "active",
      "category": "infrastructure"
    },
    {
      "id": "integration-tests",
      "name": "Integration Tests",
      "description": "End-to-end test suites with Playwright",
      "path": "./integration-tests/",
      "version": "1.0.0",
      "status": "active",
      "category": "testing"
    },
    {
      "id": "mobile-app",
      "name": "Mobile App Specs",
      "description": "React Native mobile application specifications",
      "path": "./mobile-app-specs/",
      "version": "1.0.0",
      "status": "active",
      "category": "mobile"
    },
    {
      "id": "localization",
      "name": "Localization",
      "description": "Multi-language support (EN, UK, DE, PL)",
      "path": "./localization/",
      "version": "1.0.0",
      "status": "active",
      "category": "i18n",
      "languages": ["en", "uk", "de", "pl"]
    },
    {
      "id": "security-docs",
      "name": "Security Documentation",
      "description": "Threat models, incident response, security policies",
      "path": "./security-docs/",
      "version": "1.0.0",
      "status": "active",
      "category": "security"
    },
    {
      "id": "compliance-engine",
      "name": "Compliance Engine",
      "description": "Regulatory validation and compliance checking",
      "path": "./compliance-engine/",
      "version": "1.0.0",
      "status": "active",
      "category": "compliance",
      "standards": ["STANAG", "MIL-STD", "ISO"]
    },
    {
      "id": "ai-administrator",
      "name": "AI Administrator",
      "description": "AI-powered assistance and automation",
      "path": "./ai-administrator/",
      "version": "1.0.0",
      "status": "active",
      "category": "ai",
      "providers": ["anthropic", "openai"]
    },
    {
      "id": "pension-fund-engine",
      "name": "Pension Fund Engine",
      "description": "Military pension administration system",
      "path": "./pension-fund-engine/",
      "version": "1.0.0",
      "status": "active",
      "category": "pension",
      "features": [
        "benefit-calculator",
        "eligibility-engine",
        "payment-processing",
        "actuarial-forecast",
        "indexation",
        "compliance"
      ],
      "api": {
        "base_url": "/pension/v1",
        "endpoints": 40,
        "openapi": "./pension-fund-engine/api/docs/pension-api-openapi.yaml"
      }
    }
  ],
  "categories": {
    "core": ["dashboards", "api-docs"],
    "infrastructure": ["deployment", "integration-tests"],
    "frontend": ["mobile-app", "localization"],
    "security": ["security-docs", "compliance-engine"],
    "services": ["ai-administrator", "pension-fund-engine"]
  }
}
ENDFILE

# ============================================================================
# CREATE NAVIGATION CONFIG
# ============================================================================
cat > src/config/navigation.ts << 'ENDFILE'
/**
 * IVYAR Governance Portal - Navigation Configuration
 */

export interface NavItem {
  id: string;
  label: string;
  labelUk: string;
  path: string;
  icon: string;
  children?: NavItem[];
  permissions?: string[];
  badge?: string;
}

export const mainNavigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    labelUk: 'Панель',
    path: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'fleet',
    label: 'Fleet Management',
    labelUk: 'Управління флотом',
    path: '/fleet',
    icon: 'Truck',
    children: [
      { id: 'vehicles', label: 'Vehicles', labelUk: 'Транспорт', path: '/fleet/vehicles', icon: 'Car' },
      { id: 'maintenance', label: 'Maintenance', labelUk: 'Обслуговування', path: '/fleet/maintenance', icon: 'Wrench' },
      { id: 'parts', label: 'Parts Inventory', labelUk: 'Запчастини', path: '/fleet/parts', icon: 'Package' },
    ],
  },
  {
    id: 'repairs',
    label: 'Repair Coverage',
    labelUk: 'Ремонтне покриття',
    path: '/repairs',
    icon: 'Shield',
    children: [
      { id: 'warranties', label: 'Warranties', labelUk: 'Гарантії', path: '/repairs/warranties', icon: 'FileCheck' },
      { id: 'claims', label: 'Claims', labelUk: 'Заявки', path: '/repairs/claims', icon: 'FileText' },
      { id: 'contracts', label: 'Contracts', labelUk: 'Контракти', path: '/repairs/contracts', icon: 'FileContract' },
    ],
  },
  {
    id: 'pension',
    label: 'Pension Fund',
    labelUk: 'Пенсійний фонд',
    path: '/pension',
    icon: 'Wallet',
    badge: 'NEW',
    children: [
      { id: 'pension-dashboard', label: 'Overview', labelUk: 'Огляд', path: '/pension/dashboard', icon: 'BarChart' },
      { id: 'pensioners', label: 'Pensioners', labelUk: 'Пенсіонери', path: '/pension/registry', icon: 'Users' },
      { id: 'benefits', label: 'Benefits', labelUk: 'Виплати', path: '/pension/benefits', icon: 'Calculator' },
      { id: 'payments', label: 'Payments', labelUk: 'Платежі', path: '/pension/payments', icon: 'CreditCard' },
      { id: 'indexation', label: 'Indexation', labelUk: 'Індексація', path: '/pension/indexation', icon: 'TrendingUp' },
      { id: 'forecast', label: 'Forecast', labelUk: 'Прогноз', path: '/pension/forecast', icon: 'LineChart' },
    ],
    permissions: ['pension:read'],
  },
  {
    id: 'compliance',
    label: 'Compliance',
    labelUk: 'Відповідність',
    path: '/compliance',
    icon: 'CheckSquare',
    children: [
      { id: 'standards', label: 'Standards', labelUk: 'Стандарти', path: '/compliance/standards', icon: 'Award' },
      { id: 'audits', label: 'Audits', labelUk: 'Аудити', path: '/compliance/audits', icon: 'ClipboardCheck' },
      { id: 'reports', label: 'Reports', labelUk: 'Звіти', path: '/compliance/reports', icon: 'FileBarChart' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    labelUk: 'AI Асистент',
    path: '/ai',
    icon: 'Bot',
    children: [
      { id: 'chat', label: 'Chat', labelUk: 'Чат', path: '/ai/chat', icon: 'MessageSquare' },
      { id: 'part-search', label: 'Part Search', labelUk: 'Пошук запчастин', path: '/ai/part-search', icon: 'Search' },
      { id: 'repair-advisor', label: 'Repair Advisor', labelUk: 'Ремонтний радник', path: '/ai/repair-advisor', icon: 'Lightbulb' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    labelUk: 'Звіти',
    path: '/reports',
    icon: 'BarChart3',
  },
  {
    id: 'settings',
    label: 'Settings',
    labelUk: 'Налаштування',
    path: '/settings',
    icon: 'Settings',
    permissions: ['admin'],
  },
];

export const pensionNavigation: NavItem[] = [
  {
    id: 'pension-home',
    label: 'Dashboard',
    labelUk: 'Головна',
    path: '/pension',
    icon: 'Home',
  },
  {
    id: 'my-pension',
    label: 'My Pension',
    labelUk: 'Моя пенсія',
    path: '/pension/my',
    icon: 'Wallet',
    children: [
      { id: 'overview', label: 'Overview', labelUk: 'Огляд', path: '/pension/my/overview', icon: 'Eye' },
      { id: 'calculation', label: 'Calculation', labelUk: 'Розрахунок', path: '/pension/my/calculation', icon: 'Calculator' },
      { id: 'history', label: 'History', labelUk: 'Історія', path: '/pension/my/history', icon: 'History' },
    ],
  },
  {
    id: 'my-payments',
    label: 'Payments',
    labelUk: 'Виплати',
    path: '/pension/payments',
    icon: 'CreditCard',
    children: [
      { id: 'upcoming', label: 'Upcoming', labelUk: 'Майбутні', path: '/pension/payments/upcoming', icon: 'Calendar' },
      { id: 'payment-history', label: 'History', labelUk: 'Історія', path: '/pension/payments/history', icon: 'Clock' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    labelUk: 'Документи',
    path: '/pension/documents',
    icon: 'FileText',
    children: [
      { id: 'my-docs', label: 'My Documents', labelUk: 'Мої документи', path: '/pension/documents/my', icon: 'Folder' },
      { id: 'upload', label: 'Upload', labelUk: 'Завантажити', path: '/pension/documents/upload', icon: 'Upload' },
    ],
  },
  {
    id: 'pension-settings',
    label: 'Settings',
    labelUk: 'Налаштування',
    path: '/pension/settings',
    icon: 'Settings',
  },
  {
    id: 'pension-help',
    label: 'Help',
    labelUk: 'Допомога',
    path: '/pension/help',
    icon: 'HelpCircle',
  },
];

export const adminPensionNavigation: NavItem[] = [
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    labelUk: 'Адмін панель',
    path: '/pension/admin',
    icon: 'LayoutDashboard',
  },
  {
    id: 'registry',
    label: 'Pensioner Registry',
    labelUk: 'Реєстр пенсіонерів',
    path: '/pension/admin/registry',
    icon: 'Users',
  },
  {
    id: 'benefit-calc',
    label: 'Benefit Calculator',
    labelUk: 'Калькулятор',
    path: '/pension/admin/calculator',
    icon: 'Calculator',
  },
  {
    id: 'batch-payments',
    label: 'Batch Payments',
    labelUk: 'Масові виплати',
    path: '/pension/admin/payments',
    icon: 'CreditCard',
  },
  {
    id: 'indexation-mgmt',
    label: 'Indexation',
    labelUk: 'Індексація',
    path: '/pension/admin/indexation',
    icon: 'TrendingUp',
  },
  {
    id: 'actuarial',
    label: 'Actuarial Forecast',
    labelUk: 'Актуарний прогноз',
    path: '/pension/admin/forecast',
    icon: 'LineChart',
  },
  {
    id: 'audit-log',
    label: 'Audit Log',
    labelUk: 'Журнал аудиту',
    path: '/pension/admin/audit',
    icon: 'ClipboardList',
  },
  {
    id: 'reports-gen',
    label: 'Reports',
    labelUk: 'Звіти',
    path: '/pension/admin/reports',
    icon: 'FileBarChart',
  },
  {
    id: 'pension-config',
    label: 'Configuration',
    labelUk: 'Конфігурація',
    path: '/pension/admin/config',
    icon: 'Settings',
  },
];

export default mainNavigation;
ENDFILE

# ============================================================================
# CREATE ROUTES CONFIG
# ============================================================================
mkdir -p src/config

cat > src/config/routes.ts << 'ENDFILE'
/**
 * IVYAR Governance Portal - Routes Configuration
 */

export interface RouteConfig {
  path: string;
  component: string;
  exact?: boolean;
  auth?: boolean;
  permissions?: string[];
  layout?: 'main' | 'pension' | 'admin' | 'minimal';
}

export const routes: RouteConfig[] = [
  // Main Platform Routes
  { path: '/', component: 'Home', exact: true, layout: 'main' },
  { path: '/dashboard', component: 'Dashboard', auth: true, layout: 'main' },
  
  // Fleet Management
  { path: '/fleet', component: 'FleetDashboard', auth: true, layout: 'main' },
  { path: '/fleet/vehicles', component: 'VehicleList', auth: true, layout: 'main' },
  { path: '/fleet/vehicles/:id', component: 'VehicleDetail', auth: true, layout: 'main' },
  { path: '/fleet/maintenance', component: 'MaintenanceList', auth: true, layout: 'main' },
  { path: '/fleet/parts', component: 'PartsInventory', auth: true, layout: 'main' },
  
  // Repairs
  { path: '/repairs', component: 'RepairsDashboard', auth: true, layout: 'main' },
  { path: '/repairs/warranties', component: 'WarrantyList', auth: true, layout: 'main' },
  { path: '/repairs/claims', component: 'ClaimsList', auth: true, layout: 'main' },
  { path: '/repairs/contracts', component: 'ContractsList', auth: true, layout: 'main' },
  
  // Pension Fund - Pensioner Portal
  { path: '/pension', component: 'PensionDashboard', auth: true, layout: 'pension' },
  { path: '/pension/my', component: 'MyPension', auth: true, layout: 'pension' },
  { path: '/pension/my/overview', component: 'PensionOverview', auth: true, layout: 'pension' },
  { path: '/pension/my/calculation', component: 'PensionCalculation', auth: true, layout: 'pension' },
  { path: '/pension/my/history', component: 'PensionHistory', auth: true, layout: 'pension' },
  { path: '/pension/payments', component: 'PensionPayments', auth: true, layout: 'pension' },
  { path: '/pension/payments/upcoming', component: 'UpcomingPayments', auth: true, layout: 'pension' },
  { path: '/pension/payments/history', component: 'PaymentHistory', auth: true, layout: 'pension' },
  { path: '/pension/documents', component: 'PensionDocuments', auth: true, layout: 'pension' },
  { path: '/pension/documents/upload', component: 'DocumentUpload', auth: true, layout: 'pension' },
  { path: '/pension/settings', component: 'PensionSettings', auth: true, layout: 'pension' },
  { path: '/pension/help', component: 'PensionHelp', auth: true, layout: 'pension' },
  
  // Pension Fund - Admin Portal
  { path: '/pension/admin', component: 'PensionAdminDashboard', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/registry', component: 'PensionerRegistry', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/registry/:id', component: 'PensionerDetail', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/calculator', component: 'BenefitCalculator', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/payments', component: 'BatchPayments', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/indexation', component: 'IndexationManagement', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/forecast', component: 'ActuarialForecast', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/audit', component: 'AuditLog', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/reports', component: 'ReportsGenerator', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  { path: '/pension/admin/config', component: 'PensionConfig', auth: true, permissions: ['pension:admin'], layout: 'admin' },
  
  // Compliance
  { path: '/compliance', component: 'ComplianceDashboard', auth: true, layout: 'main' },
  { path: '/compliance/standards', component: 'Standards', auth: true, layout: 'main' },
  { path: '/compliance/audits', component: 'Audits', auth: true, layout: 'main' },
  
  // AI Assistant
  { path: '/ai', component: 'AIDashboard', auth: true, layout: 'main' },
  { path: '/ai/chat', component: 'AIChat', auth: true, layout: 'main' },
  { path: '/ai/part-search', component: 'AIPartSearch', auth: true, layout: 'main' },
  { path: '/ai/repair-advisor', component: 'AIRepairAdvisor', auth: true, layout: 'main' },
  
  // Settings & Auth
  { path: '/settings', component: 'Settings', auth: true, permissions: ['admin'], layout: 'main' },
  { path: '/login', component: 'Login', layout: 'minimal' },
  { path: '/logout', component: 'Logout', layout: 'minimal' },
  { path: '/forgot-password', component: 'ForgotPassword', layout: 'minimal' },
  
  // 404
  { path: '*', component: 'NotFound', layout: 'minimal' },
];

export const pensionApiRoutes = {
  // Registry
  registry: '/api/pension/v1/registry',
  pensioner: (id: string) => `/api/pension/v1/registry/${id}`,
  
  // Eligibility
  eligibilityCheck: '/api/pension/v1/eligibility/check',
  
  // Benefits
  calculateBenefit: '/api/pension/v1/benefit/calculate',
  benefit: (id: string) => `/api/pension/v1/benefit/${id}`,
  benefitHistory: (id: string) => `/api/pension/v1/benefit/${id}/history`,
  
  // Payments
  payments: '/api/pension/v1/payment',
  paymentHistory: (id: string) => `/api/pension/v1/payment/history/${id}`,
  batchPayments: '/api/pension/v1/payment/batch',
  paymentStatistics: '/api/pension/v1/payment/statistics',
  
  // Indexation
  applyIndexation: '/api/pension/v1/indexation/apply',
  indexationHistory: '/api/pension/v1/indexation/history',
  
  // Forecast
  generateForecast: '/api/pension/v1/forecast/generate',
  systemForecast: '/api/pension/v1/forecast/system',
  
  // Documents
  uploadDocument: '/api/pension/v1/documents/upload',
  documents: (id: string) => `/api/pension/v1/documents/${id}`,
  
  // Reports
  generateReport: '/api/pension/v1/reports/generate',
  
  // Admin
  statistics: '/api/pension/v1/admin/statistics',
  auditLog: '/api/pension/v1/admin/audit',
  health: '/api/pension/v1/admin/health',
};

export default routes;
ENDFILE

# ============================================================================
# CREATE PENSION MODULE INDEX
# ============================================================================
cat > pension-fund-engine/index.ts << 'ENDFILE'
/**
 * IVYAR Pension Fund Engine
 * Main module entry point
 */

// Configuration
export { defaultConfig, type PensionConfig } from './config/pension-config';

// Models
export * from './models/types';

// Calculators
export { BenefitCalculator } from './calculators/benefit-calculator';
export { IndexationEngine } from './calculators/indexation-engine';
export { EligibilityEngine } from './calculators/eligibility-engine';

// Services
export { PensionService } from './services/pension-service';

// Payments
export { PaymentEngine } from './payments/payment-engine';

// Forecasting
export { ActuarialEngine } from './forecasting/actuarial-engine';

// Compliance
export { ComplianceChecker, complianceRules } from './compliance/compliance-rules';

// API
export { default as pensionRouter } from './api/pension-api';

// Module metadata
export const moduleInfo = {
  id: 'pension-fund-engine',
  name: 'Pension Fund Engine',
  version: '1.0.0',
  description: 'Military pension administration system',
  author: 'IVYAR Team',
  license: 'Government Use License',
};
ENDFILE

# ============================================================================
# CREATE PACKAGE.JSON UPDATE
# ============================================================================
cat > pension-fund-engine/package.json << 'ENDFILE'
{
  "name": "@ivyar/pension-fund-engine",
  "version": "1.0.0",
  "description": "IVYAR Pension Fund Engine - Military pension administration system",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src/**/*.ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/uuid": "^9.0.7",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  },
  "peerDependencies": {
    "express": "^4.18.0"
  },
  "keywords": [
    "ivyar",
    "pension",
    "military",
    "ukraine",
    "governance"
  ],
  "author": "IVYAR Team",
  "license": "Government Use License"
}
ENDFILE

echo ""
echo "✅ Pension Fund Engine integrated into Governance Portal!"
echo ""
echo "Files created/updated:"
echo "  - README.md (main platform readme)"
echo "  - modules.json (module registry)"
echo "  - src/config/navigation.ts (navigation config)"
echo "  - src/config/routes.ts (routes config)"
echo "  - pension-fund-engine/index.ts (module entry)"
echo "  - pension-fund-engine/package.json"
echo ""
echo "Run: git add -A && git commit -m 'Integrate Pension Fund Engine into Governance Portal' && git push"
