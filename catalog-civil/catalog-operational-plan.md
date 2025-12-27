# Catalog Coverage & Operational Plan

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Classification:** Internal

---

## 1. Cluster Coverage by Vehicle Type

### 1.1. Pickup Trucks

**Military Functions Covered:**

- Reconnaissance
- Evacuation
- Medical teams
- Logistics

**Key Brands:** Toyota, Mitsubishi, Nissan, Ford

### 1.2. Cargo Trucks

**Military Functions Covered:**

- Ammunition transport
- Vehicle evacuation
- Engineering operations

**Key Brands:** MAN, Scania, Volvo, Mercedes-Benz

### 1.3. Engines

**Equipment Covered:**

- Pickup trucks
- Cargo trucks
- Generators
- Engineering equipment

**Key Brands:** Cummins, Perkins, Deutz, CAT

### 1.4. Brakes

**Vehicles Covered:**

- MAN, Scania, Volvo
- Toyota, Mitsubishi

**Key Brands:** WABCO, Knorr-Bremse, TRW, ATE

### 1.5. Electrical Systems

**Components Covered:**

- Starters
- Alternators
- Sensors

**Key Brands:** Bosch, Denso, Delphi, Valeo

### 1.6. Filters

**Systems Covered:**

- Engines
- Hydraulics

**Key Brands:** Mann-Filter, Mahle, Donaldson, Fleetguard

### 1.7. Tires

**Vehicles Covered:**

- Pickup trucks
- Cargo trucks
- Engineering equipment

**Key Brands:** Michelin, Goodyear, Continental, BFGoodrich

---

## 2. Brand-to-Function Mapping Matrix

| Brand | Vehicle Type | Military Function |
|-------|--------------|-------------------|
| Toyota | Pickup | Reconnaissance, Medical |
| Mitsubishi | Pickup | Logistics, Evacuation |
| MAN | Cargo Truck | Ammunition, Engineering |
| Scania | Cargo Truck | Heavy Transport |
| Volvo | Cargo Truck | Evacuation, Logistics |
| Cummins | Engine | Power Generation |
| WABCO | Brakes | All Heavy Vehicles |
| Bosch | Electrical | All Vehicles |
| Mann-Filter | Filters | All Engines |
| Michelin | Tires | All Vehicles |

---

## 3. Full 30-Day Operational Plan

### Phase 1: Preparation (Days 1-3)

| Day | Task | Deliverable |
|-----|------|-------------|
| 1 | Create brand-alias tables | `brand_aliases.json` |
| 1 | Prepare canonical JSON schema | `schema.json` |
| 2 | Develop ETL scripts | `etl/` directory |
| 2 | Create mapping tables | `mappings/` directory |
| 3 | Set up validation rules | `validation/` directory |
| 3 | Configure ML pipeline | `ml/config.yaml` |

### Phase 2: Vehicle Import (Days 4-10)

| Day | Task | Volume |
|-----|------|--------|
| 4-5 | Import Toyota parts | ~50,000 parts |
| 5-6 | Import Mitsubishi parts | ~30,000 parts |
| 6-7 | Import Nissan, Ford parts | ~40,000 parts |
| 7-8 | Import MAN parts | ~25,000 parts |
| 8-9 | Import Volvo, Scania parts | ~35,000 parts |
| 10 | Build initial ML index | Full catalog |

### Phase 3: Engine & Brakes Import (Days 11-15)

| Day | Task | Volume |
|-----|------|--------|
| 11-12 | Import Cummins parts | ~20,000 parts |
| 12-13 | Import Perkins, Deutz parts | ~25,000 parts |
| 13-14 | Import WABCO parts | ~15,000 parts |
| 14-15 | Import Knorr-Bremse parts | ~12,000 parts |
| 15 | Build cross-reference tables | All mappings |

### Phase 4: Electrical & Filters Import (Days 16-20)

| Day | Task | Volume |
|-----|------|--------|
| 16-17 | Import Bosch parts | ~100,000 parts |
| 17-18 | Import Denso, Delphi parts | ~50,000 parts |
| 18-19 | Import Mann-Filter parts | ~30,000 parts |
| 19-20 | Import Mahle parts | ~25,000 parts |
| 20 | Generate ML embeddings | Full catalog |

### Phase 5: Tires & Transmission Import (Days 21-25)

| Day | Task | Volume |
|-----|------|--------|
| 21-22 | Import Michelin parts | ~10,000 parts |
| 22-23 | Import Goodyear parts | ~8,000 parts |
| 23-24 | Import Allison parts | ~5,000 parts |
| 24-25 | Import ZF parts | ~15,000 parts |
| 25 | Run ML drift test | Validation |

### Phase 6: Validation & Launch (Days 26-30)

| Day | Task | Criteria |
|-----|------|----------|
| 26 | Manual review of 1% records | Accuracy check |
| 27 | Run automated consistency checkers | Pass/Fail |
| 28 | Generate audit report | Documentation |
| 29 | Final QA review | Sign-off |
| 30 | Production launch | Go-live |

---

## 4. Success Metrics

| Metric | Target |
|--------|--------|
| Total Parts Imported | 500,000+ |
| Data Accuracy | > 98% |
| ML Match Accuracy | > 95% |
| Cross-Reference Coverage | > 90% |
| NSN Mapping Rate | > 70% |

---

## 5. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Data quality issues | Pre-validation scripts |
| Import delays | Parallel processing |
| ML accuracy drop | Drift monitoring |
| Missing cross-references | Manual review queue |

---

## 6. Team Responsibilities

| Role | Responsibility |
|------|----------------|
| Data Engineer | ETL, import, validation |
| ML Engineer | Embeddings, matching |
| Catalog Manager | Quality review |
| QA | Testing, audit |

---

*This document is maintained under the IVYAR Catalog Framework.*
