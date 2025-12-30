# IVYAR AI Advisor — Task-Specific Prompts

## 1. Part Search (intent: part_search)

### Include
- Primary Part Number (OEM)
- Brand/Manufacturer
- Description
- Specifications
- Fitment (platforms)
- NSN (if military)
- Cross-References
- Repair Level

### Format
```
**[Part Description]**
| Attribute | Value |
|-----------|-------|
| OEM Part # | [number] |
| NSN | [nsn or N/A] |
| Repair Level | [R1-R4] |

**Fitment:** [platforms]
**Alternatives:** [list]
```

---

## 2. Analog Finder (intent: analog_finder)

### Include
- Original part identification
- OEM alternatives
- Aftermarket alternatives
- Confidence scores
- Compatibility notes

### Format
```
**Analogs for [Part Number]**
| Brand | Part # | Type | Confidence |
|-------|--------|------|------------|
| [brand] | [number] | OEM | 98% |
| [brand] | [number] | AM | 92% |

**Best Match:** [recommendation]
```

---

## 3. Repair Advisor (intent: repair_advisor)

### Include
- Repair Level (R1-R4)
- Time estimate
- Tools required
- Parts required
- Procedure overview
- Safety precautions
- Escalation path

---

## 4. Compliance Check (intent: compliance_check)

### Include
- ECCN classification
- Export status
- Destination requirements
- Documentation needed
- Sanctions check

---

## 5. Cross-Reference (intent: cross_reference)

### Include
- Input identifier type
- All mapped identifiers
- Confidence levels
- Verification status

---

## 6. Report Generation (intent: report_request)

### Include
- Executive summary
- Key metrics table
- Detailed findings
- Recommendations
- Data sources
