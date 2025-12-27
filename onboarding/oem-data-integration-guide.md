# OEM Data Integration Guide

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Classification:** Official

---

## Overview

This guide defines the data structure, validation rules, and integration process for OEM and aftermarket parts data in the IVYAR Platform.

---

## 1. File Structures

### 1.1. OEM Parts File (`oem_parts.csv`)

| Field | Description | Required |
|-------|-------------|----------|
| `oem_brand` | Brand name | ✅ Yes |
| `oem_part_number` | Part number | ✅ Yes |
| `title_short` | Short title | ✅ Yes |
| `category` | Category | ✅ Yes |
| `title_long` | Long title | No |
| `description_technical` | Technical description | No |
| `vehicle_brand` | Vehicle brand | No |
| `vehicle_model` | Vehicle model | No |
| `vehicle_year_from` | Year from | No |
| `vehicle_year_to` | Year to | No |
| `engine_code` | Engine code | No |
| `dimensions_length_mm` | Length (mm) | No |
| `weight_kg` | Weight (kg) | No |
| `hs_code` | Customs code | No |
| `country_of_origin` | Country of origin | No |

### 1.2. Aftermarket Parts File (`aftermarket_parts.csv`)

| Field | Description |
|-------|-------------|
| `aftermarket_brand` | Aftermarket brand |
| `aftermarket_part_number` | Aftermarket part number |
| `oem_brand_ref` | Reference OEM brand |
| `oem_part_number_ref` | Reference OEM part number |
| `category` | Category |

### 1.3. NSN Mapping File (`nsn_mapping.csv`)

| Field | Description |
|-------|-------------|
| `nsn` | NATO Stock Number |
| `oem_brand` | OEM brand |
| `oem_part_number` | OEM part number |
| `source` | manual / oem_catalog / distributor |
| `confidence` | Confidence score (0-1) |

---

## 2. Data Validation

### 2.1. Syntactic Validation

- Required fields are not empty
- Correct data types
- Valid date, number, and code formats

### 2.2. Semantic Validation

| Rule | Validation |
|------|------------|
| Year Range | `vehicle_year_from ≤ vehicle_year_to` |
| Weight | `weight_kg ≥ 0` |
| Country | `country_of_origin` ∈ ISO-3166 |
| HS Code | `hs_code` ∈ WCO HS |

### 2.3. Business Validation

| Scenario | Action |
|----------|--------|
| Duplicate OEM P/N | Merge or warning |
| Conflicting NSN mappings | Flag as `needs_review` |
| Category mismatch | Warning |

---

## 3. Update SLA

### 3.1. OEM Data

| Update Type | Timeline |
|-------------|----------|
| Regular catalog updates | Monthly |
| Critical updates | 48 hours |

### 3.2. Aftermarket Data

| Update Type | Timeline |
|-------------|----------|
| Regular updates | Quarterly |

### 3.3. NSN Mappings

| Update Type | Timeline |
|-------------|----------|
| Regular updates | Weekly |
| ML-suggested mappings | Manual review within 72 hours |

---

## 4. Integration Process

### Step 1: File Submission

OEM/Distributor provides:

- OEM parts file
- Aftermarket parts file
- NSN mapping file (if available)

### Step 2: ETL Processing

IVYAR performs:

- Normalization
- Validation
- Enrichment
- Mapping
- Canonical JSON generation

### Step 3: System Loading

Data is loaded into:

- `civil_parts` table
- `mapping_nsn_oem_aftermarket` table
- ML index (AnalogFinder)

### Step 4: Reporting

OEM receives:

- Import statistics
- Error list
- Data improvement recommendations

---

## 5. OEM API Access

OEMs can verify their data through:

| Endpoint | Purpose |
|----------|---------|
| `/api/v1/catalog/civil/parts/search` | Search parts |
| `/api/v1/catalog/civil/mapping` | View mappings |
| `/api/v1/ml/analog-finder/query` | Find analogs |

---

## 6. Recommendations for OEMs

### Data Quality Best Practices

| Recommendation | Benefit |
|----------------|---------|
| Use standardized brand names | Consistent matching |
| Avoid spaces in part numbers | Accurate lookups |
| Provide maximum technical parameters | Better ML matching |
| Include EAN/UPC codes | Cross-reference capability |
| Add fitment data (brand/model/years) | Vehicle compatibility |

---

## 7. Sample Data

### OEM Parts Example

```csv
oem_brand,oem_part_number,title_short,category,vehicle_brand,vehicle_model
BOSCH,0986424582,Brake Pad Set,Brakes,Volkswagen,Golf
MANN-FILTER,HU719/7X,Oil Filter,Filters,Audi,A4
```

### NSN Mapping Example

```csv
nsn,oem_brand,oem_part_number,source,confidence
2530-01-234-5678,BOSCH,0986424582,oem_catalog,0.95
```

---

## 8. Integration Contacts

| Purpose | Contact |
|---------|---------|
| Data Integration | integration@ivyar.org |
| Technical Support | api-support@ivyar.org |
| OEM Partnerships | partners@ivyar.org |

---

*This document is maintained under the IVYAR Governance Framework.*
