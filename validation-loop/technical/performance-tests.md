# Performance Test Suite

## Load Tests

| ID | Test | Users | Target |
|----|------|-------|--------|
| PERF-001 | Light load | 100 | P95 < 200ms |
| PERF-002 | Medium load | 500 | P95 < 500ms |
| PERF-003 | Heavy load | 1000 | P95 < 1000ms |

## Endpoint Tests

| ID | Endpoint | RPS Target |
|----|----------|------------|
| PERF-010 | /search | 500 RPS |
| PERF-011 | /catalog | 300 RPS |
| PERF-012 | /auth/login | 100 RPS |
| PERF-013 | /orders | 200 RPS |

## Stress Tests

| ID | Test | Duration | Target |
|----|------|----------|--------|
| PERF-020 | Sustained load | 30 min | No errors |
| PERF-021 | Spike test | 5 min | Recovery < 30s |
| PERF-022 | Endurance | 2 hours | Stable memory |
