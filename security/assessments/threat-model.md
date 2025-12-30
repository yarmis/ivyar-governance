# IVYAR Threat Model

## Document Control

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Last Updated | December 2025 |
| Classification | CONFIDENTIAL |
| Owner | Security Team |
| Review Cycle | Annual |

## 1. System Overview

### 1.1 Description

IVYAR is a military parts catalog and repair management platform providing:
- Parts search and cross-reference
- Analog finding with AI
- Repair workflow management
- Fleet readiness tracking
- AI-powered advisor

### 1.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              THREAT MODEL SCOPE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐                                                            │
│  │   Users     │                                                            │
│  │ (Operators, │                                                            │
│  │ Technicians)│                                                            │
│  └──────┬──────┘                                                            │
│         │ HTTPS                                                             │
│         ▼                                                                   │
│  ┌─────────────┐     ┌─────────────┐                                       │
│  │ CloudFlare  │────▶│   WAF       │                                       │
│  │    CDN      │     │  Rules      │                                       │
│  └──────┬──────┘     └─────────────┘                                       │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        KUBERNETES CLUSTER                            │   │
│  │  ┌─────────────┐                                                    │   │
│  │  │   Ingress   │ (TLS Termination, Rate Limiting)                   │   │
│  │  └──────┬──────┘                                                    │   │
│  │         │                                                            │   │
│  │         ▼                                                            │   │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐           │   │
│  │  │ API Gateway │────▶│  Services   │────▶│  Databases  │           │   │
│  │  │ (Auth, Rate)│     │ (Catalog,   │     │ (PostgreSQL,│           │   │
│  │  └─────────────┘     │  Repair,    │     │  Redis,     │           │   │
│  │                      │  Fleet, AI) │     │  Qdrant)    │           │   │
│  │                      └─────────────┘     └─────────────┘           │   │
│  │                                                                     │   │
│  │  ┌─────────────┐                                                   │   │
│  │  │  External   │ (AI Models, TecDoc, FLIS)                         │   │
│  │  │   APIs      │                                                    │   │
│  │  └─────────────┘                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Data Classification

| Classification | Description | Examples |
|----------------|-------------|----------|
| **RESTRICTED** | Highly sensitive military data | Vehicle locations, unit assignments |
| **CONFIDENTIAL** | Sensitive operational data | Repair details, fleet status |
| **INTERNAL** | Business sensitive | User data, analytics |
| **PUBLIC** | Non-sensitive | Public part specs |

### 1.4 Trust Boundaries

| Boundary | From | To | Controls |
|----------|------|----|---------| 
| TB-1 | Internet | CloudFlare | WAF, DDoS protection |
| TB-2 | CloudFlare | Ingress | TLS, IP allowlist |
| TB-3 | Ingress | API Gateway | mTLS, JWT validation |
| TB-4 | Services | Database | Network policy, encryption |
| TB-5 | Services | External APIs | API keys, TLS |

## 2. Assets

### 2.1 Critical Assets

| ID | Asset | Classification | Impact |
|----|-------|----------------|--------|
| A-1 | Vehicle location data | RESTRICTED | Critical |
| A-2 | Fleet readiness data | RESTRICTED | Critical |
| A-3 | Repair procedures | CONFIDENTIAL | High |
| A-4 | Parts catalog | CONFIDENTIAL | High |
| A-5 | User credentials | CONFIDENTIAL | High |
| A-6 | API keys | CONFIDENTIAL | High |
| A-7 | Audit logs | INTERNAL | Medium |
| A-8 | Analytics data | INTERNAL | Medium |

### 2.2 Data Flows

| Flow | Source | Destination | Data | Protocol |
|------|--------|-------------|------|----------|
| DF-1 | User | API Gateway | Requests | HTTPS |
| DF-2 | API Gateway | Services | Auth tokens | gRPC/TLS |
| DF-3 | Services | PostgreSQL | Queries | TLS |
| DF-4 | Services | Redis | Cache | TLS |
| DF-5 | AI Service | External LLM | Prompts | HTTPS |
| DF-6 | Catalog | TecDoc API | Part queries | HTTPS |

## 3. Threat Analysis (STRIDE)

### 3.1 Spoofing

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| S-1 | Credential theft via phishing | A-5 | Medium | High | **High** |
| S-2 | API key compromise | A-6 | Medium | High | **High** |
| S-3 | JWT token forgery | A-5 | Low | High | Medium |
| S-4 | Session hijacking | A-5 | Low | High | Medium |

**Mitigations:**
- S-1: MFA enforcement, security awareness training
- S-2: Key rotation, least privilege, monitoring
- S-3: Strong JWT signing (RS256), short expiry
- S-4: Secure cookies, session binding

### 3.2 Tampering

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| T-1 | SQL injection | A-4, A-3 | Medium | Critical | **Critical** |
| T-2 | Part data modification | A-4 | Low | High | Medium |
| T-3 | Repair record falsification | A-3 | Low | High | Medium |
| T-4 | Log tampering | A-7 | Low | Medium | Low |

**Mitigations:**
- T-1: Parameterized queries, input validation, WAF
- T-2: Role-based access, audit logging, checksums
- T-3: Approval workflows, digital signatures
- T-4: Immutable logging, log forwarding

### 3.3 Repudiation

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| R-1 | Denial of repair actions | A-3 | Medium | Medium | Medium |
| R-2 | Unauthorized data access denial | A-7 | Low | Medium | Low |

**Mitigations:**
- R-1: Comprehensive audit logging, digital signatures
- R-2: Tamper-evident logs, log retention policy

### 3.4 Information Disclosure

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| I-1 | Vehicle location exposure | A-1 | Low | Critical | **High** |
| I-2 | Fleet readiness leak | A-2 | Low | Critical | **High** |
| I-3 | API response data leakage | A-4 | Medium | Medium | Medium |
| I-4 | Error message information leak | All | Medium | Low | Low |
| I-5 | AI prompt/response leakage | A-3 | Low | High | Medium |

**Mitigations:**
- I-1, I-2: Data encryption, strict access controls, network segmentation
- I-3: Response filtering, field-level authorization
- I-4: Generic error messages, centralized error handling
- I-5: Prompt sanitization, response filtering, no PII logging

### 3.5 Denial of Service

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| D-1 | DDoS attack | All | High | High | **High** |
| D-2 | Resource exhaustion | Services | Medium | High | **High** |
| D-3 | Database connection exhaustion | A-4 | Medium | High | Medium |
| D-4 | AI service overload | AI | Medium | Medium | Medium |

**Mitigations:**
- D-1: CloudFlare DDoS protection, rate limiting
- D-2: Resource quotas, auto-scaling, circuit breakers
- D-3: Connection pooling, query timeouts
- D-4: Queue-based processing, rate limiting

### 3.6 Elevation of Privilege

| ID | Threat | Asset | Likelihood | Impact | Risk |
|----|--------|-------|------------|--------|------|
| E-1 | Horizontal privilege escalation | All | Medium | High | **High** |
| E-2 | Vertical privilege escalation | All | Low | Critical | **High** |
| E-3 | Container escape | All | Low | Critical | Medium |
| E-4 | RBAC bypass | All | Low | High | Medium |

**Mitigations:**
- E-1: Tenant isolation, resource-level authorization
- E-2: Principle of least privilege, regular access reviews
- E-3: Pod security policies, runtime security
- E-4: Policy enforcement, regular RBAC audits

## 4. Attack Trees

### 4.1 Compromise Vehicle Location Data

```
[Compromise Vehicle Location Data] (Goal)
├── [Exploit Authentication]
│   ├── [Steal credentials via phishing]
│   ├── [Brute force weak passwords]
│   └── [Exploit SSO vulnerability]
├── [Exploit Authorization]
│   ├── [IDOR vulnerability]
│   ├── [RBAC misconfiguration]
│   └── [JWT manipulation]
├── [Exploit Application]
│   ├── [SQL injection]
│   ├── [API parameter tampering]
│   └── [GraphQL introspection]
├── [Exploit Infrastructure]
│   ├── [Database direct access]
│   ├── [Backup file exposure]
│   └── [Log file access]
└── [Social Engineering]
    ├── [Insider threat]
    └── [Support desk manipulation]
```

### 4.2 Disrupt Repair Operations

```
[Disrupt Repair Operations] (Goal)
├── [Denial of Service]
│   ├── [DDoS attack]
│   ├── [Resource exhaustion]
│   └── [Database overload]
├── [Data Manipulation]
│   ├── [Falsify repair records]
│   ├── [Corrupt parts data]
│   └── [Modify AI recommendations]
├── [System Compromise]
│   ├── [Ransomware deployment]
│   ├── [Service account compromise]
│   └── [Supply chain attack]
└── [Availability Attack]
    ├── [Certificate expiry]
    ├── [DNS hijacking]
    └── [Cloud account lockout]
```

## 5. Risk Matrix

| Risk Level | Count | Action Required |
|------------|-------|-----------------|
| **Critical** | 1 | Immediate remediation |
| **High** | 7 | Remediate within 30 days |
| **Medium** | 9 | Remediate within 90 days |
| **Low** | 3 | Accept or remediate |

## 6. Security Requirements

### 6.1 Authentication

| Requirement | Priority | Status |
|-------------|----------|--------|
| MFA for all users | Critical | ✅ |
| API key rotation (90 days) | High | ✅ |
| Session timeout (15 min) | High | ✅ |
| Account lockout (5 attempts) | High | ✅ |
| Password complexity | Medium | ✅ |

### 6.2 Authorization

| Requirement | Priority | Status |
|-------------|----------|--------|
| Role-based access control | Critical | ✅ |
| Resource-level permissions | High | ✅ |
| Least privilege principle | High | ✅ |
| Regular access reviews | Medium | 🔄 |

### 6.3 Data Protection

| Requirement | Priority | Status |
|-------------|----------|--------|
| Encryption at rest (AES-256) | Critical | ✅ |
| Encryption in transit (TLS 1.3) | Critical | ✅ |
| Field-level encryption | High | ✅ |
| Data masking in logs | High | ✅ |
| Backup encryption | High | ✅ |

### 6.4 Monitoring

| Requirement | Priority | Status |
|-------------|----------|--------|
| Security event logging | Critical | ✅ |
| Real-time alerting | High | ✅ |
| Anomaly detection | High | 🔄 |
| Log retention (1 year) | Medium | ✅ |

## 7. Recommendations

### 7.1 Immediate (P0)

1. **Implement SQL injection protection** - Ensure all queries use parameterized statements
2. **Enable WAF rules** - Deploy OWASP Core Rule Set
3. **Review RBAC policies** - Verify least privilege enforcement

### 7.2 Short-term (P1 - 30 days)

1. Implement anomaly detection for API access patterns
2. Deploy runtime application security (RASP)
3. Establish bug bounty program
4. Conduct red team exercise

### 7.3 Medium-term (P2 - 90 days)

1. Implement zero-trust network architecture
2. Deploy secrets management solution (Vault)
3. Establish security champions program
4. Achieve SOC 2 Type II compliance

## 8. Review History

| Date | Version | Reviewer | Changes |
|------|---------|----------|---------|
| Dec 2025 | 1.0 | Security Team | Initial threat model |

## Appendix A: STRIDE Reference

| Category | Description |
|----------|-------------|
| **S**poofing | Impersonating something or someone |
| **T**ampering | Modifying data or code |
| **R**epudiation | Denying having performed an action |
| **I**nformation Disclosure | Exposing information |
| **D**enial of Service | Deny or degrade service |
| **E**levation of Privilege | Gain unauthorized capabilities |
