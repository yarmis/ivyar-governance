# Security Test Suite

## Auth Security

| ID | Test | Expected |
|----|------|----------|
| SEC-001 | Invalid token | 401 rejected |
| SEC-002 | Missing token | 401 rejected |
| SEC-003 | Expired token | 401 rejected |
| SEC-004 | Role escalation | 403 blocked |

## Injection Tests

| ID | Test | Expected |
|----|------|----------|
| SEC-010 | SQL injection search | Blocked |
| SEC-011 | SQL injection login | Blocked |
| SEC-012 | XSS in search | Sanitized |
| SEC-013 | XSS in forms | Sanitized |

## API Hardening

| ID | Test | Expected |
|----|------|----------|
| SEC-020 | Rate limiting | 429 after limit |
| SEC-021 | CORS invalid origin | Blocked |
| SEC-022 | Invalid JSON | 400 error |
| SEC-023 | Stack trace hidden | No exposure |
