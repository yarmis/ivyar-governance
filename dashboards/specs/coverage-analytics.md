# Coverage Analytics Dashboard

## Overview

Catalog coverage analysis with gap identification and improvement tracking.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  COVERAGE ANALYTICS DASHBOARD                        🔄 Hourly │ 📊 Export │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │  OVERALL    │ │    R1       │ │     R2      │ │   R3/R4     │            │
│  │   72.4%     │ │   45.2%     │ │   78.5%     │ │   89.1%     │            │
│  │  coverage   │ │   ▲ 5%      │ │   ▲ 3%      │ │   ▲ 1%      │            │
│  │  +2.1% MTD  │ │  vs target  │ │  vs target  │ │  vs target  │            │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  COVERAGE BY DOMAIN                               COVERAGE BY PLATFORM       │
│  ┌────────────────────────────────┐              ┌──────────────────────────┐│
│  │                                │              │                          ││
│  │  Automotive  ████████████ 85% │              │  Hilux     ██████████ 92%││
│  │  Heavy Equip ████████░░░ 72%  │              │  L200      █████████░ 88%││
│  │  Engine      ███████░░░░ 65%  │              │  HMMWV     ████████░░ 78%││
│  │  Electrical  █████████░░ 78%  │              │  M113      ███████░░░ 68%││
│  │  Hydraulics  ██████░░░░░ 58%  │              │  BTR-4     ██████░░░░ 55%││
│  │  Armor       █████░░░░░░ 45%  │              │  T-64      █████░░░░░ 48%││
│  │                                │              │                          ││
│  └────────────────────────────────┘              └──────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GAP ANALYSIS - TOP PRIORITIES                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ Rank │ Platform   │ Category    │ Gap    │ Impact  │ Parts Needed│Action││
│  ├──────────────────────────────────────────────────────────────────────────┤│
│  │  1   │ BTR-4E     │ Suspension  │ 42%    │ Critical│     28      │[Add] ││
│  │  2   │ T-64BV     │ Engine      │ 38%    │ Critical│     45      │[Add] ││
│  │  3   │ M113A3     │ Tracks      │ 35%    │ High    │     18      │[Add] ││
│  │  4   │ MAN TGS    │ Transmission│ 32%    │ High    │     12      │[Add] ││
│  │  5   │ HMMWV      │ Electrical  │ 28%    │ Medium  │     35      │[Add] ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  COVERAGE TREND (6 months)                    PARTS ADDED THIS MONTH        │
│  ┌────────────────────────────────┐          ┌─────────────────────────────┐│
│  │ 80% ┤              ╱──────    │          │                             ││
│  │ 75% ┤         ╱───╱           │          │  Total Added:      1,247    ││
│  │ 70% ┤    ╱───╱                │          │  With Analogs:       892    ││
│  │ 65% ┤───╱                     │          │  Cross-Referenced:   756    ││
│  │ 60% ┤                         │          │  Verified:           623    ││
│  │     └─────────────────────────│          │                             ││
│  │      Jul Aug Sep Oct Nov Dec  │          │  Gap Reduction:    -2.8%    ││
│  └────────────────────────────────┘          └─────────────────────────────┘│
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  COVERAGE HEATMAP BY PLATFORM × CATEGORY                                     │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │           │Brakes│Engine│Trans│Electr│Susp│Body│Filters│Fluids│Tracks  ││
│  │  Hilux    │ 95%  │ 92%  │ 88% │  90% │ 85%│ 78%│  98%  │ 100% │   -    ││
│  │  HMMWV    │ 85%  │ 78%  │ 72% │  65% │ 70%│ 60%│  95%  │  98% │   -    ││
│  │  M113     │ 75%  │ 68%  │ 62% │  58% │ 55%│ 45%│  90%  │  95% │  52%   ││
│  │  BTR-4    │ 62%  │ 55%  │ 48% │  52% │ 42%│ 38%│  85%  │  90% │  48%   ││
│  │  T-64     │ 55%  │ 48%  │ 42% │  45% │ 38%│ 32%│  82%  │  88% │  45%   ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│   Legend: ██ 90%+  ██ 70-89%  ██ 50-69%  ░░ <50%                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## KPI Definitions

| KPI | Formula | Target | Alert |
|-----|---------|--------|-------|
| Overall Coverage | Parts with ≥1 source / Total required | ≥80% | <70% |
| R1 Coverage | R1 repairable / Total | ≥60% | <50% |
| R2 Coverage | R2 repairable / Total | ≥85% | <75% |
| Analog Rate | Parts with analog / Total | ≥70% | <60% |
| Verification Rate | Verified parts / Total | ≥80% | <70% |
| Gap Trend | MoM coverage change | +2% | <0% |

## Coverage Calculation

```python
def calculate_coverage(platform, category, repair_level):
    """
    Coverage = Parts Available / Parts Required × 100
    
    Parts Available: Has at least one valid source (OEM or verified analog)
    Parts Required: All parts in platform BOM for category
    """
    required = get_required_parts(platform, category)
    available = get_available_parts(platform, category, repair_level)
    
    coverage = len(available) / len(required) * 100 if required else 0
    
    return {
        "coverage_pct": round(coverage, 1),
        "available": len(available),
        "required": len(required),
        "gap": len(required) - len(available),
        "gap_parts": list(set(required) - set(available))
    }
```

## Filters

| Filter | Type | Options |
|--------|------|---------|
| Domain | Multi-select | All domains |
| Platform | Multi-select | All platforms |
| Category | Multi-select | All categories |
| Repair Level | Multi-select | R1, R2, R3, R4 |
| Time Period | Date range | Custom, MTD, QTD, YTD |

## Actions

| Action | Description |
|--------|-------------|
| [Add] | Open part addition workflow |
| [Export Gap] | Download gap list as CSV |
| [Generate Report] | Create PDF coverage report |
| [Set Alert] | Configure coverage threshold alert |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/coverage` | Overall coverage |
| GET | `/api/v1/analytics/coverage/by-platform` | By platform breakdown |
| GET | `/api/v1/analytics/coverage/by-category` | By category breakdown |
| GET | `/api/v1/analytics/gaps` | Gap analysis |
| GET | `/api/v1/analytics/trends` | Historical trends |
