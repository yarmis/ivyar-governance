# Government Procurement Workflow

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Classification:** Official

---

## Overview

This document describes the complete government procurement cycle through the IVYAR Platform: Catalog → RFQ → Compliance → Audit.

---

## 1. Catalog Intelligence (Step 1)

The Ministry begins with product search:

| Function | Description |
|----------|-------------|
| NSN / FSC / OEM | Standard identification codes |
| ML Classification | AI-powered item categorization |
| Alternatives | Compatible product suggestions |
| Risk Assessment | Supplier and item risk scoring |
| Export Control | Automated control classification |

**Result:** A curated set of items ready for RFQ inclusion.

---

## 2. RFQ Creation (Step 2)

Ministry analyst creates an RFQ:

- Adds items from catalog
- Adds technical requirements
- Adds logistics conditions
- Specifies destination country

**IVYAR automatically:**

- Checks sanctions lists
- Verifies export control status
- Assesses OEM risks
- Creates audit trail

---

## 3. Supplier Matching (Step 3)

IVYAR identifies:

- Original Equipment Manufacturers (OEM)
- Official distributors
- Certified suppliers
- International partners

**Filters applied:**

| Filter | Description |
|--------|-------------|
| Sanctions | OFAC, EU, UK, UN screening |
| Export Control | ECCN, Dual-Use verification |
| Country of Origin | Origin verification |
| Risk Score | Automated risk assessment |

---

## 4. Compliance Check (Step 4)

The Compliance Engine verifies:

| Regime | Description |
|--------|-------------|
| ECCN | US Export Control Classification |
| EU Dual-Use | European Union regulations |
| UK ML | UK Military List |
| CA ECL | Canada Export Control List |
| AU DSGL | Australia Defence Strategic Goods List |
| UA Export Control | Ukraine export regulations |
| Sanctions | OFAC, EU, UK consolidated lists |

**Possible Results:**

- ✅ **Approved** — No restrictions
- ⚠️ **Requires License** — Export license needed
- ❌ **Blocked** — Transaction prohibited

---

## 5. Offer Evaluation (Step 5)

The Ministry receives proposals containing:

- Price
- Delivery terms
- Logistics
- Certificates
- OEM confirmation

**IVYAR automatically:**

- Ranks offers by score
- Verifies risks
- Adds audit trail entries

---

## 6. Order Creation (Step 6)

After supplier selection:

- Order is created
- Documents are attached
- Logistics are specified
- Export license is added (if required)

---

## 7. Audit & Oversight (Step 7)

All actions are:

- Logged with timestamps
- Cryptographically signed
- Retained for **7 years**
- Accessible to oversight board

---

## Workflow Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Catalog   │───▶│     RFQ     │───▶│  Supplier   │
│ Intelligence│    │  Creation   │    │  Matching   │
└─────────────┘    └─────────────┘    └─────────────┘
                                             │
                                             ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Audit &   │◀───│    Order    │◀───│ Compliance  │
│  Oversight  │    │  Creation   │    │    Check    │
└─────────────┘    └─────────────┘    └─────────────┘
                          ▲
                          │
                   ┌─────────────┐
                   │    Offer    │
                   │ Evaluation  │
                   └─────────────┘
```

---

*This document is maintained under the IVYAR Governance Framework.*
