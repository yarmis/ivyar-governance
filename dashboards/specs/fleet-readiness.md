# Fleet Readiness Dashboard

## Overview

Real-time operational status of all fleet vehicles with drill-down capabilities.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FLEET READINESS DASHBOARD                              🔄 Live │ 📊 Export │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ OPERATIONAL │ │  IN REPAIR  │ │   PENDING   │ │    TOTAL    │            │
│  │    78%      │ │     15%     │ │      7%     │ │    1,247    │            │
│  │   ▲ 2%      │ │   ▼ 3%      │ │   ▲ 1%      │ │   vehicles  │            │
│  │  vs target  │ │  vs target  │ │  vs target  │ │             │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  READINESS BY PLATFORM TYPE                      READINESS TREND (30 days)  │
│  ┌────────────────────────────────────┐         ┌──────────────────────────┐│
│  │                                    │         │  85% ─────────┐          ││
│  │  LTV  ████████████████░░░ 87%     │         │              │  ╲        ││
│  │  MTV  ███████████████░░░░ 82%     │         │  80% ────────┼───╲───────││
│  │  HTV  ████████████░░░░░░░ 68%     │         │              │    ╲  ╱   ││
│  │  APC  █████████████░░░░░░ 72%     │         │  75% ────────┼─────╲╱────││
│  │  IFV  ███████████████░░░░ 81%     │         │              │          ││
│  │  MBT  ██████████░░░░░░░░░ 58%     │         │  70% ────────┴──────────││
│  │                                    │         │      W1  W2  W3  W4     ││
│  └────────────────────────────────────┘         └──────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  VEHICLES BY STATUS                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ ID       │ Platform    │ Status      │ Location   │ Since    │ Action   ││
│  ├──────────────────────────────────────────────────────────────────────────┤│
│  │ HTV-012  │ MAN TGS 8×8 │ 🔴 Critical │ R3 Depot   │ 3 days   │ [View]   ││
│  │ BTR-045  │ BTR-4E      │ 🟡 In Repair│ Base Alpha │ 1 day    │ [View]   ││
│  │ HIL-234  │ Hilux AN120 │ 🟡 Pending  │ Field      │ 2 hours  │ [View]   ││
│  │ M113-089 │ M113A3      │ 🟢 Ready    │ Base Bravo │ -        │ [View]   ││
│  │ ...      │ ...         │ ...         │ ...        │ ...      │ ...      ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                   [1] [2] [3] ... [47]  │  Show: 25 ▼        │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  GEOGRAPHIC DISTRIBUTION                            ALERTS                   │
│  ┌────────────────────────────────────┐         ┌──────────────────────────┐│
│  │                                    │         │ 🔴 HTV-012: Transmission ││
│  │         [MAP VIEW]                 │         │    failure - 3 days      ││
│  │                                    │         │ 🟡 5 vehicles awaiting   ││
│  │    Markers showing vehicle         │         │    brake pads shipment   ││
│  │    locations with status colors    │         │ 🟡 MBT readiness below   ││
│  │                                    │         │    target (58% vs 70%)   ││
│  │                                    │         │ ℹ️ Scheduled maintenance ││
│  │                                    │         │    due: 12 vehicles      ││
│  └────────────────────────────────────┘         └──────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## KPI Definitions

| KPI | Formula | Target | Alert |
|-----|---------|--------|-------|
| Operational Rate | Operational / Total × 100 | ≥85% | <75% |
| Repair Rate | In Repair / Total × 100 | ≤10% | >15% |
| MTTR (R2) | Avg repair time at R2 | ≤4 hrs | >6 hrs |
| Pending Rate | Pending / Total × 100 | ≤5% | >10% |
| Critical Count | Vehicles in R3/R4 | ≤5 | >10 |

## Filters

| Filter | Type | Options |
|--------|------|---------|
| Platform Type | Multi-select | LTV, MTV, HTV, APC, IFV, MBT |
| Status | Multi-select | Operational, In Repair, Pending, Critical |
| Location | Hierarchy | Region → Base → Unit |
| Brigade | Multi-select | All brigades |
| Time Range | Date picker | Last 24h, 7d, 30d, Custom |

## Data Sources

| Source | Endpoint | Refresh |
|--------|----------|---------|
| Fleet Registry | `/api/v1/fleet/vehicles` | 5 min |
| Repair System | `/api/v1/repairs/active` | 1 min |
| Telemetry | WebSocket `/ws/telemetry` | Real-time |
| Location | `/api/v1/fleet/locations` | 5 min |

## Drill-Down Paths

```
Fleet Overview
    └── Platform Type (e.g., HTV)
        └── Status (e.g., In Repair)
            └── Individual Vehicle
                └── Repair History
                └── Part Consumption
                └── Maintenance Schedule
```

## Alerts Configuration

```json
{
  "alerts": [
    {
      "id": "low-readiness",
      "condition": "operational_rate < 75",
      "severity": "critical",
      "notification": ["ops-manager", "sms", "slack"]
    },
    {
      "id": "high-repair-time",
      "condition": "mttr_hours > 6",
      "severity": "warning",
      "notification": ["workshop-lead"]
    },
    {
      "id": "platform-below-target",
      "condition": "platform_readiness < target - 10",
      "severity": "warning",
      "notification": ["ops-manager"]
    }
  ]
}
```

## API Response Schema

```json
{
  "timestamp": "2025-12-29T10:30:00Z",
  "summary": {
    "total_vehicles": 1247,
    "operational": 973,
    "in_repair": 187,
    "pending": 87,
    "operational_rate": 78.0,
    "target_rate": 85.0,
    "trend": "+2.1%"
  },
  "by_platform": [
    {"type": "LTV", "total": 520, "operational": 452, "rate": 87.0},
    {"type": "MTV", "total": 280, "operational": 230, "rate": 82.0},
    {"type": "HTV", "total": 180, "operational": 122, "rate": 68.0}
  ],
  "alerts": [
    {"id": "htv-012", "severity": "critical", "message": "Transmission failure"}
  ],
  "vehicles": [
    {
      "id": "HTV-012",
      "platform": "MAN TGS 8×8",
      "status": "critical",
      "location": "R3 Depot",
      "since": "2025-12-26T08:00:00Z",
      "repair_eta": "2025-12-31T00:00:00Z"
    }
  ]
}
```

## Access Control

| Role | View | Filter | Export | Configure |
|------|:----:|:------:|:------:|:---------:|
| Operator | ✓ | Own unit | ✗ | ✗ |
| Manager | ✓ | Brigade | ✓ | ✗ |
| Director | ✓ | All | ✓ | ✓ |
| Admin | ✓ | All | ✓ | ✓ |
