# Scenario: Supplier Delay

## Trigger

Critical avionics supplier delays shipment by 30 days.

## Initial State

- Line Readiness: 85%
- Fleet Availability: 82%
- Deliveries on track

## Impact

| Metric | Before | After |
|--------|--------|-------|
| Line Readiness | 85% | 60% |
| Deliveries | On track | -3 units |
| Risk Score | 35 | 72 |

## Mitigation

- Activate alternate supplier
- Expedite existing orders
- Adjust production sequence

## Recovery

- 2 weeks with alt supplier
- 4 weeks normal flow
