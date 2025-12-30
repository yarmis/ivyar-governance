# Security Review Checklist

## Project Information

| Field | Value |
|-------|-------|
| Project Name | |
| Review Date | |
| Reviewer | |
| Review Type | Design / Code / Pre-release |

## 1. Authentication

- [ ] Strong password requirements
- [ ] MFA implemented
- [ ] Session management secure
- [ ] Account lockout configured
- [ ] Password reset secure

## 2. Authorization

- [ ] RBAC implemented
- [ ] Least privilege enforced
- [ ] Resource-level authorization
- [ ] No hardcoded credentials
- [ ] API authorization checked

## 3. Input Validation

- [ ] All inputs validated
- [ ] Parameterized queries used
- [ ] Output encoding implemented
- [ ] File upload restrictions
- [ ] No command injection paths

## 4. Data Protection

- [ ] Sensitive data encrypted
- [ ] TLS configured correctly
- [ ] No sensitive data in logs
- [ ] Data classification applied
- [ ] PII handling compliant

## 5. Error Handling

- [ ] Generic error messages
- [ ] No stack traces exposed
- [ ] Centralized error handling
- [ ] Errors logged securely

## 6. Logging & Monitoring

- [ ] Security events logged
- [ ] No sensitive data logged
- [ ] Log integrity protected
- [ ] Alerts configured

## 7. Dependencies

- [ ] Dependencies scanned
- [ ] No known vulnerabilities
- [ ] Licenses reviewed
- [ ] Updates available applied

## 8. Configuration

- [ ] Secure defaults
- [ ] No debug mode in prod
- [ ] Secrets externalized
- [ ] Security headers set

## Findings Summary

| Severity | Count |
|----------|-------|
| Critical | |
| High | |
| Medium | |
| Low | |

## Findings Detail

### Finding 1
- **Severity:** [Critical/High/Medium/Low]
- **Description:** [Description]
- **Recommendation:** [Recommendation]

## Approval

- [ ] All critical/high findings resolved
- [ ] Risk accepted for remaining findings

**Reviewer:** _________________ **Date:** _______

**Approver:** _________________ **Date:** _______
