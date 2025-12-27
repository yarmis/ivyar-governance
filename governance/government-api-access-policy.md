# Government API Access Policy

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Classification:** Official

---

## 1. Purpose

This policy defines the rules for government agency access to the IVYAR API.

---

## 2. Authentication

| Method | Description |
|--------|-------------|
| OAuth2 Client Credentials | Primary authentication method |
| API Keys | Rotated every 30 days |
| MFA | Required for admin access |

---

## 3. Authorization (RBAC)

### Available Roles

| Role | Description |
|------|-------------|
| `catalog.read` | View catalog items |
| `catalog.write` | Create/modify catalog items |
| `rfq.manage` | Create and manage RFQs |
| `orders.manage` | Create and manage orders |
| `compliance.admin` | Manage compliance settings |
| `audit.read` | View audit logs |

### Role Assignment

- Roles are assigned by Ministry Administrator
- Minimum privilege principle applies
- Quarterly access reviews required

---

## 4. Rate Limits

| Operation Type | Limit |
|----------------|-------|
| Read Operations | 1,000 requests/minute |
| Write Operations | 200 requests/minute |
| Audit Endpoints | 100 requests/minute |

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## 5. Data Access Rules

### ✅ Access Permitted

| Resource | Operations |
|----------|------------|
| Catalog | Read, Search, Filter |
| RFQ | Create, Read, Update |
| Orders | Create, Read, Update |
| Compliance Results | Read |
| Audit Logs | Read (limited) |

### ❌ Access Prohibited

| Resource | Reason |
|----------|--------|
| Internal ML Models | Proprietary |
| Internal Risk Weights | Security |
| System Logs | Infrastructure |
| Other Tenants' Data | Privacy |

---

## 6. Logging

All API requests are logged with:

| Field | Description |
|-------|-------------|
| Timestamp | UTC time of request |
| User ID | Authenticated user |
| Endpoint | API endpoint accessed |
| Method | HTTP method |
| Status | Response code |
| Duration | Request duration |

**Retention:** 7 years  
**Access:** Available to oversight board

---

## 7. Security Requirements

| Requirement | Standard |
|-------------|----------|
| Transport | TLS 1.3 minimum |
| Encryption | AES-256 |
| IP Allowlist | Optional, recommended |
| Zero Trust | Enforced |

### IP Allowlist Configuration

```json
{
  "allowed_ips": [
    "203.0.113.0/24",
    "198.51.100.0/24"
  ]
}
```

---

## 8. Incident Response

| Event | Response |
|-------|----------|
| Suspicious Activity | Automated alerts |
| Credential Compromise | Immediate key revocation |
| Security Breach | Forensic investigation |
| Incident Report | Delivered within 72 hours |

---

## 9. API Endpoints

### Base URL

```
https://api.ivyar.org/v1
```

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/catalog` | GET | List catalog items |
| `/catalog/{id}` | GET | Get item details |
| `/rfq` | POST | Create RFQ |
| `/rfq/{id}` | GET | Get RFQ details |
| `/orders` | POST | Create order |
| `/orders/{id}` | GET | Get order details |
| `/compliance/check` | POST | Run compliance check |
| `/audit/logs` | GET | Get audit logs |

---

## 10. Support

For API support:

- **Email:** api-support@ivyar.org
- **Documentation:** https://docs.ivyar.org/api

---

*This document is maintained under the IVYAR Governance Framework.*
