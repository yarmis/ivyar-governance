# Scenario: Quality Escape

## Trigger

Quality issue found requiring fleet inspection.

## Initial State

- Fleet Availability: 82%
- Production normal
- No AOG events

## Impact

| Metric | Before | After |
|--------|--------|-------|
| Fleet Available | 82% | 45% |
| AOG Count | 2 | 15 |
| Inspection queue | 0 | 50 |

## Mitigation

- Surge inspection teams
- Prioritize by flight hours
- Expedite replacement parts

## Recovery

- 1 week initial assessment
- 3 weeks fleet-wide complete
