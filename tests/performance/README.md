# Performance Tests

## Load Scenarios

| Test | Users | Requests |
|------|-------|----------|
| Light | 100 | 1000 |
| Medium | 500 | 5000 |
| Heavy | 1000 | 10000 |

## Endpoints Tested

- Search API
- Auth API
- Catalog API
- Orders API

## Tools

- k6
- Artillery

## Run Tests
```
k6 run tests/performance/load.js
```
