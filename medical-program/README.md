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
