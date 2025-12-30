# IVYAR Test Suite

## Overview

Comprehensive testing suite for IVYAR platform with unit, integration, and E2E tests.

## Test Types

| Type | Purpose | Location | Runner |
|------|---------|----------|--------|
| Unit | Individual functions | `tests/unit/` | Vitest |
| Integration | Service interactions | `tests/integration/` | Vitest |
| E2E | Full user flows | `tests/e2e/` | Playwright |
| Load | Performance testing | `tests/load/` | k6 |

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test type
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

## Test Coverage Targets

| Category | Target | Current |
|----------|--------|---------|
| Statements | 80% | - |
| Branches | 75% | - |
| Functions | 80% | - |
| Lines | 80% | - |

## Structure

```
tests/
├── e2e/                    # End-to-end tests (Playwright)
│   ├── catalog.e2e.test.ts
│   ├── repair.e2e.test.ts
│   ├── fleet.e2e.test.ts
│   ├── ai-advisor.e2e.test.ts
│   └── auth.e2e.test.ts
├── integration/            # Integration tests
│   ├── catalog.integration.test.ts
│   ├── repair.integration.test.ts
│   └── ai-advisor.integration.test.ts
├── unit/                   # Unit tests
│   └── (colocated with source)
├── fixtures/               # Test data
│   ├── parts.json
│   ├── vehicles.json
│   └── repairs.json
├── utils/                  # Test utilities
│   ├── setup.ts
│   ├── api-client.ts
│   └── factories.ts
└── reports/                # Test reports
```

## Environment Variables

```bash
# .env.test
API_URL=http://localhost:8080
TEST_API_KEY=test-api-key
TEST_API_SECRET=test-api-secret
DATABASE_URL=postgresql://localhost:5432/ivyar_test
REDIS_URL=redis://localhost:6379
```

## CI Integration

Tests run automatically on:
- Pull requests to `main`
- Push to `main` and `develop`
- Nightly scheduled runs

*Version: 1.0.0 | December 2025*
