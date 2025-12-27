# Scenario: HTV Supply Crisis

## Trigger
Major OEM delays HTV parts by 30 days

## Initial State
- HTV Readiness: 52
- HTV Risk: 62
- Transmission GAP: 35%

## Simulation Steps

1. Day 0: Delay announced
2. Day 7: Stock depletes 20%
3. Day 14: Readiness drops to 40
4. Day 21: Risk rises to 78
5. Day 30: Critical threshold

## Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| Readiness | 52 | 35 |
| Risk | 62 | 82 |
| Health | 27 | 12 |

## Mitigations

- Activate backup su
cat > simulation-suite/scenarios/scenario-gap-closure.md << 'ENDFILE'
# Scenario: Accelerated GAP Closure

## Trigger
New OEM partnership signed

## Initial State
- Transmission GAP: 35%
- Suspension GAP: 48%
- Target Q1: 45%

## Simulation Steps

1. Week 1: Contract active
2. Week 2: First shipment
3. Week 3: Stock +15%
4. Week 4: GAP reduced

## Expected Impact

| GAP | Before | After |
|-----|--------|-------|
| Transmission | 35% | 55% |
| Suspension | 48% | 62% |

## Result

- GAP targets exceeded
- Readiness improved
- Risk reduced
