# Security Test Cases - Detailed

## Token Security

### TC-SEC-001: Invalid JWT Token
- Action: Send request with invalid token
- Expected: 401 Unauthorized
- Validate: No data exposed

### TC-SEC-002: Expired Token
- Action: Send request with expired JWT
- Expected: 401 Unauthorized
- Validate: Clear error message

### TC-SEC-003: Token Without Signature
- Action: Send unsigned JWT
- Expected: 401 Unauthorized

## SQL Injection

### TC-SEC-010: Search Injection
- Input: q=' OR 1=1 --
- Expected: No SQL error, safe response
- Validate: Input sanitized

### TC-SEC-011: Login Injection
- Input: email=' OR '1'='1
- Expected: 401, no bypass

## XSS Prevention

### TC-SEC-020: Script Tag in Search
- Input: q=<script>alert(1)</script>
- Expected: Escaped output
- Validate: No script execution

## Rate Limiting

### TC-SEC-030: Brute Force Login
- Action: 50 login attempts in 1 min
- Expected: 429 Too Many Requests
- Validate: Account not locked permanently
