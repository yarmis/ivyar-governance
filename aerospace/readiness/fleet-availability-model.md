# Fleet Availability Model

## Definition

Aircraft available for operations or delivery.

## Status Categories

| Status | Description |
|--------|-------------|
| Available | Ready for flight |
| In Check | Scheduled maintenance |
| AOG | Awaiting parts |
| Modification | Retrofit work |
| Storage | Parked fleet |

## Calculation

| Factor | Impact |
|--------|--------|
| Check schedule | Planned |
| AOG events | Unplanned |
| Mod programs | Variable |
| Parts supply | Critical |

## RAG Thresholds

| Availability | RAG |
|--------------|-----|
| Above 85% | GREEN |
| 70-84% | AMBER |
| Below 70% | RED |
