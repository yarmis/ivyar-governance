# Executive Summary Dashboard

## Overview

High-level KPIs and strategic metrics for leadership decision-making.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IVYAR EXECUTIVE DASHBOARD                      December 29, 2025 │ 📊 PDF  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐ │
│  │   FLEET READINESS    │ │  CATALOG COVERAGE    │ │   REPAIR EFFICIENCY  │ │
│  │                      │ │                      │ │                      │ │
│  │       78.2%          │ │       72.4%          │ │       4.2 hrs        │ │
│  │    ▲ 2.1% vs LW      │ │    ▲ 1.8% vs LW      │ │    ▼ 0.5 hrs vs LW   │ │
│  │    Target: 85%       │ │    Target: 80%       │ │    Target: 4.0 hrs   │ │
│  │                      │ │                      │ │                      │ │
│  │    ○○○○○○○●●●        │ │    ○○○○○○○●●●        │ │    ○○○○○○○○●●        │ │
│  └──────────────────────┘ └──────────────────────┘ └──────────────────────┘ │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  KEY METRICS                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │   Metric                    │ Current │ Target  │ Trend  │ Status       ││
│  │  ─────────────────────────────────────────────────────────────────────  ││
│  │   Fleet Operational Rate    │  78.2%  │  85.0%  │  ▲ 2.1%│  🟡 On Track ││
│  │   Catalog Coverage          │  72.4%  │  80.0%  │  ▲ 1.8%│  🟡 On Track ││
│  │   Mean Time to Repair (R2)  │  4.2 hr │  4.0 hr │  ▼ 0.5 │  🟢 Achieved ││
│  │   Parts Fill Rate           │  88.5%  │  95.0%  │  ▼ 2.3%│  🟡 At Risk  ││
│  │   First-Time Fix Rate       │  91.2%  │  90.0%  │  ▲ 1.2%│  🟢 Achieved ││
│  │   Cost per Repair           │  $847   │  $900   │  ▼ $53 │  🟢 Achieved ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TREND OVERVIEW (12 weeks)                   BUDGET STATUS                   │
│  ┌────────────────────────────────┐         ┌──────────────────────────────┐│
│  │                                │         │                              ││
│  │  85%├───────────────────Target │         │  Repairs    ████████░░ $245K ││
│  │     │          ╱───────╱       │         │             Budget: $280K    ││
│  │  80%├─────╱───╱                │         │                              ││
│  │     │ ╱──╱                     │         │  Parts      █████████░ $890K ││
│  │  75%├╱                         │         │             Budget: $850K ⚠️ ││
│  │     │                          │         │                              ││
│  │  70%└──────────────────────────│         │  Total      █████████░ $1.13M││
│  │      W1    W4    W8    W12     │         │             Budget: $1.13M   ││
│  │                                │         │                              ││
│  │  ── Readiness  ── Coverage    │         └──────────────────────────────┘│
│  └────────────────────────────────┘                                         │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🚨 ATTENTION REQUIRED                      📈 ACHIEVEMENTS                  │
│  ┌────────────────────────────────┐         ┌──────────────────────────────┐│
│  │                                │         │                              ││
│  │  1. Parts spend 5% over budget │         │  ✓ MTTR reduced by 12%      ││
│  │     Action: Review procurement │         │  ✓ R1 capability +8%        ││
│  │                                │         │  ✓ 1,247 parts added MTD    ││
│  │  2. HTV readiness at 68%       │         │  ✓ First-time fix above 90% ││
│  │     Action: Expedite HTV parts │         │  ✓ Zero safety incidents    ││
│  │                                │         │                              ││
│  │  3. 3 vehicles in R4 > 2 weeks │         │                              ││
│  │     Action: Escalate priority  │         │                              ││
│  │                                │         │                              ││
│  └────────────────────────────────┘         └──────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DECISIONS PENDING                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │  1. Approve emergency HTV transmission procurement ($120K)    [Approve] ││
│  │     Impact: +5% HTV readiness │ Requestor: Ops Manager │ Due: Dec 30    ││
│  │                                                                          ││
│  │  2. Authorize new R2 workshop deployment                      [Review]  ││
│  │     Impact: +15% capacity │ Cost: $85K/month │ Due: Jan 5               ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Generated: Dec 29, 2025 10:30 UTC │ Next Update: Dec 30, 2025 08:00 UTC   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## KPI Card Specifications

| KPI | Source | Calculation | Refresh |
|-----|--------|-------------|---------|
| Fleet Readiness | Fleet Registry | Operational / Total × 100 | 5 min |
| Catalog Coverage | Analytics DB | Available / Required × 100 | Hourly |
| MTTR | Repair System | Avg completion time (R2) | 15 min |
| Parts Fill Rate | Inventory | Fulfilled / Requested × 100 | Hourly |
| First-Time Fix | Repair System | No rework / Total × 100 | Daily |
| Cost per Repair | Finance | Total cost / Repairs | Daily |

## Status Indicators

| Status | Criteria | Color |
|--------|----------|-------|
| 🟢 Achieved | Current ≥ Target | Green |
| 🟡 On Track | Current ≥ Target - 10% | Yellow |
| 🟡 At Risk | Current < Target - 10% | Orange |
| 🔴 Critical | Current < Target - 20% | Red |

## Scheduled Delivery

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Daily Brief | 08:00 UTC | Director+ | Email + PDF |
| Weekly Summary | Monday 08:00 | C-Level | Email + PDF |
| Monthly Review | 1st of month | Board | PDF + Presentation |

## Access Control

| Role | Dashboard | Decisions | Budget |
|------|:---------:|:---------:|:------:|
| Manager | View | View | View |
| Director | View | Approve | View |
| C-Level | View + Configure | Approve | Approve |
