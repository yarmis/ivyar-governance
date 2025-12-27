# Security Tests

## Test Areas

- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF
- Auth bypass
- Role escalation
- Rate limiting
- Brute force
- CORS validation

## Negative Cases

- Invalid tokens
- Missing tokens
- Wrong role tokens
- Tampered signatures

## Tools

- OWASP ZAP
- Burp Suite
- Custom scripts

## Run Tests
```
npm test tests/security
```
