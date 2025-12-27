# AnalogFinder Inference API

## Base URL
https://api.ivyar.org/v1/ml/analog-finder

## Endpoints

### POST /query
Find analog parts for single item.

Request:
- part_number (required)
- brand (optional)
- min_confidence (default: 0.8)

### POST /batch
Batch search (max 100 items).

### POST /feedback
Submit match quality feedback.

## Rate Limits
| Tier | Limit |
|------|-------|
| Standard | 100/min |
| Premium | 1000/min |
