# Validation Loop Integration

## Layer Mapping

| Layer | Auto Trigger |
|-------|--------------|
| Technical | Every push |
| Logical | Daily |
| Operational | Weekly |
| Ministry | Monthly |
| Real Data | On data change |

## Data Exchange

| From | To | Data |
|------|-----|------|
| Validation | Risk Engine | Test results |
| Risk Engine | Dashboard | Scores |
| Dashboard | Ministry | Reports |

## Sync Points

| Event | Sync Action |
|-------|-------------|
| Tests pass | Update readiness |
| Tests fail | Increase risk |
| GAP closed | Recalc scores |

## Alerts Integration

| Source | Target |
|--------|--------|
| Validation fail | Risk trigger |
| Risk RED | Dashboard alert |
| GAP critical | Ministry notify |
