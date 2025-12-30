# Repair Queue Dashboard

## Overview

Active repairs tracking with priority management and resource allocation.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  REPAIR QUEUE DASHBOARD                             🔄 5 min │ 📊 Export   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │   ACTIVE    │ │   WAITING   │ │  COMPLETED  │ │  AVG TIME   │            │
│  │     58      │ │     23      │ │    142      │ │   4.2 hrs   │            │
│  │   repairs   │ │  in queue   │ │   today     │ │   (R2)      │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BY REPAIR LEVEL                              BY WORKSHOP                    │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │                                │          │ Workshop    │ Active │ Cap  ││
│  │  R1 ████████ 12 (21%)         │          ├─────────────────────────────┤│
│  │  R2 █████████████████ 31 (53%)│          │ Alpha Base  │   18   │ 85%  ││
│  │  R3 ████████ 12 (21%)         │          │ Bravo Base  │   15   │ 75%  ││
│  │  R4 ██ 3 (5%)                 │          │ Charlie Fwd │    8   │ 40%  ││
│  │                                │          │ Delta Depot │   12   │ 60%  ││
│  └────────────────────────────────┘          │ Echo R4 Fac │    5   │ 25%  ││
│                                              └─────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ACTIVE REPAIRS                                            Filter: [All ▼]   │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ Priority │ Vehicle  │ Issue          │ Level│ Workshop │ Progress│ ETA  ││
│  ├──────────────────────────────────────────────────────────────────────────┤│
│  │ 🔴 HIGH  │ HTV-012  │ Transmission   │ R3   │ Delta    │ ███░░ 60%│ 2d  ││
│  │ 🔴 HIGH  │ BTR-045  │ Track damage   │ R2   │ Alpha    │ ██░░░ 40%│ 4h  ││
│  │ 🟡 MED   │ HIL-234  │ Brake pads     │ R2   │ Bravo    │ ████░ 80%│ 1h  ││
│  │ 🟡 MED   │ M113-089 │ Engine tune    │ R2   │ Alpha    │ █░░░░ 20%│ 3h  ││
│  │ 🟢 LOW   │ HIL-456  │ Oil change     │ R1   │ Charlie  │ ████░ 85%│ 30m ││
│  │ ...      │          │                │      │          │          │     ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  WAITING QUEUE                                PARTS WAITING                  │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │ # │ Vehicle │ Issue    │ Wait │          │ Part           │ Qty │ ETA  ││
│  ├────────────────────────────────┤          ├─────────────────────────────┤│
│  │ 1 │ HIL-789 │ Starter  │ 2h   │          │ Brake pads     │  24 │ Today││
│  │ 2 │ MTK-321 │ Clutch   │ 1h   │          │ Oil filters    │  50 │ Today││
│  │ 3 │ HTV-567 │ Radiator │ 45m  │          │ Transmission   │   2 │ 3 days│
│  │ 4 │ BTR-111 │ Tracks   │ 30m  │          │ Track links    │  40 │ 2 days│
│  │ 5 │ HIL-890 │ Battery  │ 15m  │          │ Alternators    │   5 │ 5 days│
│  └────────────────────────────────┘          └─────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  COMPLETION TREND (7 days)                   TECHNICIAN UTILIZATION         │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │ 180 ┤      ╱╲                  │          │ Team A  ████████████░░ 85%  ││
│  │ 150 ┤    ╱    ╲    ╱╲         │          │ Team B  █████████░░░░░ 70%  ││
│  │ 120 ┤  ╱        ╲╱    ╲       │          │ Team C  ██████████████ 95%  ││
│  │  90 ┤╱                  ╲╱    │          │ Team D  ███████░░░░░░░ 55%  ││
│  │     └────────────────────────│          │ Team E  █████████████░ 90%  ││
│  │      Mon Tue Wed Thu Fri Sat │          └─────────────────────────────┘│
│  └────────────────────────────────┘                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## KPI Definitions

| KPI | Formula | Target | Alert |
|-----|---------|--------|-------|
| Active Repairs | Count of ongoing repairs | - | - |
| Queue Length | Waiting for repair start | ≤15 | >25 |
| MTTR R1 | Avg completion time R1 | ≤30 min | >45 min |
| MTTR R2 | Avg completion time R2 | ≤4 hrs | >6 hrs |
| MTTR R3 | Avg completion time R3 | ≤3 days | >5 days |
| Technician Util | Active time / Available | 75-85% | <60% or >95% |
| First-Time Fix | Fixed without rework | ≥90% | <85% |

## Priority Matrix

| Priority | Criteria | SLA |
|----------|----------|-----|
| 🔴 Critical | Combat essential, mission impact | 4 hrs (R2) |
| 🔴 High | Safety critical, multiple units affected | 8 hrs (R2) |
| 🟡 Medium | Standard repair, scheduled maintenance | 24 hrs (R2) |
| 🟢 Low | Cosmetic, non-urgent, preventive | 72 hrs (R2) |

## Filters

| Filter | Type | Options |
|--------|------|---------|
| Repair Level | Multi-select | R1, R2, R3, R4 |
| Priority | Multi-select | Critical, High, Medium, Low |
| Workshop | Multi-select | All workshops |
| Status | Multi-select | Active, Waiting, On Hold |
| Platform | Multi-select | All platforms |

## Actions

| Action | Role Required | Effect |
|--------|---------------|--------|
| Escalate | Technician+ | Increase priority |
| Reassign | Manager+ | Change workshop/tech |
| Put on Hold | Manager+ | Pause repair |
| Request Parts | Technician+ | Create parts request |
| Complete | Technician+ | Mark as done |

## WebSocket Events

```javascript
// Subscribe to repair updates
ws.subscribe('repairs.updates', (event) => {
  switch(event.type) {
    case 'repair.started':
    case 'repair.progress':
    case 'repair.completed':
    case 'repair.escalated':
    case 'parts.arrived':
  }
});
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/repairs` | List all repairs |
| GET | `/api/v1/repairs/{id}` | Repair details |
| POST | `/api/v1/repairs` | Create repair |
| PATCH | `/api/v1/repairs/{id}` | Update repair |
| POST | `/api/v1/repairs/{id}/escalate` | Escalate priority |
| POST | `/api/v1/repairs/{id}/complete` | Mark complete |
