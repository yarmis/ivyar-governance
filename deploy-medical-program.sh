#!/bin/bash
# ============================================================================
# IVYAR MEDICAL PROGRAM - COMPLETE DEPLOYMENT
# Comprehensive medical services for military personnel and veterans
# Version: 1.0.0
# ============================================================================

set -e

echo "=============================================="
echo "  IVYAR Medical Program Deployment"
echo "  Healthcare Services Module"
echo "=============================================="

# ============================================================================
# DIRECTORY STRUCTURE
# ============================================================================

mkdir -p medical-program/{config,models,services,api,policies,docs,ui/components,integration,tests}

# ============================================================================
# MAIN README
# ============================================================================

cat > medical-program/README.md << 'ENDFILE'
# IVYAR Medical Program

Comprehensive healthcare management system for military personnel, veterans, and pensioners.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MEDICAL PROGRAM                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Appointments │  │   Medical    │  │ Prescriptions│  │   Programs   │   │
│  │  Scheduling  │  │   Records    │  │   & Pharmacy │  │   & Rehab    │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         └──────────────────┼──────────────────┼──────────────────┘         │
│                            │                  │                             │
│                    ┌───────┴──────────────────┴───────┐                    │
│                    │      INTEGRATION LAYER           │                    │
│                    │  ┌────────────┐ ┌────────────┐  │                    │
│                    │  │  Pension   │ │  Insurance │  │                    │
│                    │  │   Fund     │ │   Engine   │  │                    │
│                    │  └────────────┘ └────────────┘  │                    │
│                    └──────────────────────────────────┘                    │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Disability  │  │   Mental     │  │  Telemedicine│  │   Billing    │   │
│  │  Assessment  │  │   Health     │  │   Services   │  │   & Claims   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Features

| Feature | Description |
|---------|-------------|
| **Appointments** | Online scheduling, reminders, telemedicine |
| **Medical Records** | EHR access, lab results, imaging |
| **Prescriptions** | E-prescriptions, refill requests, pharmacy network |
| **Programs** | Rehabilitation, mental health, wellness |
| **Disability** | Assessment scheduling, documentation, appeals |
| **Integration** | Pension fund, insurance benefits coordination |

## Quick Start

```bash
npm install
npm run build
npm run start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /patients/:id | Get patient profile |
| POST | /appointments | Schedule appointment |
| GET | /records/:patient_id | Get medical records |
| POST | /prescriptions/refill | Request refill |
| GET | /programs | List available programs |
| POST | /disability/assessment | Schedule assessment |

## Integration

- **Pension Fund Engine** — Disability status, benefits
- **Fair Insurance Engine** — Coverage, claims
- **AI Administrator** — Health recommendations

---
*Version 1.0.0 | IVYAR Governance Platform*
ENDFILE

# ============================================================================
# COMPREHENSIVE MEDICAL PROGRAM POLICY (ENGLISH)
# ============================================================================

cat > medical-program/policies/MEDICAL_PROGRAM_POLICY.md << 'ENDFILE'
# IVYAR Medical Program Policy

## Military Healthcare Services — Comprehensive Policy Document

**Document ID:** IVYAR-MED-POL-001  
**Version:** 1.0.0  
**Effective Date:** January 1, 2025  
**Review Date:** January 1, 2026  
**Classification:** Public  
**Owner:** Ministry of Defense of Ukraine — Medical Services Division

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Definitions](#2-definitions)
3. [Eligibility and Enrollment](#3-eligibility-and-enrollment)
4. [Covered Medical Services](#4-covered-medical-services)
5. [Mental Health Services](#5-mental-health-services)
6. [Rehabilitation Programs](#6-rehabilitation-programs)
7. [Disability Assessment and Services](#7-disability-assessment-and-services)
8. [Prescription Drug Coverage](#8-prescription-drug-coverage)
9. [Provider Network](#9-provider-network)
10. [Telemedicine Services](#10-telemedicine-services)
11. [Emergency Services](#11-emergency-services)
12. [Preventive Care](#12-preventive-care)
13. [Claims and Billing](#13-claims-and-billing)
14. [Cost Sharing](#14-cost-sharing)
15. [Prior Authorization](#15-prior-authorization)
16. [Appeals and Grievances](#16-appeals-and-grievances)
17. [Privacy and Data Protection](#17-privacy-and-data-protection)
18. [Integration with Pension and Insurance](#18-integration-with-pension-and-insurance)
19. [Quality Assurance](#19-quality-assurance)
20. [Compliance and Enforcement](#20-compliance-and-enforcement)

---

## 1. Purpose and Scope

### 1.1 Purpose

This policy establishes the framework for delivering comprehensive healthcare services to military personnel, veterans, and their eligible dependents through the IVYAR Medical Program. The program aims to:

- Provide accessible, high-quality healthcare services
- Support physical and mental health recovery
- Facilitate disability assessment and rehabilitation
- Ensure continuity of care across the military-civilian healthcare continuum
- Coordinate benefits with pension and insurance systems

### 1.2 Scope

This policy applies to:

| Category | Description |
|----------|-------------|
| Active Military | All active-duty service members |
| Veterans | Honorably discharged personnel |
| Reservists | Reserve and National Guard members |
| Pensioners | Military pension beneficiaries |
| Dependents | Eligible family members |
| Survivors | Surviving spouses and children |

### 1.3 Legal Framework

This policy is established in accordance with:

- Law of Ukraine "On the Status of War Veterans" (No. 3551-XII)
- Law of Ukraine "On Social and Legal Protection of Military Personnel" (No. 2011-XII)
- Law of Ukraine "On Compulsory State Social Insurance" (No. 1105-XIV)
- EU Association Agreement healthcare provisions
- NATO STANAG 2132 medical support standards

### 1.4 Guiding Principles

1. **Universality** — All eligible beneficiaries receive equal access
2. **Comprehensiveness** — Full spectrum of healthcare services
3. **Quality** — Evidence-based, patient-centered care
4. **Efficiency** — Optimal use of resources
5. **Transparency** — Clear policies and procedures
6. **Integration** — Coordinated care across systems
7. **Dignity** — Respectful treatment of all beneficiaries

---

## 2. Definitions

### 2.1 Key Terms

| Term | Definition |
|------|------------|
| **Beneficiary** | Any individual eligible for services under this program |
| **Primary Care Provider (PCP)** | Physician responsible for coordinating beneficiary's healthcare |
| **Specialist** | Physician with advanced training in specific medical field |
| **Prior Authorization** | Approval required before receiving certain services |
| **Formulary** | List of covered prescription medications |
| **Service-Connected** | Condition resulting from military service |
| **Combat-Related** | Condition directly caused by combat operations |
| **Copayment** | Fixed amount beneficiary pays for service |
| **Deductible** | Amount beneficiary pays before coverage begins |
| **Out-of-Pocket Maximum** | Annual limit on beneficiary cost sharing |

### 2.2 Service Categories

| Category | Code | Description |
|----------|------|-------------|
| Primary Care | PC | General medical services |
| Specialty Care | SC | Specialist consultations |
| Emergency | EM | Urgent/emergency services |
| Mental Health | MH | Psychological/psychiatric services |
| Rehabilitation | RH | Physical/occupational therapy |
| Preventive | PV | Screenings, immunizations |
| Pharmacy | RX | Prescription medications |
| Dental | DN | Oral health services |
| Vision | VS | Eye care services |
| Hearing | HR | Audiology services |

### 2.3 Disability Groups

| Group | Incapacity | Description |
|-------|------------|-------------|
| Group I | 100% | Complete incapacity for work |
| Group II | 75-99% | Significant incapacity |
| Group III | 50-74% | Partial incapacity |

---

## 3. Eligibility and Enrollment

### 3.1 Eligibility Criteria

#### 3.1.1 Primary Eligibility

| Category | Criteria | Documentation Required |
|----------|----------|----------------------|
| **Active Military** | Current active duty status | Military ID, unit orders |
| **Veterans** | Honorable discharge, 90+ days service | DD-214 equivalent, discharge papers |
| **Combat Veterans** | Service in combat zone | Combat service certificate |
| **Disabled Veterans** | Service-connected disability | MSEC determination |
| **Pensioners** | Receiving military pension | Pension certificate |

#### 3.1.2 Dependent Eligibility

| Dependent | Criteria | Age Limit |
|-----------|----------|-----------|
| Spouse | Legal marriage | None |
| Children | Biological, adopted, step | Under 18 (26 if student) |
| Disabled Children | Dependent with disability | None |
| Parents | Dependent on service member | 60+ years |

#### 3.1.3 Survivor Eligibility

| Survivor | Criteria | Duration |
|----------|----------|----------|
| Surviving Spouse | Not remarried | Lifetime or until remarriage |
| Orphan Children | Under 18 or student | Until age 18 (26 if student) |
| Dependent Parents | Were dependent on deceased | Lifetime |

### 3.2 Enrollment Process

#### 3.2.1 Initial Enrollment

```
Step 1: Eligibility Verification
├── Submit required documentation
├── Identity verification
└── Service history confirmation

Step 2: Application Processing
├── Review within 5 business days
├── Additional documentation requests
└── Eligibility determination

Step 3: Enrollment Completion
├── Issue beneficiary ID card
├── Assign Primary Care Provider
└── Provide welcome package

Step 4: Orientation
├── Online portal registration
├── Benefits overview
└── Contact information
```

#### 3.2.2 Enrollment Timeline

| Action | Timeline |
|--------|----------|
| Application submission | Day 0 |
| Initial review | 5 business days |
| Document requests | 10 business days |
| Final determination | 15 business days |
| ID card issuance | 20 business days |
| Coverage effective | 1st of following month |

### 3.3 Enrollment Categories

| Category | Code | Description | Cost Sharing |
|----------|------|-------------|--------------|
| **Category A** | CAT-A | Combat veterans, disabled | None |
| **Category B** | CAT-B | Veterans, pensioners | Minimal |
| **Category C** | CAT-C | Dependents | Standard |
| **Category D** | CAT-D | Extended family | Full |

### 3.4 Disenrollment

#### 3.4.1 Voluntary Disenrollment

- 30-day written notice required
- Effective end of month
- Reinstatement requires new application

#### 3.4.2 Involuntary Disenrollment

| Reason | Process | Appeal |
|--------|---------|--------|
| Loss of eligibility | 60-day notice | Yes, 30 days |
| Fraud | Immediate | Yes, 15 days |
| Non-payment | 90-day notice | Yes, 30 days |
| Death | Automatic | N/A |

---

## 4. Covered Medical Services

### 4.1 Primary Care Services

#### 4.1.1 Covered Services

| Service | Frequency | Authorization |
|---------|-----------|---------------|
| Annual physical exam | 1 per year | None |
| Sick visits | As needed | None |
| Chronic disease management | Ongoing | None |
| Immunizations | Per schedule | None |
| Health screenings | Per guidelines | None |
| Minor procedures | As needed | None |
| Lab work (routine) | As ordered | None |

#### 4.1.2 Primary Care Provider (PCP) Selection

- Beneficiaries may select any network PCP
- PCP change allowed once per quarter
- Emergency PCP changes for cause
- PCP serves as care coordinator

### 4.2 Specialty Care Services

#### 4.2.1 Covered Specialties

| Specialty | Referral Required | Prior Auth |
|-----------|------------------|------------|
| Cardiology | Yes | No |
| Neurology | Yes | No |
| Orthopedics | Yes | Some procedures |
| Oncology | Yes | Some treatments |
| Gastroenterology | Yes | Some procedures |
| Pulmonology | Yes | No |
| Endocrinology | Yes | No |
| Nephrology | Yes | Some procedures |
| Rheumatology | Yes | Some medications |
| Dermatology | Yes | Some procedures |
| Urology | Yes | Some procedures |
| Ophthalmology | No | Some procedures |
| ENT | Yes | Some procedures |

#### 4.2.2 Referral Process

```
1. PCP determines specialty need
2. Referral submitted electronically
3. Specialist appointment scheduled
4. Specialist reports back to PCP
5. Follow-up coordinated
```

### 4.3 Hospital Services

#### 4.3.1 Inpatient Services

| Service | Coverage | Authorization |
|---------|----------|---------------|
| Room and board | 100% | Admission |
| Nursing care | 100% | Included |
| Physician services | 100% | Included |
| Surgery | 100% | Pre-authorization |
| ICU/CCU | 100% | Admission |
| Diagnostic tests | 100% | As ordered |
| Medications | 100% | Formulary |
| Rehabilitation | 100% | Care plan |

#### 4.3.2 Outpatient Services

| Service | Coverage | Authorization |
|---------|----------|---------------|
| Outpatient surgery | 100% | Pre-authorization |
| Diagnostic imaging | 100% | Some require auth |
| Lab services | 100% | None |
| Infusion therapy | 100% | Pre-authorization |
| Radiation therapy | 100% | Treatment plan |
| Chemotherapy | 100% | Treatment plan |

### 4.4 Diagnostic Services

#### 4.4.1 Laboratory Services

| Category | Examples | Authorization |
|----------|----------|---------------|
| Routine | CBC, metabolic panel | None |
| Specialized | Genetic testing | Pre-authorization |
| Pathology | Biopsy analysis | None |
| Microbiology | Cultures | None |

#### 4.4.2 Imaging Services

| Modality | Authorization | Notes |
|----------|---------------|-------|
| X-ray | None | Any facility |
| Ultrasound | None | Any facility |
| CT scan | Pre-authorization | Network facility |
| MRI | Pre-authorization | Network facility |
| PET scan | Pre-authorization | Designated centers |
| Nuclear medicine | Pre-authorization | Designated centers |

### 4.5 Surgical Services

#### 4.5.1 Coverage

| Surgery Type | Coverage | Requirements |
|--------------|----------|--------------|
| Emergency | 100% | None |
| Elective | 100% | Pre-authorization |
| Reconstructive | 100% | Medical necessity |
| Cosmetic | Not covered | N/A |

#### 4.5.2 Pre-authorization Process

```
Timeline: 5-10 business days

Required Information:
├── Diagnosis and medical necessity
├── Proposed procedure
├── Surgeon credentials
├── Facility information
└── Estimated cost

Decision:
├── Approved
├── Approved with modifications
├── Denied (with appeal rights)
└── Request additional information
```

---

## 5. Mental Health Services

### 5.1 Overview

The Medical Program recognizes the critical importance of mental health services for military personnel and veterans, particularly those with combat experience.

### 5.2 Covered Mental Health Services

#### 5.2.1 Outpatient Services

| Service | Coverage | Limits |
|---------|----------|--------|
| Individual therapy | 100% | 52 sessions/year |
| Group therapy | 100% | Unlimited |
| Psychiatric evaluation | 100% | As needed |
| Medication management | 100% | As needed |
| Psychological testing | 100% | Pre-authorization |
| Family therapy | 100% | 24 sessions/year |
| Couples therapy | 100% | 24 sessions/year |

#### 5.2.2 Inpatient Services

| Service | Coverage | Authorization |
|---------|----------|---------------|
| Acute psychiatric | 100% | Pre-authorization |
| Crisis stabilization | 100% | Emergency |
| Residential treatment | 100% | Pre-authorization |
| Detoxification | 100% | As needed |

### 5.3 PTSD Program

#### 5.3.1 Specialized PTSD Services

| Service | Description | Duration |
|---------|-------------|----------|
| **CPT** | Cognitive Processing Therapy | 12 sessions |
| **PE** | Prolonged Exposure Therapy | 8-15 sessions |
| **EMDR** | Eye Movement Desensitization | 6-12 sessions |
| **Stellate Ganglion Block** | Innovative treatment | As prescribed |

#### 5.3.2 PTSD Eligibility

- Combat veterans: Automatic eligibility
- Service-connected trauma: Automatic eligibility
- Other trauma: Evaluation required

### 5.4 Substance Use Disorder

#### 5.4.1 Covered Services

| Level | Service | Duration |
|-------|---------|----------|
| Level 0.5 | Early intervention | As needed |
| Level 1 | Outpatient | Ongoing |
| Level 2.1 | Intensive outpatient | 9+ hours/week |
| Level 2.5 | Partial hospitalization | 20+ hours/week |
| Level 3.1 | Clinically managed low-intensity | 24-hour care |
| Level 3.5 | Clinically managed high-intensity | 24-hour care |
| Level 3.7 | Medically monitored intensive | 24-hour care |
| Level 4 | Medically managed intensive | Hospital |

#### 5.4.2 Medication-Assisted Treatment (MAT)

| Medication | Coverage | Authorization |
|------------|----------|---------------|
| Buprenorphine | 100% | None |
| Naltrexone | 100% | None |
| Methadone | 100% | Licensed clinic |
| Disulfiram | 100% | None |
| Acamprosate | 100% | None |

### 5.5 Crisis Services

#### 5.5.1 24/7 Crisis Line

```
Emergency Mental Health Hotline
📞 0 800 500 335 (Toll-Free)
📞 103 (Emergency Services)

Services Available:
├── Crisis intervention
├── Suicide prevention
├── Safety planning
├── Emergency dispatch
└── Warm handoff to care
```

#### 5.5.2 Mobile Crisis Teams

- Response within 1 hour in urban areas
- Response within 2 hours in rural areas
- De-escalation services
- Transport to appropriate level of care

### 5.6 Peer Support Services

| Service | Description | Coverage |
|---------|-------------|----------|
| Veteran peer specialists | Trained veteran counselors | 100% |
| Group peer support | Veteran support groups | 100% |
| Family peer support | Family member specialists | 100% |
| Wellness coaching | Health promotion | 100% |

---

## 6. Rehabilitation Programs

### 6.1 Physical Rehabilitation

#### 6.1.1 Covered Services

| Service | Coverage | Duration |
|---------|----------|----------|
| Physical therapy | 100% | Per care plan |
| Occupational therapy | 100% | Per care plan |
| Speech therapy | 100% | Per care plan |
| Cardiac rehabilitation | 100% | 36 sessions |
| Pulmonary rehabilitation | 100% | 36 sessions |

#### 6.1.2 Specialized Programs

| Program | Description | Eligibility |
|---------|-------------|-------------|
| **Polytrauma** | Multiple severe injuries | Combat injuries |
| **TBI** | Traumatic brain injury | Service-connected |
| **Spinal Cord** | Paralysis rehabilitation | Service-connected |
| **Amputee** | Limb loss rehabilitation | Service-connected |
| **Burn** | Burn injury recovery | Service-connected |

### 6.2 Prosthetics and Orthotics

#### 6.2.1 Coverage

| Item | Coverage | Replacement |
|------|----------|-------------|
| Prosthetic limbs | 100% | As needed |
| Advanced prosthetics | 100% | Medical necessity |
| Orthotics | 100% | Per prescription |
| Wheelchairs | 100% | Every 5 years |
| Motorized wheelchairs | 100% | Medical necessity |
| Hearing aids | 100% | Every 4 years |

#### 6.2.2 Advanced Prosthetics

| Type | Description | Authorization |
|------|-------------|---------------|
| Microprocessor knee | Advanced walking | Pre-authorization |
| Myoelectric arm | Muscle-controlled | Pre-authorization |
| Sports prosthetics | Athletic activities | Pre-authorization |
| Waterproof prosthetics | Water activities | Pre-authorization |

### 6.3 Vocational Rehabilitation

| Service | Description | Duration |
|---------|-------------|----------|
| Vocational assessment | Skills evaluation | Initial |
| Job training | Skills development | Up to 24 months |
| Job placement | Employment assistance | Until employed |
| Workplace modifications | Accommodations | As needed |
| Self-employment support | Business startup | Up to 24 months |

### 6.4 Recreational Therapy

| Program | Description | Coverage |
|---------|-------------|----------|
| Adaptive sports | Modified athletic activities | 100% |
| Art therapy | Creative expression | 100% |
| Music therapy | Musical intervention | 100% |
| Equine therapy | Horse-assisted therapy | 100% |
| Aquatic therapy | Water-based rehabilitation | 100% |

---

## 7. Disability Assessment and Services

### 7.1 Disability Determination Process

#### 7.1.1 Process Overview

```
Step 1: Application
├── Submit disability claim
├── Provide medical evidence
└── Service records review

Step 2: Medical Examination
├── Schedule C&P exam
├── Specialist evaluations
└── Functional assessments

Step 3: Rating Decision
├── MSEC review
├── Disability percentage
└── Effective date

Step 4: Notification
├── Written decision
├── Rating explanation
└── Appeal rights

Timeline: 90-120 days
```

#### 7.1.2 Medical-Social Expert Commission (MSEC)

| Component | Role |
|-----------|------|
| Medical specialists | Clinical evaluation |
| Social workers | Functional assessment |
| Vocational experts | Work capacity |
| Administrative staff | Documentation |

### 7.2 Disability Groups

#### 7.2.1 Group Definitions

| Group | Criteria | Benefits |
|-------|----------|----------|
| **Group I** | Complete loss of work capacity, needs constant care | Maximum pension, caregiver allowance, priority healthcare |
| **Group II** | Significant loss of work capacity, can work in adapted conditions | Enhanced pension, employment support, priority healthcare |
| **Group III** | Partial loss of work capacity, can work with restrictions | Standard disability pension, vocational rehabilitation |

#### 7.2.2 Combat-Related Designation

| Designation | Criteria | Additional Benefits |
|-------------|----------|---------------------|
| Combat injury | Direct combat wound | +50% pension bonus |
| Combat illness | Illness from combat conditions | +30% pension bonus |
| POW-related | Captivity-related condition | +50% pension bonus |

### 7.3 Disability Services

#### 7.3.1 Home Modifications

| Modification | Coverage | Maximum |
|--------------|----------|---------|
| Ramps and railings | 100% | ₴50,000 |
| Bathroom modifications | 100% | ₴100,000 |
| Doorway widening | 100% | ₴30,000 |
| Lift installation | 100% | ₴200,000 |
| Smart home technology | 100% | ₴50,000 |

#### 7.3.2 Personal Assistance

| Service | Hours/Month | Coverage |
|---------|-------------|----------|
| Group I | 160 hours | 100% |
| Group II | 80 hours | 100% |
| Group III | 40 hours | 100% (if needed) |

### 7.4 Reassessment Schedule

| Group | Review Frequency | Exemptions |
|-------|------------------|------------|
| Group I | Every 2 years | Permanent after age 60 |
| Group II | Every 2 years | Permanent after 10 years |
| Group III | Every year | Permanent after age 55 |

---

## 8. Prescription Drug Coverage

### 8.1 Formulary

#### 8.1.1 Formulary Tiers

| Tier | Description | Copayment |
|------|-------------|-----------|
| Tier 1 | Generic medications | ₴0 |
| Tier 2 | Preferred brand | ₴50 |
| Tier 3 | Non-preferred brand | ₴100 |
| Tier 4 | Specialty medications | ₴200 |
| Tier 5 | Non-formulary | 50% coinsurance |

#### 8.1.2 Combat Veteran Exemption

- All Tier 1-4 medications: ₴0 copayment
- Tier 5 medications: Prior authorization for coverage

### 8.2 Pharmacy Network

#### 8.2.1 Network Types

| Type | Description | Availability |
|------|-------------|--------------|
| Military pharmacies | On-base facilities | Full formulary |
| Network pharmacies | Contracted civilian | Standard formulary |
| Mail-order | 90-day supply | Maintenance meds |
| Specialty pharmacies | Complex medications | As designated |

#### 8.2.2 Fill Limits

| Supply | Copayment Applies | Where |
|--------|-------------------|-------|
| 30-day | 1x | Retail pharmacy |
| 90-day | 1x | Mail-order/military |
| 90-day | 3x | Retail pharmacy |

### 8.3 Prior Authorization

#### 8.3.1 Medications Requiring Authorization

| Category | Examples | Review Time |
|----------|----------|-------------|
| Specialty drugs | Biologics, cancer drugs | 5 days |
| High-cost generics | Certain generics >₴1000 | 3 days |
| Quantity limits | Controlled substances | 3 days |
| Step therapy | After first-line failure | 3 days |

#### 8.3.2 Exception Process

```
1. Provider submits exception request
2. Clinical review within 72 hours
3. Peer-to-peer review if needed
4. Decision notification
5. Appeal rights if denied
```

### 8.4 Medication Therapy Management

| Service | Description | Eligibility |
|---------|-------------|-------------|
| Comprehensive medication review | Full medication analysis | 5+ medications |
| Targeted review | Specific drug issues | Referral |
| Pharmacist consultation | Drug questions | All beneficiaries |
| Adherence monitoring | Compliance tracking | Chronic conditions |

---

## 9. Provider Network

### 9.1 Network Structure

#### 9.1.1 Provider Types

| Type | Description | Access |
|------|-------------|--------|
| Military Treatment Facilities (MTF) | Military hospitals/clinics | Priority |
| Network Providers | Contracted civilian | Standard |
| Non-Network Providers | Non-contracted | Emergency only |

#### 9.1.2 Network Size

| Region | MTFs | Network Providers |
|--------|------|-------------------|
| Kyiv Region | 5 | 2,500+ |
| Western Ukraine | 8 | 3,000+ |
| Central Ukraine | 6 | 2,000+ |
| Southern Ukraine | 4 | 1,500+ |
| Eastern Ukraine | 3 | 1,000+ |

### 9.2 Provider Credentialing

#### 9.2.1 Requirements

| Credential | Verification |
|------------|--------------|
| Medical license | Ministry of Health registry |
| Board certification | Specialty boards |
| Malpractice history | National database |
| Background check | Security services |
| Facility accreditation | JCI or equivalent |

#### 9.2.2 Ongoing Monitoring

- Quarterly quality metrics review
- Annual recredentialing
- Patient satisfaction tracking
- Complaint investigation

### 9.3 Access Standards

| Service Type | Access Standard |
|--------------|-----------------|
| Primary care routine | Within 7 days |
| Primary care urgent | Within 24 hours |
| Specialty care routine | Within 14 days |
| Specialty care urgent | Within 3 days |
| Mental health routine | Within 7 days |
| Mental health urgent | Within 24 hours |
| Emergency | Immediate |

---

## 10. Telemedicine Services

### 10.1 Covered Services

| Service | Platform | Copayment |
|---------|----------|-----------|
| Primary care visits | Video/phone | ₴0 |
| Mental health | Video | ₴0 |
| Specialty consults | Video | ₴0 |
| Follow-up visits | Video/phone | ₴0 |
| Medication management | Video/phone | ₴0 |
| Nutrition counseling | Video | ₴0 |

### 10.2 Technology Requirements

| Requirement | Specification |
|-------------|---------------|
| Internet speed | 1.5 Mbps minimum |
| Device | Smartphone, tablet, or computer |
| Camera | Required for video visits |
| Microphone | Required |
| Application | IVYAR Medical App |

### 10.3 Telemedicine Prescribing

| Medication Type | Telemedicine Prescribing |
|-----------------|-------------------------|
| Non-controlled | Allowed |
| Schedule V | Allowed with established relationship |
| Schedule III-IV | Limited, state dependent |
| Schedule II | Not allowed |

---

## 11. Emergency Services

### 11.1 Emergency Definition

**Emergency medical condition**: A condition manifesting acute symptoms of sufficient severity (including severe pain) such that a prudent layperson could reasonably expect absence of immediate medical attention to result in:
- Placing health in serious jeopardy
- Serious impairment of bodily functions
- Serious dysfunction of any bodily organ or part

### 11.2 Emergency Coverage

| Scenario | Coverage | Authorization |
|----------|----------|---------------|
| Life-threatening | 100% | None |
| Urgent care | 100% | None |
| After-hours urgent | 100% | None |
| Ambulance transport | 100% | None |
| Air ambulance | 100% | Retrospective review |

### 11.3 Post-Emergency Care

```
Within 24 hours:
├── Notify Medical Program
├── Transfer to network facility if stable
└── Arrange follow-up care

Within 48 hours:
├── Submit claim documentation
├── Medical records request
└── Care coordination initiated
```

---

## 12. Preventive Care

### 12.1 Covered Preventive Services

#### 12.1.1 Adults

| Service | Frequency | Age |
|---------|-----------|-----|
| Annual physical | Yearly | All |
| Blood pressure screening | Yearly | All |
| Cholesterol screening | Every 5 years | 35+ |
| Diabetes screening | Every 3 years | 45+ |
| Colorectal cancer screening | Per guidelines | 45-75 |
| Prostate cancer screening | Per guidelines | 50+ |
| Lung cancer screening | Yearly | High-risk |
| Hepatitis C screening | Once | All |
| HIV screening | Per guidelines | All |
| Immunizations | Per schedule | All |

#### 12.1.2 Women's Health

| Service | Frequency | Age |
|---------|-----------|-----|
| Mammogram | Every 2 years | 50-74 |
| Cervical cancer screening | Every 3 years | 21-65 |
| Bone density screening | Per guidelines | 65+ |
| Prenatal care | As scheduled | Pregnant |

### 12.2 Health Promotion Programs

| Program | Description | Cost |
|---------|-------------|------|
| Smoking cessation | Counseling + medications | ₴0 |
| Weight management | Nutrition + exercise | ₴0 |
| Diabetes prevention | Lifestyle intervention | ₴0 |
| Stress management | Coping skills | ₴0 |
| Sleep improvement | Sleep hygiene | ₴0 |

---

## 13. Claims and Billing

### 13.1 Claims Submission

#### 13.1.1 Provider Claims

| Submission | Timeline | Method |
|------------|----------|--------|
| Electronic | Within 30 days | EDI portal |
| Paper | Within 30 days | Mail |
| Corrected claims | Within 90 days | EDI/Mail |

#### 13.1.2 Beneficiary Claims

| Scenario | Process | Timeline |
|----------|---------|----------|
| Out-of-network | Submit receipts | 60 days |
| Emergency | Submit records | 90 days |
| Foreign care | Submit translated | 180 days |

### 13.2 Claims Processing

```
Timeline:
├── Receipt confirmation: 5 days
├── Initial processing: 15 days
├── Payment/denial: 30 days
├── Appeal period: 60 days
└── Appeal resolution: 30 days
```

### 13.3 Payment Methods

| Method | Timeline | Notes |
|--------|----------|-------|
| Direct deposit | 5-7 days | Preferred |
| Check | 10-14 days | Standard |
| Provider direct | 30 days | Network providers |

---

## 14. Cost Sharing

### 14.1 Cost Sharing by Category

| Category | Annual Deductible | Copayment | Max OOP |
|----------|-------------------|-----------|---------|
| Category A | ₴0 | ₴0 | ₴0 |
| Category B | ₴500 | ₴50 | ₴2,500 |
| Category C | ₴1,000 | ₴100 | ₴5,000 |
| Category D | ₴2,000 | ₴200 | ₴10,000 |

### 14.2 Services Without Cost Sharing

All categories receive the following without cost sharing:
- Preventive care services
- Mental health services
- Substance abuse treatment
- Combat-related care
- Emergency services

### 14.3 Financial Hardship

| Income Level | Benefit |
|--------------|---------|
| Below 200% poverty | Full cost sharing waiver |
| 200-300% poverty | 50% cost sharing reduction |
| 300-400% poverty | 25% cost sharing reduction |

---

## 15. Prior Authorization

### 15.1 Services Requiring Authorization

| Category | Services |
|----------|----------|
| Inpatient | All planned admissions |
| Surgical | All non-emergency surgery |
| Imaging | CT, MRI, PET scans |
| DME | Wheelchairs, prosthetics |
| Specialty drugs | Biologics, high-cost medications |
| Rehabilitation | Beyond initial evaluation |
| Behavioral health | Residential treatment |

### 15.2 Authorization Process

```
Standard Request:
├── Submit: Provider
├── Review: 5 business days
├── Decision: Approve/Modify/Deny
└── Notification: Provider and beneficiary

Urgent Request:
├── Submit: Provider
├── Review: 24 hours
├── Decision: Approve/Modify/Deny
└── Notification: Immediate
```

### 15.3 Authorization Validity

| Service Type | Validity Period |
|--------------|-----------------|
| Outpatient procedure | 60 days |
| Inpatient admission | 30 days |
| Ongoing treatment | 6 months |
| DME | 12 months |
| Specialty medications | 12 months |

---

## 16. Appeals and Grievances

### 16.1 Appeal Process

#### 16.1.1 Internal Appeals

| Level | Timeline | Review By |
|-------|----------|-----------|
| Level 1 | 30 days | Clinical reviewer |
| Level 2 | 30 days | Medical director |
| Level 3 | 45 days | External review |

#### 16.1.2 Appeal Rights

- Written explanation of denial
- 60 days to file appeal
- Right to representation
- Access to relevant documents
- Expedited review for urgent matters

### 16.2 Grievance Process

| Issue Type | Timeline | Resolution |
|------------|----------|------------|
| Quality of care | 30 days | Clinical review |
| Access issues | 15 days | Administrative review |
| Billing disputes | 30 days | Financial review |
| Customer service | 15 days | Service recovery |

### 16.3 External Review

#### 16.3.1 Eligibility

- Exhausted internal appeals
- Medical necessity disputes
- Coverage determinations
- Experimental treatments

#### 16.3.2 Process

```
1. Request external review (within 4 months of final internal decision)
2. Case sent to independent review organization
3. Review within 45 days (72 hours if urgent)
4. Decision is binding on the program
5. Beneficiary retains legal rights
```

---

## 17. Privacy and Data Protection

### 17.1 Data Protection Framework

#### 17.1.1 Legal Basis

| Regulation | Scope |
|------------|-------|
| Law of Ukraine "On Personal Data Protection" | All personal data |
| GDPR (as applicable) | EU-related data |
| HIPAA-equivalent standards | Health information |

### 17.2 Protected Health Information

#### 17.2.1 Categories

| Category | Examples | Protection Level |
|----------|----------|------------------|
| Identifying | Name, ID number | High |
| Medical | Diagnoses, treatments | Highest |
| Financial | Billing, claims | High |
| Genetic | DNA, family history | Highest |
| Mental health | Therapy notes | Highest |
| Substance abuse | Treatment records | Highest |

### 17.3 Beneficiary Rights

| Right | Description |
|-------|-------------|
| Access | View and copy records |
| Amendment | Request corrections |
| Accounting | Know who accessed records |
| Restriction | Limit certain disclosures |
| Confidential communication | Receive info privately |
| Complaint | Report privacy violations |

### 17.4 Security Measures

| Measure | Implementation |
|---------|----------------|
| Encryption | AES-256 for data at rest and in transit |
| Access control | Role-based, minimum necessary |
| Audit logging | All access recorded |
| Training | Annual staff training |
| Incident response | 72-hour breach notification |

---

## 18. Integration with Pension and Insurance

### 18.1 Pension Fund Integration

#### 18.1.1 Disability Coordination

| Scenario | Coordination |
|----------|--------------|
| New disability claim | Medical records shared |
| Disability review | MSEC exam scheduled |
| Pension calculation | Service records verified |
| Benefits update | Real-time sync |

#### 18.1.2 Data Exchange

```
Medical Program → Pension Fund:
├── Disability determinations
├── Medical evidence
├── Treatment history
└── Functional assessments

Pension Fund → Medical Program:
├── Service history
├── Combat designation
├── Pension status
└── Benefit eligibility
```

### 18.2 Insurance Integration

#### 18.2.1 Coverage Coordination

| Insurance Type | Medical Program Role |
|----------------|---------------------|
| Life insurance | Medical underwriting support |
| Health insurance | Supplemental coverage coordination |
| Disability insurance | Benefit coordination |

#### 18.2.2 Premium Deduction

- Medical-related insurance premiums can be deducted from pension
- Maximum 10% of pension for combined deductions
- Automatic enrollment options available

### 18.3 Unified Benefits Statement

| Section | Content |
|---------|---------|
| Pension benefits | Monthly amount, deductions |
| Medical coverage | Services used, remaining benefits |
| Insurance coverage | Policies, premiums, claims |
| Disability status | Group, review date |
| Total benefits | Combined value summary |

---

## 19. Quality Assurance

### 19.1 Quality Metrics

#### 19.1.1 Clinical Quality

| Metric | Target | Measurement |
|--------|--------|-------------|
| Preventive care compliance | 85% | Annual |
| Chronic disease control | 75% | Quarterly |
| Hospital readmission rate | <10% | Monthly |
| Patient safety incidents | <1% | Monthly |
| Medication adherence | 80% | Quarterly |

#### 19.1.2 Access Quality

| Metric | Target | Measurement |
|--------|--------|-------------|
| Appointment availability | 90% within standard | Weekly |
| Wait time | <15 minutes | Per visit |
| After-hours access | 100% | Continuous |
| Telemedicine availability | 95% | Daily |

### 19.2 Patient Satisfaction

| Survey | Frequency | Target |
|--------|-----------|--------|
| Visit satisfaction | Per visit | 4.5/5.0 |
| Annual satisfaction | Yearly | 85% satisfied |
| Net Promoter Score | Quarterly | >50 |

### 19.3 Continuous Improvement

```
Quality Improvement Cycle:
├── Measure: Collect data
├── Analyze: Identify gaps
├── Plan: Develop interventions
├── Implement: Execute changes
└── Evaluate: Assess impact
```

---

## 20. Compliance and Enforcement

### 20.1 Regulatory Compliance

| Area | Requirements |
|------|--------------|
| Licensing | All providers properly licensed |
| Accreditation | Facilities accredited |
| Reporting | Required government reports |
| Audits | Annual external audit |

### 20.2 Fraud and Abuse Prevention

#### 20.2.1 Prevention Measures

| Measure | Description |
|---------|-------------|
| Pre-payment review | High-risk claims reviewed |
| Post-payment audit | Random sampling |
| Data analytics | Pattern detection |
| Hotline | Anonymous reporting |

#### 20.2.2 Enforcement Actions

| Violation | Action |
|-----------|--------|
| Minor | Warning, education |
| Moderate | Repayment, monitoring |
| Severe | Suspension, termination |
| Criminal | Law enforcement referral |

### 20.3 Beneficiary Responsibilities

| Responsibility | Requirement |
|----------------|-------------|
| Accurate information | Truthful eligibility claims |
| ID protection | Safeguard beneficiary ID |
| Appropriate use | Use services appropriately |
| Reporting | Report suspected fraud |
| Cooperation | Cooperate with audits |

---

## Appendices

### Appendix A: Contact Information

| Service | Contact |
|---------|---------|
| Member Services | 0 800 123 4567 |
| Crisis Line | 0 800 500 335 |
| Appointments | 0 800 123 4568 |
| Pharmacy | 0 800 123 4569 |
| Claims | 0 800 123 4570 |
| Appeals | 0 800 123 4571 |
| Fraud Hotline | 0 800 123 4572 |

### Appendix B: Forms

| Form | Purpose |
|------|---------|
| MED-001 | Enrollment application |
| MED-002 | Dependent enrollment |
| MED-003 | Provider change |
| MED-004 | Prior authorization |
| MED-005 | Appeal request |
| MED-006 | Grievance form |
| MED-007 | Claims submission |
| MED-008 | Disability assessment |

### Appendix C: Glossary

*See Section 2: Definitions*

### Appendix D: Network Provider Directory

*Available online at: medical.ivyar.gov.ua/providers*

### Appendix E: Formulary

*Available online at: medical.ivyar.gov.ua/formulary*

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Jan 2025 | Medical Services Division | Initial release |

---

**MINISTRY OF DEFENSE OF UKRAINE**  
**Medical Services Division**

*This policy is subject to change. Current version available at medical.ivyar.gov.ua/policy*

---
ENDFILE

echo "  ✅ Medical Program Policy created"

# ============================================================================
# MODELS - CORRECTED TYPES
# ============================================================================

cat > medical-program/models/types.ts << 'ENDFILE'
/**
 * Medical Program - Type Definitions
 * IVYAR Governance Platform
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum BeneficiaryCategory {
  CATEGORY_A = 'category_a', // Combat veterans, disabled - no cost sharing
  CATEGORY_B = 'category_b', // Veterans, pensioners - minimal cost sharing
  CATEGORY_C = 'category_c', // Dependents - standard cost sharing
  CATEGORY_D = 'category_d', // Extended family - full cost sharing
}

export enum ServiceType {
  PRIMARY_CARE = 'primary_care',
  SPECIALTY_CARE = 'specialty_care',
  EMERGENCY = 'emergency',
  MENTAL_HEALTH = 'mental_health',
  REHABILITATION = 'rehabilitation',
  PREVENTIVE = 'preventive',
  PHARMACY = 'pharmacy',
  DENTAL = 'dental',
  VISION = 'vision',
  HEARING = 'hearing',
  TELEMEDICINE = 'telemedicine',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum AppointmentType {
  IN_PERSON = 'in_person',
  TELEMEDICINE = 'telemedicine',
  HOME_VISIT = 'home_visit',
}

export enum PrescriptionStatus {
  ACTIVE = 'active',
  REFILL_NEEDED = 'refill_needed',
  EXPIRED = 'expired',
  DISCONTINUED = 'discontinued',
  ON_HOLD = 'on_hold',
}

export enum FormularyTier {
  TIER_1 = 'tier_1', // Generic - ₴0
  TIER_2 = 'tier_2', // Preferred brand - ₴50
  TIER_3 = 'tier_3', // Non-preferred - ₴100
  TIER_4 = 'tier_4', // Specialty - ₴200
  TIER_5 = 'tier_5', // Non-formulary - 50%
}

export enum ClaimStatus {
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  PARTIALLY_APPROVED = 'partially_approved',
  DENIED = 'denied',
  PAID = 'paid',
  APPEALED = 'appealed',
}

export enum AuthorizationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  APPROVED_MODIFIED = 'approved_modified',
  DENIED = 'denied',
  EXPIRED = 'expired',
}

export enum DisabilityGroup {
  GROUP_I = 'group_i',   // 100% incapacity
  GROUP_II = 'group_ii', // 75-99% incapacity
  GROUP_III = 'group_iii', // 50-74% incapacity
}

export enum ProgramType {
  PTSD = 'ptsd',
  SUBSTANCE_USE = 'substance_use',
  PHYSICAL_REHAB = 'physical_rehab',
  VOCATIONAL = 'vocational',
  WELLNESS = 'wellness',
  CAREGIVER = 'caregiver',
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface Patient {
  id: string;
  personal_id: string;
  military_id?: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  patronymic?: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  
  // Contact
  phone: string;
  email?: string;
  address: Address;
  
  // Military/Veteran Status
  service_status: 'active' | 'veteran' | 'reserve' | 'pensioner';
  combat_veteran: boolean;
  service_start_date?: string;
  service_end_date?: string;
  
  // Beneficiary Information
  beneficiary_category: BeneficiaryCategory;
  enrollment_date: string;
  pcp_id?: string; // Primary Care Provider
  
  // Disability
  disability_group?: DisabilityGroup;
  disability_combat_related?: boolean;
  
  // Emergency Contact
  emergency_contact: EmergencyContact;
  
  // Integration IDs
  pension_id?: string;
  insurance_id?: string;
  
  status: 'active' | 'suspended' | 'disenrolled';
  created_at: string;
  updated_at: string;
}

export interface Address {
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  apartment?: string;
  postal_code: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternate_phone?: string;
}

export interface Provider {
  id: string;
  npi: string; // National Provider Identifier
  
  // Personal
  first_name: string;
  last_name: string;
  credentials: string[]; // MD, PhD, etc.
  
  // Specialty
  specialty: string;
  subspecialties?: string[];
  
  // Facility
  facility_id: string;
  facility_name: string;
  
  // Contact
  phone: string;
  email: string;
  
  // Availability
  accepting_patients: boolean;
  telemedicine_available: boolean;
  
  // Quality
  rating: number;
  review_count: number;
  
  // Network
  network_status: 'military' | 'network' | 'non_network';
  
  languages: string[];
  
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  provider_id: string;
  facility_id: string;
  
  // Scheduling
  service_type: ServiceType;
  appointment_type: AppointmentType;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  
  // Status
  status: AppointmentStatus;
  confirmed_at?: string;
  checked_in_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  
  // Clinical
  reason_for_visit: string;
  notes?: string;
  referral_id?: string;
  
  // Authorization
  authorization_id?: string;
  authorization_required: boolean;
  
  // Telemedicine
  video_link?: string;
  
  // Reminders
  reminder_sent: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  
  // Record Type
  record_type: 'visit' | 'lab' | 'imaging' | 'procedure' | 'diagnosis' | 'immunization';
  
  // Clinical Data
  date: string;
  provider_id: string;
  facility_id: string;
  
  // Content
  title: string;
  description: string;
  findings?: string;
  
  // Diagnosis
  diagnoses?: Diagnosis[];
  
  // Results
  results?: LabResult[];
  
  // Attachments
  attachments?: Attachment[];
  
  // Status
  status: 'preliminary' | 'final' | 'amended' | 'cancelled';
  
  created_at: string;
  updated_at: string;
}

export interface Diagnosis {
  code: string; // ICD-10
  description: string;
  type: 'primary' | 'secondary';
  onset_date?: string;
  status: 'active' | 'resolved' | 'chronic';
}

export interface LabResult {
  test_name: string;
  value: string;
  unit: string;
  reference_range: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  notes?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  provider_id: string;
  pharmacy_id?: string;
  
  // Medication
  medication_name: string;
  generic_name?: string;
  dosage: string;
  form: string; // tablet, capsule, liquid, etc.
  
  // Instructions
  instructions: string;
  quantity: number;
  days_supply: number;
  refills_authorized: number;
  refills_remaining: number;
  
  // Dates
  prescribed_date: string;
  expiration_date: string;
  last_filled_date?: string;
  next_refill_date?: string;
  
  // Formulary
  formulary_tier: FormularyTier;
  prior_authorization_required: boolean;
  authorization_id?: string;
  
  // Cost
  copayment: number;
  
  // Status
  status: PrescriptionStatus;
  
  // Notes
  notes?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  patient_id: string;
  provider_id: string;
  
  // Service
  service_date: string;
  service_type: ServiceType;
  
  // Billing
  billed_amount: number;
  allowed_amount: number;
  paid_amount: number;
  patient_responsibility: number;
  
  // Codes
  procedure_codes: string[];
  diagnosis_codes: string[];
  
  // Status
  status: ClaimStatus;
  submitted_date: string;
  processed_date?: string;
  paid_date?: string;
  
  // Denial
  denial_reason?: string;
  appeal_deadline?: string;
  
  // EOB
  explanation_of_benefits?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Authorization {
  id: string;
  patient_id: string;
  provider_id: string;
  
  // Service
  service_type: ServiceType;
  service_description: string;
  
  // Request
  requested_date: string;
  urgency: 'standard' | 'urgent';
  
  // Clinical
  diagnosis_codes: string[];
  clinical_notes: string;
  
  // Decision
  status: AuthorizationStatus;
  decision_date?: string;
  approved_units?: number;
  valid_from?: string;
  valid_to?: string;
  
  // Denial
  denial_reason?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  name: string;
  type: ProgramType;
  description: string;
  
  // Eligibility
  eligibility_criteria: string[];
  
  // Details
  duration_weeks?: number;
  sessions_per_week?: number;
  
  // Location
  facility_id?: string;
  virtual_available: boolean;
  
  // Enrollment
  max_participants?: number;
  current_participants: number;
  waitlist_count: number;
  
  // Status
  active: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface ProgramEnrollment {
  id: string;
  patient_id: string;
  program_id: string;
  
  // Dates
  enrolled_date: string;
  start_date?: string;
  expected_end_date?: string;
  actual_end_date?: string;
  
  // Progress
  sessions_completed: number;
  sessions_total: number;
  progress_percentage: number;
  
  // Status
  status: 'pending' | 'active' | 'completed' | 'withdrawn' | 'waitlist';
  
  // Outcome
  outcome?: string;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// COST SHARING
// ============================================================================

export interface CostSharingSchedule {
  category: BeneficiaryCategory;
  annual_deductible: number;
  copayment_primary: number;
  copayment_specialty: number;
  copayment_emergency: number;
  coinsurance_percentage: number;
  out_of_pocket_maximum: number;
}

export const COST_SHARING: Record<BeneficiaryCategory, CostSharingSchedule> = {
  [BeneficiaryCategory.CATEGORY_A]: {
    category: BeneficiaryCategory.CATEGORY_A,
    annual_deductible: 0,
    copayment_primary: 0,
    copayment_specialty: 0,
    copayment_emergency: 0,
    coinsurance_percentage: 0,
    out_of_pocket_maximum: 0,
  },
  [BeneficiaryCategory.CATEGORY_B]: {
    category: BeneficiaryCategory.CATEGORY_B,
    annual_deductible: 500,
    copayment_primary: 50,
    copayment_specialty: 100,
    copayment_emergency: 0,
    coinsurance_percentage: 10,
    out_of_pocket_maximum: 2500,
  },
  [BeneficiaryCategory.CATEGORY_C]: {
    category: BeneficiaryCategory.CATEGORY_C,
    annual_deductible: 1000,
    copayment_primary: 100,
    copayment_specialty: 150,
    copayment_emergency: 0,
    coinsurance_percentage: 20,
    out_of_pocket_maximum: 5000,
  },
  [BeneficiaryCategory.CATEGORY_D]: {
    category: BeneficiaryCategory.CATEGORY_D,
    annual_deductible: 2000,
    copayment_primary: 200,
    copayment_specialty: 300,
    copayment_emergency: 100,
    coinsurance_percentage: 30,
    out_of_pocket_maximum: 10000,
  },
};

// ============================================================================
// FORMULARY COPAYMENTS
// ============================================================================

export const FORMULARY_COPAYMENTS: Record<FormularyTier, number> = {
  [FormularyTier.TIER_1]: 0,    // Generic
  [FormularyTier.TIER_2]: 50,   // Preferred brand
  [FormularyTier.TIER_3]: 100,  // Non-preferred
  [FormularyTier.TIER_4]: 200,  // Specialty
  [FormularyTier.TIER_5]: -1,   // 50% coinsurance (calculated)
};
ENDFILE

echo "  ✅ Models created"

# ============================================================================
# SERVICES
# ============================================================================

cat > medical-program/services/appointment-service.ts << 'ENDFILE'
/**
 * Appointment Service
 * Handles scheduling, confirmation, and management
 */

import {
  Appointment,
  AppointmentStatus,
  AppointmentType,
  ServiceType,
  Patient,
  Provider,
} from '../models/types';

export interface ScheduleRequest {
  patient_id: string;
  provider_id?: string;
  service_type: ServiceType;
  appointment_type: AppointmentType;
  preferred_date: string;
  preferred_time?: string;
  reason_for_visit: string;
  urgent: boolean;
}

export interface AvailableSlot {
  date: string;
  time: string;
  provider_id: string;
  provider_name: string;
  facility_name: string;
  appointment_type: AppointmentType;
}

export class AppointmentService {
  /**
   * Get available appointment slots
   */
  async getAvailableSlots(
    serviceType: ServiceType,
    startDate: string,
    endDate: string,
    providerId?: string
  ): Promise<AvailableSlot[]> {
    // In production, query scheduling system
    // Mock implementation
    const slots: AvailableSlot[] = [];
    const providers = providerId ? [providerId] : ['PROV-001', 'PROV-002'];
    
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        for (const provId of providers) {
          const times = ['09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00'];
          for (const time of times) {
            slots.push({
              date: currentDate.toISOString().split('T')[0],
              time,
              provider_id: provId,
              provider_name: provId === 'PROV-001' ? 'Dr. Koval' : 'Dr. Shevchenko',
              facility_name: 'Military Clinic A',
              appointment_type: AppointmentType.IN_PERSON,
            });
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return slots;
  }

  /**
   * Schedule new appointment
   */
  async scheduleAppointment(request: ScheduleRequest): Promise<Appointment> {
    // Validate patient eligibility
    const isEligible = await this.validateEligibility(request.patient_id);
    if (!isEligible) {
      throw new Error('Patient not eligible for services');
    }

    // Check authorization if required
    const authRequired = this.isAuthorizationRequired(request.service_type);
    let authId: string | undefined;
    
    if (authRequired && !request.urgent) {
      // In production, check existing authorization or create request
      authId = undefined;
    }

    // Create appointment
    const appointment: Appointment = {
      id: this.generateId(),
      patient_id: request.patient_id,
      provider_id: request.provider_id || 'PROV-001',
      facility_id: 'FAC-001',
      service_type: request.service_type,
      appointment_type: request.appointment_type,
      scheduled_date: request.preferred_date,
      scheduled_time: request.preferred_time || '09:00',
      duration_minutes: this.getDefaultDuration(request.service_type),
      status: AppointmentStatus.SCHEDULED,
      reason_for_visit: request.reason_for_visit,
      authorization_required: authRequired,
      authorization_id: authId,
      reminder_sent: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Schedule reminders
    await this.scheduleReminders(appointment);

    return appointment;
  }

  /**
   * Confirm appointment
   */
  async confirmAppointment(appointmentId: string): Promise<Appointment> {
    // In production, update database
    return {
      id: appointmentId,
      status: AppointmentStatus.CONFIRMED,
      confirmed_at: new Date().toISOString(),
    } as Appointment;
  }

  /**
   * Cancel appointment
   */
  async cancelAppointment(
    appointmentId: string,
    reason: string
  ): Promise<Appointment> {
    return {
      id: appointmentId,
      status: AppointmentStatus.CANCELLED,
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
    } as Appointment;
  }

  /**
   * Reschedule appointment
   */
  async rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> {
    // Cancel old appointment
    await this.cancelAppointment(appointmentId, 'Rescheduled');
    
    // Create new appointment with same details
    // In production, copy details from original
    return {
      id: this.generateId(),
      scheduled_date: newDate,
      scheduled_time: newTime,
      status: AppointmentStatus.SCHEDULED,
    } as Appointment;
  }

  /**
   * Check in patient
   */
  async checkIn(appointmentId: string): Promise<Appointment> {
    return {
      id: appointmentId,
      status: AppointmentStatus.CHECKED_IN,
      checked_in_at: new Date().toISOString(),
    } as Appointment;
  }

  // Private methods

  private async validateEligibility(patientId: string): Promise<boolean> {
    // In production, check enrollment status
    return true;
  }

  private isAuthorizationRequired(serviceType: ServiceType): boolean {
    const requiresAuth = [
      ServiceType.SPECIALTY_CARE,
      ServiceType.REHABILITATION,
    ];
    return requiresAuth.includes(serviceType);
  }

  private getDefaultDuration(serviceType: ServiceType): number {
    const durations: Record<ServiceType, number> = {
      [ServiceType.PRIMARY_CARE]: 30,
      [ServiceType.SPECIALTY_CARE]: 45,
      [ServiceType.EMERGENCY]: 60,
      [ServiceType.MENTAL_HEALTH]: 60,
      [ServiceType.REHABILITATION]: 60,
      [ServiceType.PREVENTIVE]: 30,
      [ServiceType.PHARMACY]: 15,
      [ServiceType.DENTAL]: 45,
      [ServiceType.VISION]: 30,
      [ServiceType.HEARING]: 30,
      [ServiceType.TELEMEDICINE]: 20,
    };
    return durations[serviceType] || 30;
  }

  private async scheduleReminders(appointment: Appointment): Promise<void> {
    // In production, schedule SMS/email reminders
    // 24 hours before
    // 2 hours before
  }

  private generateId(): string {
    return `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default AppointmentService;
ENDFILE

cat > medical-program/services/prescription-service.ts << 'ENDFILE'
/**
 * Prescription Service
 * Handles medication management and refills
 */

import {
  Prescription,
  PrescriptionStatus,
  FormularyTier,
  Patient,
  BeneficiaryCategory,
  FORMULARY_COPAYMENTS,
} from '../models/types';

export interface RefillRequest {
  prescription_id: string;
  patient_id: string;
  pharmacy_id?: string;
}

export interface RefillResult {
  success: boolean;
  prescription?: Prescription;
  error?: string;
  estimated_pickup?: string;
}

export class PrescriptionService {
  /**
   * Get patient's active prescriptions
   */
  async getActivePrescriptions(patientId: string): Promise<Prescription[]> {
    // In production, query database
    return [];
  }

  /**
   * Request prescription refill
   */
  async requestRefill(request: RefillRequest): Promise<RefillResult> {
    // Validate prescription
    const prescription = await this.getPrescription(request.prescription_id);
    
    if (!prescription) {
      return { success: false, error: 'Prescription not found' };
    }

    // Check refills remaining
    if (prescription.refills_remaining <= 0) {
      return { 
        success: false, 
        error: 'No refills remaining. Contact your provider for renewal.' 
      };
    }

    // Check if expired
    if (new Date(prescription.expiration_date) < new Date()) {
      return { 
        success: false, 
        error: 'Prescription has expired. Contact your provider for renewal.' 
      };
    }

    // Check prior authorization if required
    if (prescription.prior_authorization_required && !prescription.authorization_id) {
      return { 
        success: false, 
        error: 'Prior authorization required for this medication.' 
      };
    }

    // Process refill
    const updatedPrescription: Prescription = {
      ...prescription,
      refills_remaining: prescription.refills_remaining - 1,
      last_filled_date: new Date().toISOString(),
      next_refill_date: this.calculateNextRefillDate(prescription.days_supply),
      status: PrescriptionStatus.ACTIVE,
    };

    // Calculate pickup time
    const estimatedPickup = this.calculatePickupTime();

    return {
      success: true,
      prescription: updatedPrescription,
      estimated_pickup: estimatedPickup,
    };
  }

  /**
   * Calculate copayment for prescription
   */
  calculateCopayment(
    tier: FormularyTier,
    category: BeneficiaryCategory,
    totalCost?: number
  ): number {
    // Category A (combat veterans, disabled) - no copayment
    if (category === BeneficiaryCategory.CATEGORY_A) {
      return 0;
    }

    // Get tier copayment
    const copayment = FORMULARY_COPAYMENTS[tier];

    // Tier 5 is percentage-based
    if (tier === FormularyTier.TIER_5 && totalCost) {
      return Math.round(totalCost * 0.5); // 50% coinsurance
    }

    return copayment;
  }

  /**
   * Check drug interactions
   */
  async checkInteractions(
    patientId: string,
    newMedicationId: string
  ): Promise<{ hasInteraction: boolean; interactions: string[] }> {
    // In production, check against patient's current medications
    return { hasInteraction: false, interactions: [] };
  }

  /**
   * Get medication alternatives (generics, preferred)
   */
  async getAlternatives(medicationId: string): Promise<Array<{
    name: string;
    tier: FormularyTier;
    copayment: number;
  }>> {
    // In production, query formulary database
    return [];
  }

  // Private methods

  private async getPrescription(id: string): Promise<Prescription | null> {
    // In production, query database
    return null;
  }

  private calculateNextRefillDate(daysSupply: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysSupply - 5); // 5 days early
    return date.toISOString();
  }

  private calculatePickupTime(): string {
    const date = new Date();
    date.setHours(date.getHours() + 2); // 2 hours from now
    return date.toISOString();
  }
}

export default PrescriptionService;
ENDFILE

echo "  ✅ Services created"

# ============================================================================
# INTEGRATION
# ============================================================================

cat > medical-program/integration/pension-medical-bridge.ts << 'ENDFILE'
/**
 * Pension-Medical Integration Bridge
 * Coordinates disability status, benefits, and coverage
 */

import { Patient, DisabilityGroup, BeneficiaryCategory } from '../models/types';

export interface PensionData {
  pensioner_id: string;
  pension_type: string;
  disability_group?: DisabilityGroup;
  combat_related: boolean;
  pension_amount: number;
}

export interface MedicalBenefits {
  category: BeneficiaryCategory;
  cost_sharing_waived: boolean;
  priority_access: boolean;
  caregiver_allowance: boolean;
  home_modification_eligible: boolean;
}

export class PensionMedicalBridge {
  private pensionApiEndpoint: string;

  constructor(endpoint: string = '/api/pension/v1') {
    this.pensionApiEndpoint = endpoint;
  }

  /**
   * Get patient's pension data
   */
  async getPensionData(patientId: string): Promise<PensionData | null> {
    // In production, call Pension Fund API
    return {
      pensioner_id: patientId,
      pension_type: 'military',
      disability_group: DisabilityGroup.GROUP_II,
      combat_related: true,
      pension_amount: 45000,
    };
  }

  /**
   * Determine medical benefits based on pension status
   */
  async determineMedicalBenefits(patientId: string): Promise<MedicalBenefits> {
    const pensionData = await this.getPensionData(patientId);

    if (!pensionData) {
      return {
        category: BeneficiaryCategory.CATEGORY_D,
        cost_sharing_waived: false,
        priority_access: false,
        caregiver_allowance: false,
        home_modification_eligible: false,
      };
    }

    // Combat veterans and disabled get Category A
    if (pensionData.combat_related || pensionData.disability_group) {
      return {
        category: BeneficiaryCategory.CATEGORY_A,
        cost_sharing_waived: true,
        priority_access: true,
        caregiver_allowance: pensionData.disability_group === DisabilityGroup.GROUP_I,
        home_modification_eligible: !!pensionData.disability_group,
      };
    }

    // Regular pensioners get Category B
    return {
      category: BeneficiaryCategory.CATEGORY_B,
      cost_sharing_waived: false,
      priority_access: false,
      caregiver_allowance: false,
      home_modification_eligible: false,
    };
  }

  /**
   * Sync disability status from MSEC
   */
  async syncDisabilityStatus(
    patientId: string,
    msecDecision: {
      group: DisabilityGroup;
      combat_related: boolean;
      effective_date: string;
      review_date: string;
    }
  ): Promise<void> {
    // Update patient record
    // Notify Pension Fund
    // Update beneficiary category
  }

  /**
   * Get combined benefits statement
   */
  async getCombinedStatement(patientId: string, month: number, year: number): Promise<{
    pension: { gross: number; deductions: number; net: number };
    medical: { services_used: number; cost_shared: number; remaining_oop: number };
    disability: { group?: string; benefits: string[] };
  }> {
    const pensionData = await this.getPensionData(patientId);
    
    return {
      pension: {
        gross: pensionData?.pension_amount || 0,
        deductions: 2100, // Insurance premiums
        net: (pensionData?.pension_amount || 0) - 2100,
      },
      medical: {
        services_used: 15,
        cost_shared: 0, // Category A
        remaining_oop: 0,
      },
      disability: {
        group: pensionData?.disability_group,
        benefits: [
          'Priority healthcare access',
          'No cost sharing',
          'Home modification support',
        ],
      },
    };
  }
}

export default PensionMedicalBridge;
ENDFILE

cat > medical-program/integration/insurance-medical-bridge.ts << 'ENDFILE'
/**
 * Insurance-Medical Integration Bridge
 * Coordinates coverage, claims, and benefits
 */

export interface InsuranceCoverage {
  policy_id: string;
  policy_type: string;
  coverage_amount: number;
  deductible: number;
  deductible_met: number;
}

export interface ClaimCoordination {
  primary_payer: 'medical_program' | 'insurance';
  medical_program_pays: number;
  insurance_pays: number;
  patient_pays: number;
}

export class InsuranceMedicalBridge {
  private insuranceApiEndpoint: string;

  constructor(endpoint: string = '/api/insurance/v1') {
    this.insuranceApiEndpoint = endpoint;
  }

  /**
   * Get patient's insurance coverage
   */
  async getInsuranceCoverage(patientId: string): Promise<InsuranceCoverage[]> {
    // In production, call Insurance Engine API
    return [
      {
        policy_id: 'POL-001',
        policy_type: 'HEALTH-STD',
        coverage_amount: 300000,
        deductible: 1000,
        deductible_met: 500,
      },
    ];
  }

  /**
   * Coordinate benefits for claim
   */
  async coordinateBenefits(
    patientId: string,
    claimAmount: number,
    serviceType: string
  ): Promise<ClaimCoordination> {
    // Medical Program is typically primary
    // Insurance supplements for services beyond program coverage
    
    return {
      primary_payer: 'medical_program',
      medical_program_pays: claimAmount,
      insurance_pays: 0,
      patient_pays: 0,
    };
  }

  /**
   * Submit claim to insurance
   */
  async submitInsuranceClaim(
    patientId: string,
    claimData: {
      service_date: string;
      provider_id: string;
      service_type: string;
      amount: number;
      diagnosis_codes: string[];
    }
  ): Promise<{ claim_id: string; status: string }> {
    // In production, submit to Insurance Engine
    return {
      claim_id: `INS-CLM-${Date.now()}`,
      status: 'submitted',
    };
  }
}

export default InsuranceMedicalBridge;
ENDFILE

echo "  ✅ Integration bridges created"

# ============================================================================
# UPDATE MAIN README
# ============================================================================

cat >> README.md << 'ENDFILE'

## Medical Program

Healthcare management module with full integration to Pension Fund and Insurance Engine.

### Features
- Appointment scheduling with telemedicine
- Medical records management
- Prescription drug coverage
- Mental health programs (PTSD, substance abuse)
- Rehabilitation services
- Disability assessment coordination

### Documentation
- [Medical Program Policy](./medical-program/policies/MEDICAL_PROGRAM_POLICY.md)
- [API Reference](./medical-program/api/)
- [UI Design](./medical-program/ui/)

ENDFILE

# ============================================================================
# SUMMARY
# ============================================================================

echo ""
echo "=============================================="
echo "  MEDICAL PROGRAM DEPLOYMENT COMPLETE"
echo "=============================================="
echo ""
echo "Created files:"
echo "  ✅ medical-program/README.md"
echo "  ✅ medical-program/policies/MEDICAL_PROGRAM_POLICY.md (comprehensive)"
echo "  ✅ medical-program/models/types.ts"
echo "  ✅ medical-program/services/appointment-service.ts"
echo "  ✅ medical-program/services/prescription-service.ts"
echo "  ✅ medical-program/integration/pension-medical-bridge.ts"
echo "  ✅ medical-program/integration/insurance-medical-bridge.ts"
echo ""
echo "Policy Document Sections:"
echo "  1.  Purpose and Scope"
echo "  2.  Definitions"
echo "  3.  Eligibility and Enrollment"
echo "  4.  Covered Medical Services"
echo "  5.  Mental Health Services"
echo "  6.  Rehabilitation Programs"
echo "  7.  Disability Assessment"
echo "  8.  Prescription Drug Coverage"
echo "  9.  Provider Network"
echo "  10. Telemedicine Services"
echo "  11. Emergency Services"
echo "  12. Preventive Care"
echo "  13. Claims and Billing"
echo "  14. Cost Sharing"
echo "  15. Prior Authorization"
echo "  16. Appeals and Grievances"
echo "  17. Privacy and Data Protection"
echo "  18. Integration with Pension/Insurance"
echo "  19. Quality Assurance"
echo "  20. Compliance and Enforcement"
echo ""
echo "Next steps:"
echo "  git add -A"
echo "  git commit -m 'Add Medical Program with comprehensive policy document'"
echo "  git push origin main"
echo ""
