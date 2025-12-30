# IVYAR Mobile App

## Overview

React Native mobile application for IVYAR field operations - parts search, repair management, and fleet tracking.

## Platforms

| Platform | Min Version | Target |
|----------|-------------|--------|
| iOS | 14.0 | 17.0 |
| Android | 10 (API 29) | 14 (API 34) |

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| Part Search | Full-text and barcode search | ✅ |
| Barcode Scanner | Scan part numbers, NSN | ✅ |
| Analog Finder | Find alternative parts | ✅ |
| Repair Workflow | Create, track, complete repairs | ✅ |
| Fleet Status | View vehicle status | ✅ |
| Offline Mode | Work without connectivity | ✅ |
| Push Notifications | Real-time alerts | ✅ |
| AI Advisor | Chat with AI assistant | ✅ |
| Multi-language | EN, UK, DE, PL | ✅ |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.73+ |
| Language | TypeScript 5.3+ |
| State | Redux Toolkit + RTK Query |
| Navigation | React Navigation 6 |
| UI Components | Custom + React Native Paper |
| Forms | React Hook Form + Zod |
| Storage | MMKV + SQLite |
| Networking | Axios + React Query |

## Project Structure

```
mobile/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   ├── store/            # Redux store
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilities
│   ├── i18n/             # Translations
│   ├── theme/            # Styling
│   └── types/            # TypeScript types
├── ios/                  # iOS native code
├── android/              # Android native code
├── __tests__/            # Tests
└── e2e/                  # Detox E2E tests
```

## Getting Started

```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Run tests
npm test

# E2E tests
npm run e2e:ios
npm run e2e:android
```

## Environment Setup

```bash
# .env.development
API_URL=https://staging-api.ivyar.org/v1
SENTRY_DSN=https://xxx@sentry.io/xxx

# .env.production
API_URL=https://api.ivyar.org/v1
SENTRY_DSN=https://xxx@sentry.io/xxx
```

*Version: 1.0.0 | December 2025*
