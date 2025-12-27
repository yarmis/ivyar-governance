curl -s "https://gist.githubusercontent.com/raw" -o /dev/null 2>&1 || echo "Creating file..."

echo '# Master Service Agreement

**Document Version:** 1.0  
**Effective Date:** [DATE]  
**Last Updated:** [DATE]

---

## 1. Parties

This Master Service Agreement ("Agreement") is entered into between:

**IVYAR LLC**, a Washington State limited liability company ("Provider"), and **[Ministry / Government Agency Name]** ("Client").

Together — "Parties".

---

## 2. Purpose

The purpose of this Agreement is to define the terms under which IVYAR provides:

- Access to the IVYAR Platform
- Catalog intelligence
- Compliance and export-control automation
- Risk analytics
- RFQ and procurement workflow tools
- Audit and transparency modules

The Platform is designed to support defence, humanitarian, and international procurement transparency.

---

## 3. Scope of Services

### 3.1. Platform Access

| Service | Description |
|---------|-------------|
| Catalog Service | Unified product catalog with classification |
| RFQ Service | Request for quotation management |
| Order Management | End-to-end order tracking |
| Compliance Engine | Automated compliance verification |
| Risk Engine | Real-time risk assessment |
| ML Classification Engine | AI-powered item classification |
| Audit & Oversight Dashboard | Transparency and audit tools |

### 3.2. Support

- 24/7 incident response
- Dedicated government support channel
- Onboarding and training

### 3.3. Integrations

- NATO NCS (NATO Codification System)
- EU Dual-Use regulations
- Sanctions databases (OFAC, EU, UN)
- OEM APIs

---

## 4. Responsibilities of the Provider

IVYAR shall:

- Maintain platform uptime of **99.9%**
- Ensure data encryption (**AES-256** at rest, **TLS 1.3** in transit)
- Maintain audit logs for **7 years**
- Comply with export-control regulations
- Provide multi-region redundancy
- Ensure zero-trust security architecture

---

## 5. Responsibilities of the Client

The Client shall:

- Ensure lawful use of the platform
- Provide accurate end-user information
- Comply with export-control and sanctions laws
- Maintain confidentiality of access credentials
- Notify IVYAR of any suspected misuse

---

## 6. Data Protection

| Framework | Status |
|-----------|--------|
| NIST 800-53 | Compliant |
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| NATO NCI Agency | Aligned |

Data is stored in GovCloud-equivalent secure environments.

---

## 7. Export Control and Compliance

The Client acknowledges:

- IVYAR does not facilitate the sale of weapons or ammunition
- IVYAR automatically blocks prohibited items
- All controlled items require government authorization
- IVYAR provides compliance automation but does not replace legal review

---

## 8. Fees and Payment

| Fee Type | Description |
|----------|-------------|
| Annual Government License | Base platform access |
| Module-based Pricing | Additional modules as needed |
| Support and Onboarding | Implementation services |
| Enterprise Integrations | Custom API integrations |

Payment terms: Net 30.

---

## 9. Confidentiality

Both Parties agree to:

- Protect confidential information
- Restrict access to authorized personnel
- Use information solely for the purpose of this Agreement

---

## 10. Audit and Oversight

The Client may:

- Access audit logs
- Request compliance reports
- Participate in oversight reviews
- Verify ML model integrity

IVYAR maintains immutable logs for all actions.

---

## 11. Term and Termination

### 11.1. Term

This Agreement is valid for 12 months, automatically renewable.

### 11.2. Termination

Either Party may terminate with 90 days notice.

Immediate termination applies in cases of:

- Illegal use
- Export-control violations
- Sanctions breaches

---

## 12. Liability

IVYAR is not liable for:

- Decisions made by the Client
- Procurement outcomes
- Misuse of the platform
- Third-party data inaccuracies

Liability is limited to the amount paid in the last 12 months.

---

## 13. Governing Law

This Agreement is governed by the laws of the State of Washington, USA.

---

## 14. Signatures

| IVYAR LLC | Ministry / Agency |
|-----------|-------------------|
| Name: | Name: |
| Title: | Title: |
| Date: | Date: |' > legal/master-service-agreement.md
