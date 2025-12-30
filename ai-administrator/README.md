# IVYAR AI Administrator

## Overview

Централізована AI-система для інтелектуального управління каталогом запчастин, ремонтними операціями та прийняттям рішень у IVYAR.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              IVYAR AI ADMINISTRATOR                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   USER INTERFACES                                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Portal UI  │  Mobile App  │  API Clients  │  Chat Interface       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        AI ADVISOR LAYER                              │   │
│   │  Query Processor → Intent Classifier → Context Builder → Response   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      GOLDEN RULES ENGINE                             │   │
│   │  Safety Rules │ Compliance Rules │ Business Rules │ Domain Rules    │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         RAG SYSTEM                                   │   │
│   │  Embeddings │ Vector Store │ Knowledge Graph │ Hybrid Search        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        DATA SOURCES                                  │   │
│   │  Parts Catalog │ Repair History │ Compliance DB │ Fleet Telemetry   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Module Structure

```
ai-administrator/
├── README.md                           # This file
├── architecture/
│   └── rag-architecture.md            # RAG implementation
├── knowledge-base/
│   └── schema/
│       └── knowledge-structure.json   # JSON knowledge schema
├── golden-rules/
│   └── policy-rules.json              # Policy rules (24 rules)
├── prompts/
│   ├── system-prompts/
│   │   ├── base-system-prompt.md      # Base system prompt
│   │   └── role-prompts/
│   │       └── all-role-prompts.md    # 6 role-specific prompts
│   └── task-prompts/
│       └── all-task-prompts.md        # 6 task-specific prompts
└── ui-components/
    └── ai-advisor/
        ├── AIAdvisor.tsx              # React component
        └── styles.css                 # Styling
```

## Capabilities

| Capability | Description | Status |
|------------|-------------|--------|
| Part Search | Natural language part lookup | ✅ Active |
| Analog Finder | AI-powered alternative search | ✅ Active |
| Repair Advisor | Repair level recommendations | ✅ Active |
| Compliance Check | Export control validation | ✅ Active |
| Cross-Reference | NSN↔OEM↔Aftermarket mapping | ✅ Active |
| Report Generation | Automated reporting | ✅ Active |

## Role-Based Prompts

| Role | Focus | Audience |
|------|-------|----------|
| Operator | Quick answers | Field personnel |
| Technician | Technical details | Workshop staff |
| Logistics | Supply chain | Procurement |
| Analyst | Data & reports | Analytics team |
| Manager | Status & decisions | Operations |
| Executive | Strategic view | Leadership |

## Golden Rules Engine

| Category | Rules | Priority |
|----------|:-----:|----------|
| Safety | 5 | 96-100 |
| Compliance | 5 | 84-89 |
| Business | 5 | 60-75 |
| Domain | 4 | 40-45 |
| Quality | 3 | 20-25 |

## Quick Start

```bash
# API Access
curl -X POST https://api.ivyar.org/v1/ai/ask \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"query": "Find brake pads for Hilux 2019", "role": "technician"}'
```

```tsx
// React Component
import { AIAdvisor } from '@ivyar/ai-advisor';

<AIAdvisor userRole="technician" context={{ platform: 'hilux' }} />
```

## Contact

- AI Platform: ai-platform@ivyar.io
- Support: support@ivyar.io

*Version: 1.0.0 | December 2025*
