# Scoring Formulas

## Risk Score Formula
```
RISK = (SC x 0.25) + (OEM x 0.20) + (LOG x 0.20) + (TECH x 0.15) + (FIN x 0.10) + (COMP x 0.10)
```

## Readiness Index Formula
```
READINESS = (OPS x 0.30) + (PARTS x 0.25) + (REPAIR x 0.20) + (PERS x 0.15) + (LOG x 0.10)
```

## GAP Priority Formula
```
PRIORITY = (IMPACT x 0.40) + (URGENCY x 0.35) + (EFFORT x 0.25)
```

## Combined Health Score
```
HEALTH = (READINESS x 0.60) - (RISK x 0.40)
```

## Thresholds

| Metric | Green | Amber | Red |
|--------|-------|-------|-----|
| Risk | 0-40 | 41-70 | 71+ |
| Readiness | 70+ | 50-69 | 0-49 |
| Health | 50+ | 25-49 | 0-24 |
