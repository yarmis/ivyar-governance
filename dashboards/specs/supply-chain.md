# Supply Chain Dashboard

## Overview

Inventory management, procurement tracking, and logistics visibility.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SUPPLY CHAIN DASHBOARD                          🔄 15 min │ 📊 Export     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │  INVENTORY  │ │   ORDERS    │ │  IN TRANSIT │ │ STOCKOUTS   │            │
│  │   $4.2M     │ │     47      │ │     23      │ │     12      │            │
│  │   value     │ │   active    │ │  shipments  │ │   items     │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  INVENTORY BY CATEGORY                        STOCK STATUS                   │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │                                │          │                             ││
│  │  Brakes     ████████████ $820K│          │  Healthy   ████████ 78%     ││
│  │  Filters    ████████░░░ $540K │          │  Low       ████░░░░ 15%     ││
│  │  Engine     ███████░░░░ $480K │          │  Critical  ██░░░░░░  5%     ││
│  │  Electrical █████░░░░░░ $350K │          │  Stockout  █░░░░░░░  2%     ││
│  │  Hydraulics ████░░░░░░░ $290K │          │                             ││
│  │  Other      ██████████ $1.72M │          │  Total SKUs: 12,450         ││
│  │                                │          │                             ││
│  └────────────────────────────────┘          └─────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ACTIVE ORDERS                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ PO #      │ Supplier    │ Items │ Value   │ Status     │ ETA      │Act  ││
│  ├──────────────────────────────────────────────────────────────────────────┤│
│  │ PO-2847   │ Bosch DE    │   45  │ $28,500 │ In Transit │ Dec 30   │[👁] ││
│  │ PO-2845   │ Toyota JP   │   120 │ $45,200 │ In Transit │ Dec 31   │[👁] ││
│  │ PO-2842   │ Caterpillar │   28  │ $67,800 │ Processing │ Jan 5    │[👁] ││
│  │ PO-2839   │ Cummins US  │   15  │ $23,400 │ Customs    │ Jan 2    │[👁] ││
│  │ PO-2836   │ Mann Filter │   200 │ $12,600 │ Shipped    │ Today    │[👁] ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CRITICAL STOCKOUTS                           SHIPMENT MAP                   │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │ Part           │ Demand │ ETA  │          │                             ││
│  ├────────────────────────────────┤          │      [MAP VIEW]             ││
│  │ Brake Pad 04465│   24   │ Today│          │                             ││
│  │ Oil Filter 1R  │   50   │ 2 day│          │   Showing shipment routes   ││
│  │ Transmission   │    2   │ 3 day│          │   and current locations     ││
│  │ Track Links    │   40   │ 5 day│          │                             ││
│  │ Alternator     │    5   │ 7 day│          │   🔵 In Transit: 23         ││
│  └────────────────────────────────┘          │   🟢 Delivered Today: 5     ││
│                                              └─────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SUPPLIER PERFORMANCE                         SPEND ANALYSIS (MTD)          │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │ Supplier     │OTD %│Quality│Avg │          │                             ││
│  ├────────────────────────────────┤          │  By Supplier:               ││
│  │ Toyota       │ 98% │  99%  │ 5d │          │  Toyota     ████████ $145K ││
│  │ Bosch        │ 95% │  98%  │ 7d │          │  Bosch      ██████░░ $98K  ││
│  │ Caterpillar  │ 92% │  97%  │12d │          │  Caterpillar████░░░░ $67K  ││
│  │ Cummins      │ 88% │  96%  │14d │          │  Others     ██████████$580K││
│  │ Mann Filter  │ 96% │  99%  │ 6d │          │                             ││
│  └────────────────────────────────┘          │  Total MTD: $890K           ││
│                                              └─────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## KPIs

| KPI | Target | Alert |
|-----|--------|-------|
| Inventory Turnover | 4x/year | <3x |
| Fill Rate | ≥95% | <90% |
| On-Time Delivery | ≥95% | <90% |
| Stockout Rate | ≤2% | >5% |
| Lead Time (avg) | ≤10 days | >14 days |

## Stock Level Thresholds

| Status | Criteria |
|--------|----------|
| Healthy | Stock > Reorder Point + Safety Stock |
| Low | Stock ≤ Reorder Point |
| Critical | Stock ≤ Safety Stock |
| Stockout | Stock = 0, Demand > 0 |
