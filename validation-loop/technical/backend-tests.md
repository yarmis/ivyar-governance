# Backend Test Suite

## Search Tests

| ID | Test | Expected |
|----|------|----------|
| BE-001 | Search by part number | Returns exact match |
| BE-002 | Search by brand | Returns brand items |
| BE-003 | Search empty query | Returns error 400 |
| BE-004 | Search special chars | Sanitized, no error |
| BE-005 | Search pagination | Correct page results |

## Auth Tests

| ID | Test | Expected |
|----|------|----------|
| BE-010 | Valid login | Token returned |
| BE-011 | Invalid password | Error 401 |
| BE-012 | Token refresh | New token returned |
| BE-013 | Logout | Session cleared |

## Role Tests

| ID | Test | Expected |
|----|------|----------|
| BE-020 | Admin access all | Status 200 |
| BE-021 | Operator limited | Status 200/403 |
| BE-022 | Viewer read-only | Status 200/403 |
