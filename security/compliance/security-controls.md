# IVYAR Security Controls

## Control Framework

Based on NIST Cybersecurity Framework and ISO 27001.

## 1. Access Control (AC)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| AC-1 | Access control policy | ✅ | Policy document |
| AC-2 | Account management | ✅ | IAM system |
| AC-3 | Access enforcement | ✅ | RBAC implementation |
| AC-4 | Information flow | ✅ | Network policies |
| AC-5 | Separation of duties | ✅ | Role definitions |
| AC-6 | Least privilege | ✅ | Permission audits |
| AC-7 | Failed login attempts | ✅ | Lockout policy |
| AC-8 | System use notification | ✅ | Login banner |
| AC-11 | Session lock | ✅ | 15-min timeout |
| AC-17 | Remote access | ✅ | VPN + MFA |

## 2. Audit & Accountability (AU)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| AU-1 | Audit policy | ✅ | Policy document |
| AU-2 | Audit events | ✅ | Event catalog |
| AU-3 | Audit content | ✅ | Log format spec |
| AU-4 | Audit storage | ✅ | 1-year retention |
| AU-6 | Audit review | ✅ | Weekly review |
| AU-8 | Time stamps | ✅ | NTP sync |
| AU-9 | Audit protection | ✅ | Immutable logs |
| AU-12 | Audit generation | ✅ | Centralized logging |

## 3. Configuration Management (CM)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| CM-1 | CM policy | ✅ | Policy document |
| CM-2 | Baseline configuration | ✅ | IaC templates |
| CM-3 | Change control | ✅ | Git workflow |
| CM-6 | Configuration settings | ✅ | Hardening guides |
| CM-7 | Least functionality | ✅ | Minimal images |
| CM-8 | Asset inventory | ✅ | CMDB |

## 4. Identification & Authentication (IA)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| IA-1 | IA policy | ✅ | Policy document |
| IA-2 | User identification | ✅ | Unique accounts |
| IA-3 | Device identification | ✅ | Certificate auth |
| IA-4 | Identifier management | ✅ | Lifecycle process |
| IA-5 | Authenticator management | ✅ | Password policy |
| IA-8 | Non-org user ID | ✅ | Guest policy |

## 5. Incident Response (IR)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| IR-1 | IR policy | ✅ | Policy document |
| IR-2 | IR training | ✅ | Training records |
| IR-3 | IR testing | ✅ | Tabletop exercises |
| IR-4 | IR handling | ✅ | IR procedures |
| IR-5 | IR monitoring | ✅ | SIEM dashboards |
| IR-6 | IR reporting | ✅ | Report templates |
| IR-8 | IR plan | ✅ | IR plan document |

## 6. System & Communications Protection (SC)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| SC-1 | SC policy | ✅ | Policy document |
| SC-7 | Boundary protection | ✅ | Firewall rules |
| SC-8 | Transmission integrity | ✅ | TLS 1.3 |
| SC-12 | Key management | ✅ | KMS |
| SC-13 | Cryptographic protection | ✅ | AES-256 |
| SC-28 | Data at rest protection | ✅ | Encryption |

## 7. System & Information Integrity (SI)

| ID | Control | Status | Evidence |
|----|---------|--------|----------|
| SI-1 | SI policy | ✅ | Policy document |
| SI-2 | Flaw remediation | ✅ | Patching process |
| SI-3 | Malware protection | ✅ | EDR deployment |
| SI-4 | System monitoring | ✅ | SIEM + alerting |
| SI-5 | Security alerts | ✅ | Alert procedures |
| SI-7 | Software integrity | ✅ | Code signing |

## Control Summary

| Category | Total | Implemented | Gap |
|----------|-------|-------------|-----|
| Access Control | 10 | 10 | 0 |
| Audit | 8 | 8 | 0 |
| Config Mgmt | 6 | 6 | 0 |
| ID & Auth | 6 | 6 | 0 |
| Incident Response | 7 | 7 | 0 |
| SC Protection | 6 | 6 | 0 |
| SI Integrity | 6 | 6 | 0 |
| **Total** | **49** | **49** | **0** |

*Last Assessment: December 2025*
