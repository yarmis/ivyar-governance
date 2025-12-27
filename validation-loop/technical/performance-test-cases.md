# Performance Test Cases

## Load Scenarios

### TC-PERF-001: Light Load
- Users: 100 concurrent
- Duration: 5 minutes
- Target: P95 < 200ms

### TC-PERF-002: Medium Load
- Users: 500 concurrent
- Duration: 10 minutes
- Target: P95 < 500ms

### TC-PERF-003: Heavy Load
- Users: 1000 concurrent
- Duration: 15 minutes
- Target: P95 < 1000ms

## Endpoint Benchmarks

### TC-PERF-010: Search
- Target: 500 RPS
- Latency: P95 < 200ms

### TC-PERF-011: Auth
- Target: 100 RPS
- Latency: P95 < 300ms

## Stress Tests

### TC-PERF-020: Spike Recovery
- Spike: 0 to 1000 users
- Recovery: under 60s

### TC-PERF-021: Endurance
- Duration: 2 hours
- Target: Memory stable
