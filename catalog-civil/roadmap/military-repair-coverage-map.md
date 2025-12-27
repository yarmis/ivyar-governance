# IVYAR Military Repair Coverage Map

**Document Version:** 2.0  
**Last Updated:** 2025-01-01  
**Classification:** Official

---

## 1. Document Purpose

**Purpose:** Provide a structured coverage map of military and quasi-military equipment repairs in the IVYAR system, focusing on:

- Repair classification levels
- Platform types (pickups, trucks, specialized equipment)
- Parts availability levels
- Logistics and time parameters
- Gaps requiring priority closure

**Target Audience:**

- Ministries and government customers
- Partner suppliers
- Donors and institutional supporters
- Internal IVYAR teams (product, data, logistics)

---

## 2. Repair Classification

### 2.1. Repair Levels

| Level | Name | Description | Typical Executors |
|-------|------|-------------|-------------------|
| R1 | Field Repair | Quick operations at front line / in field. Component replacement without deep diagnostics. | Crew, mobile repair teams |
| R2 | Base Repair | Repair at rear echelon (brigade/battalion level). Limited special equipment, basic diagnostics. | Unit repair bases, mobile workshops |
| R3 | Deep Repair | Full diagnostics, component repair, partial overhaul of assemblies. | Stationary workshops, repair plants |
| R4 | Capital Repair | Complete overhaul, restoration of equipment to maximum possible service life. | Specialized factories / OEM partners |

### 2.2. Functional Repair Clusters

| Cluster | Description | Example Work |
|---------|-------------|--------------|
| Engine | Start, power, fuel consumption | Engine replacement, injectors, turbo, filters |
| Transmission | Torque transfer | Gearbox, transfer case, driveshaft, clutch replacement |
| Brake System | Safe stopping | Pads, discs, hoses, calipers, brake cylinders |
| Suspension | Off-road capability, stability | Shock absorbers, springs, control arms, bushings |
| Electrical | Start, lighting, communication | Alternator, starter, battery, wiring, lights |
| Body / Armor | Protection, geometry | Armoring, frame restoration, mounts, armor plates |
| Tires & Wheels | Ground contact, mobility | Tire/wheel replacement, damaged tire repair |
| Special Equipment | Tactical systems, comms, navigation | Radio, antenna, navigation module repair/replacement |

---

## 3. Repair Coverage Matrix by Platform Type

### 3.1. Platform Types

| Code | Name | Description |
|------|------|-------------|
| LTV | Light Tactical Vehicles | Pickups, SUVs, light armored vehicles |
| MTV | Medium Tactical Vehicles | Medium trucks, armored cargo platforms |
| HTV | Heavy Tactical Vehicles | Heavy trucks, tractors, special platforms |
| Specialized | Specialized Vehicles | Ambulances, EOD, comms, command, recovery vehicles |

### 3.2. Coverage Matrix (R-Level × Cluster × Platform)

**Table 1: Current Coverage (Alpha Assessment)**

| Platform / Cluster | Engine | Transmission | Brakes | Suspension | Electrical | Body/Armor | Tires/Wheels | Special Equipment |
|--------------------|--------|--------------|--------|------------|------------|------------|--------------|-------------------|
| LTV | R1-R3 | R1-R2 | R1-R3 | R1-R2 | R1-R3 | R1-R2 | R1-R3 | R1 |
| MTV | R1-R2 | R1-R2 | R1-R2 | R1-R2 | R1-R2 | R1-R2 | R1-R2 | R1 |
| HTV | R1-R2 | R1 | R1-R2 | R1 | R1-R2 | R1 | R1-R2 | R1 |
| Specialized | R1-R2 | R1 | R1-R2 | R1 | R1-R2 | R1 | R1-R2 | R1-R2 |

> Note: R3-R4 for heavy platforms and special equipment is provided through separate factory and OEM channels outside the rapid field repair circuit.

---

## 4. Coverage Heatmap

### 4.1. Heatmap Legend

| Status | Coverage | Description |
|--------|----------|-------------|
| 🟢 GREEN | ≥ 80% | Typical repair scenarios covered (parts + logistics + time) |
| 🟡 AMBER | 40-80% | Critical gaps in parts availability or timelines |
| 🔴 RED | < 40% | Requires priority closure |

### 4.2. Heatmap by Cluster

**Table 2: Qualitative Assessment**

| Cluster | LTV | MTV | HTV | Specialized | Strategic Comment |
|---------|-----|-----|-----|-------------|-------------------|
| Engine | 🟢 | 🟡 | 🟡 | 🟡 | LTV well covered; HTV needs deeper OEM channels |
| Transmission | 🟡 | 🟡 | 🔴 | 🔴 | Weak coverage of heavy gearboxes, transfer cases |
| Brake System | 🟢 | 🟢 | 🟡 | 🟡 | Critical to maintain brake kit inventory |
| Suspension | 🟡 | 🟡 | 🔴 | 🔴 | Complex assemblies for HTV and special chassis |
| Electrical | 🟢 | 🟢 | 🟡 | 🟡 | HTV alternators/starters - separate focus |
| Body / Armor | 🟡 | 🟡 | 🟡 | 🟡 | Tactical armor kits have separate supply chain |
| Tires & Wheels | 🟢 | 🟢 | 🟡 | 🟡 | HTV tires - high cost and logistics complexity |
| Special Equipment | 🟡 | 🟡 | 🟡 | 🔴 | Key gap - tactical electronics and integrations |

---

## 5. Gap Closure Priorities

### 5.1. Top 5 Critical Gaps

| Priority | Gap | Status | Action Plan |
|----------|-----|--------|-------------|
| 1 | **HTV Transmission** | 🔴 RED | Deficit of gearbox/transfer case assemblies for heavy platforms. Action: Establish targeted agreements with 2-3 key OEM/distributors. |
| 2 | **HTV & Specialized Suspension** | 🔴 RED | Running gear assemblies for heavy platforms and special chassis. Action: Create dedicated "HTV Suspension Pack" catalog. |
| 3 | **Specialized Equipment** | 🔴 RED | Tactical comms, navigation, command equipment. Action: Separate "Tactical Electronics Repair & Swap" cluster. |
| 4 | **HTV Tires** | 🟡 AMBER (risk of RED) | High load, high cost, complex logistics. Action: Priority track for heavy platform tires. |
| 5 | **Deep Repairs (R3-R4)** | 🟡 AMBER | Need for standardized channels for vehicle transfer to factories/OEM. Action: Create "IVYAR Deep Repair Corridor" with transparent tracking. |

### 5.2. Gap Closure Roadmap

| Gap | Q1 2025 | Q2 2025 | Q3 2025 | Q4 2025 |
|-----|---------|---------|---------|---------|
| HTV Transmission | OEM outreach | Contracts signed | Catalog live | 50% coverage |
| HTV Suspension | Requirements | Supplier selection | Catalog live | 60% coverage |
| Tactical Electronics | Assessment | Partner agreements | Pilot | 40% coverage |
| HTV Tires | Supplier mapping | Priority contracts | Stock buildup | 70% coverage |
| R3-R4 Corridor | Framework design | Pilot partners | Process live | Full operation |

---

## 6. Integration with IVYAR Roadmap

### 6.1. Related Documents

This document directly connects with:

- `catalog-civil/roadmap/catalog-expansion-roadmap.md`
- `catalog-civil/roadmap/30-day-rapid-import-plan.md`
- `catalog-civil/roadmap/critical-catalogs-pack.md`
- `governance/risk-governance.md`

### 6.2. Coverage Map Update Roadmap

| Phase | Action | Artifacts | Responsible |
|-------|--------|-----------|-------------|
| Phase 1 (MVP) | Qualitative coverage assessment | This coverage map | Product, Ops |
| Phase 2 | Add quantitative metrics (SLA, time, % coverage) | Metrics addendum | Data, Logistics |
| Phase 3 | Integration with real repair data (field data) | Repair analytics dashboard | Data, Field teams |
| Phase 4 | Public government visualization (minimal detail) | Government-facing summary & infographics | IVYAR + Ministries |

---

## 7. Executive Summary (Ministry Version)

### 7.1. Overview

IVYAR is building a **systematic repair coverage map** for tactical and specialized equipment, focusing on:

- **Rapid R1-R2 repairs** as close to the mission line as possible
- **Structured R3-R4 channels** through factories, OEMs, and partner bases
- **Transparent gap identification** and phased closure plan

### 7.2. Key Points for Ministries

| Point | Description |
|-------|-------------|
| **Structured Approach** | IVYAR is not a random parts warehouse - it's a managed repair capability map |
| **Fleet Readiness** | System enables assessment of fleet repair readiness |
| **Budget Planning** | Plan budgets and supplies based on structured matrix, not intuition |
| **Partner Transparency** | Clearly show partners which segments need support |
| **Gap Tracking** | Critical gaps (transmission, suspension, special equipment for HTV) are tracked separately |

### 7.3. Coverage Summary

| Platform | Overall Readiness | Key Gaps |
|----------|-------------------|----------|
| LTV | 🟢 80%+ | Minor gaps in special equipment |
| MTV | 🟡 60-70% | Transmission, suspension |
| HTV | 🟡 40-60% | Transmission, suspension, special equipment |
| Specialized | 🟡 40-50% | Special equipment, deep repairs |

---

## 8. Next Steps

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Align R-level classification with relevant ministry departments | Week 1-2 |
| 2 | Clarify platform typology (LTV/MTV/HTV/Specialized) with ministry registries | Week 2-3 |
| 3 | Collect test set of real repair cases for heatmap validation | Week 3-4 |
| 4 | Create Metrics Addendum (SLA, downtime, % closed repairs) | Month 2 |
| 5 | Prepare joint IVYAR + Ministry presentation based on this document | Month 2 |

---

## 9. Appendix: Platform Examples

### 9.1. LTV Examples

| Brand | Model | Common Repairs |
|-------|-------|----------------|
| Toyota | Hilux, Land Cruiser | Engine, brakes, electrical |
| Mitsubishi | L200, Pajero | Suspension, electrical |
| Ford | Ranger | Transmission, brakes |

### 9.2. MTV Examples

| Brand | Model | Common Repairs |
|-------|-------|----------------|
| MAN | TGL, TGM | Engine, brakes, electrical |
| Mercedes | Atego | Transmission, suspension |

### 9.3. HTV Examples

| Brand | Model | Common Repairs |
|-------|-------|----------------|
| MAN | TGS, TGX | Engine, transmission, tires |
| Scania | P-series, G-series | Brakes, suspension |
| Volvo | FH, FM, FMX | All systems |

---

*This document is maintained under the IVYAR Catalog Framework.*
