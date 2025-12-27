# Critical Parts Clusters

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Classification:** Internal

---

## Overview

This document defines critical parts clusters for prioritized catalog coverage, ML training, and supply chain monitoring.

---

## 1. Automotive Clusters

### 1.1. Brakes & Safety

| Cluster ID | Category | Priority |
|------------|----------|----------|
| AUTO-BRK-001 | Brake Pads | Critical |
| AUTO-BRK-002 | Brake Discs | Critical |
| AUTO-BRK-003 | Brake Calipers | Critical |
| AUTO-BRK-004 | Brake Lines | High |
| AUTO-BRK-005 | ABS Sensors | Critical |

**Key Brands:** TRW, ATE, BREMBO, TEXTAR, BOSCH

### 1.2. Filtration

| Cluster ID | Category | Priority |
|------------|----------|----------|
| AUTO-FLT-001 | Oil Filters | Critical |
| AUTO-FLT-002 | Air Filters | Critical |
| AUTO-FLT-003 | Fuel Filters | Critical |
| AUTO-FLT-004 | Cabin Filters | High |

**Key Brands:** MANN-FILTER, MAHLE, BOSCH, HENGST

### 1.3. Engine Components

| Cluster ID | Category | Priority |
|------------|----------|----------|
| AUTO-ENG-001 | Timing Belts | Critical |
| AUTO-ENG-002 | Water Pumps | Critical |
| AUTO-ENG-003 | Thermostats | High |
| AUTO-ENG-004 | Gaskets | Critical |
| AUTO-ENG-005 | Spark Plugs | Critical |

**Key Brands:** GATES, CONTITECH, SKF, NGK, BOSCH

### 1.4. Suspension & Steering

| Cluster ID | Category | Priority |
|------------|----------|----------|
| AUTO-SUS-001 | Shock Absorbers | Critical |
| AUTO-SUS-002 | Springs | Critical |
| AUTO-SUS-003 | Control Arms | High |
| AUTO-SUS-004 | Ball Joints | Critical |
| AUTO-SUS-005 | Tie Rods | Critical |

**Key Brands:** SACHS, LEMFORDER, MEYLE, FEBI

### 1.5. Electrical

| Cluster ID | Category | Priority |
|------------|----------|----------|
| AUTO-ELC-001 | Alternators | Critical |
| AUTO-ELC-002 | Starters | Critical |
| AUTO-ELC-003 | Batteries | Critical |
| AUTO-ELC-004 | Sensors | Critical |
| AUTO-ELC-005 | Wiring | High |

**Key Brands:** BOSCH, VALEO, DENSO, HELLA

---

## 2. Industrial Clusters

### 2.1. Hydraulics

| Cluster ID | Category | Priority |
|------------|----------|----------|
| IND-HYD-001 | Pumps | Critical |
| IND-HYD-002 | Valves | Critical |
| IND-HYD-003 | Cylinders | Critical |
| IND-HYD-004 | Hoses | High |
| IND-HYD-005 | Filters | Critical |

**Key Brands:** PARKER, REXROTH, EATON, HYDAC

### 2.2. Pneumatics

| Cluster ID | Category | Priority |
|------------|----------|----------|
| IND-PNE-001 | Compressors | Critical |
| IND-PNE-002 | Valves | Critical |
| IND-PNE-003 | Cylinders | Critical |
| IND-PNE-004 | FRLs | High |

**Key Brands:** FESTO, SMC, PARKER, NORGREN

### 2.3. Bearings & Power Transmission

| Cluster ID | Category | Priority |
|------------|----------|----------|
| IND-BRG-001 | Ball Bearings | Critical |
| IND-BRG-002 | Roller Bearings | Critical |
| IND-BRG-003 | Belts | Critical |
| IND-BRG-004 | Chains | High |
| IND-BRG-005 | Couplings | High |

**Key Brands:** SKF, FAG, INA, NSK, TIMKEN

---

## 3. Defence-Adjacent Clusters

### 3.1. Communications

| Cluster ID | Category | Priority |
|------------|----------|----------|
| DEF-COM-001 | Radios | Critical |
| DEF-COM-002 | Antennas | Critical |
| DEF-COM-003 | Cables | High |
| DEF-COM-004 | Connectors | Critical |

### 3.2. Power Systems

| Cluster ID | Category | Priority |
|------------|----------|----------|
| DEF-PWR-001 | Generators | Critical |
| DEF-PWR-002 | Batteries | Critical |
| DEF-PWR-003 | Inverters | Critical |
| DEF-PWR-004 | Chargers | High |

### 3.3. Optics & Sensors

| Cluster ID | Category | Priority |
|------------|----------|----------|
| DEF-OPT-001 | Night Vision | Critical |
| DEF-OPT-002 | Thermal | Critical |
| DEF-OPT-003 | Cameras | High |
| DEF-OPT-004 | GPS | Critical |

---

## 4. Cluster Prioritization Matrix

| Priority | Definition | SLA |
|----------|------------|-----|
| Critical | Essential for operations | 24h response |
| High | Important for operations | 48h response |
| Medium | Standard parts | 72h response |
| Low | Non-essential | 1 week |

---

## 5. ML Training Priority

| Cluster Type | Training Priority | Data Volume |
|--------------|-------------------|-------------|
| Automotive Brakes | P1 | High |
| Automotive Filters | P1 | High |
| Industrial Hydraulics | P1 | Medium |
| Defence Communications | P1 | Low |
| Automotive Electrical | P2 | High |
| Industrial Bearings | P2 | Medium |

---

## 6. Supply Chain Monitoring

### Critical Path Clusters

1. **Brake Components** - Safety critical
2. **Filtration** - High turnover
3. **Hydraulics** - Industrial dependency
4. **Communications** - Defence critical

### Risk Indicators

| Indicator | Threshold | Action |
|-----------|-----------|--------|
| Stock Level | < 30 days | Alert |
| Lead Time | > 14 days | Review |
| Price Variance | > 15% | Investigate |
| Supplier Risk | > 50 | Escalate |

---

*This document is maintained under the IVYAR Catalog Framework.*
