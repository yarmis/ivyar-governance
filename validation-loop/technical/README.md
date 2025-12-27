# Layer 1: Technical Validation

## Components

- Unit Tests (tests/backend)
- API Tests (tests/api)
- Security Tests (tests/security)
- Performance Tests (tests/performance)

## Run All
```
npm test
pytest tests/security
k6 run tests/performance/load.test.js
```

## Pass Criteria

| Test Type | Threshold |
|-----------|-----------|
| Unit | 100% pass |
| API | 100% pass |
| Security | 100% pass |
| Performance | P95 < 500ms |

## Schedule

- Every commit: Unit + API
- Daily: Security
- Weekly: Performance
