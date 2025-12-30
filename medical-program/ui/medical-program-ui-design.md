# Medical Program - UI Design System

## IVYAR Governance Platform

**Module:** Medical Program  
**Version:** 1.0.0  
**Last Updated:** December 2025

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Personas](#2-user-personas)
3. [Information Architecture](#3-information-architecture)
4. [Color System](#4-color-system)
5. [Page Layouts](#5-page-layouts)
6. [Components](#6-components)
7. [Mobile Design](#7-mobile-design)
8. [Accessibility](#8-accessibility)

---

## 1. Overview

### Purpose

Medical Program portal for military personnel, veterans, and pensioners providing:
- Healthcare services management
- Medical appointments scheduling
- Prescription tracking
- Medical records access
- Rehabilitation programs
- Mental health support
- Disability assessments

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Clarity** | Medical information must be clear and unambiguous |
| **Urgency Visibility** | Critical health alerts prominently displayed |
| **Privacy First** | Sensitive medical data protected visually |
| **Accessibility** | Designed for users with various abilities |
| **Calming** | Healthcare UI should reduce anxiety, not increase it |

---

## 2. User Personas

### Veteran Patient (Primary)
- **Age:** 30-70
- **Tech Level:** Basic to Intermediate
- **Needs:** Quick appointment booking, prescription refills, medical history
- **Pain Points:** Complex forms, medical jargon, long wait times

### Military Pensioner
- **Age:** 50-80
- **Tech Level:** Basic
- **Needs:** Large text, simple navigation, disability services
- **Pain Points:** Small buttons, complex workflows

### Healthcare Administrator
- **Age:** 25-55
- **Tech Level:** Advanced
- **Needs:** Patient management, scheduling, reporting
- **Pain Points:** Slow systems, duplicate data entry

### Medical Provider
- **Age:** 30-65
- **Tech Level:** Intermediate to Advanced
- **Needs:** Patient records, appointment management, prescriptions
- **Pain Points:** Incomplete patient history, system downtime

---

## 3. Information Architecture

```
Medical Program
├── Dashboard
│   ├── Health Summary
│   ├── Upcoming Appointments
│   ├── Active Prescriptions
│   ├── Alerts & Notifications
│   └── Quick Actions
│
├── Appointments
│   ├── Schedule New
│   ├── Upcoming
│   ├── Past Visits
│   └── Telemedicine
│
├── Medical Records
│   ├── Health History
│   ├── Lab Results
│   ├── Imaging
│   ├── Diagnoses
│   └── Documents
│
├── Prescriptions
│   ├── Active
│   ├── Request Refill
│   ├── History
│   └── Pharmacy Info
│
├── Programs
│   ├── Rehabilitation
│   ├── Mental Health
│   ├── Physical Therapy
│   └── Wellness
│
├── Disability Services
│   ├── Assessment Status
│   ├── Schedule Assessment
│   ├── Documentation
│   └── Appeals
│
├── Insurance & Billing
│   ├── Coverage Details
│   ├── Claims
│   ├── Payments
│   └── Statements
│
└── Settings
    ├── Profile
    ├── Emergency Contacts
    ├── Privacy
    └── Notifications
```

---

## 4. Color System

### Medical Color Palette

```
Primary (Medical Blue):
┌─────────────────────────────────────────────────────────┐
│  50   │ 100  │ 200  │ 300  │ 400  │ 500  │ 600  │ 700  │
│#E3F2FD│#BBDEFB│#90CAF9│#64B5F6│#42A5F5│#1E88E5│#1565C0│#0D47A1│
└─────────────────────────────────────────────────────────┘
Primary: #1E88E5 (Medical Blue - trust, calm, professional)

Secondary (Healing Green):
┌─────────────────────────────────────────────────────────┐
│  50   │ 100  │ 200  │ 300  │ 400  │ 500  │ 600  │ 700  │
│#E8F5E9│#C8E6C9│#A5D6A7│#81C784│#66BB6A│#43A047│#2E7D32│#1B5E20│
└─────────────────────────────────────────────────────────┘
Secondary: #43A047 (Healing Green - health, recovery, wellness)
```

### Semantic Colors

| Status | Color | Hex | Usage |
|--------|-------|-----|-------|
| **Healthy/Good** | Green | `#4CAF50` | Normal results, completed |
| **Attention** | Amber | `#FF9800` | Needs review, upcoming |
| **Urgent/Critical** | Red | `#F44336` | Critical alerts, overdue |
| **Informational** | Blue | `#2196F3` | General info, tips |
| **Neutral** | Gray | `#9E9E9E` | Inactive, disabled |

### Status Indicators

```
┌──────────────────────────────────────────────────────────┐
│                    HEALTH STATUS                          │
├──────────────────────────────────────────────────────────┤
│  ● Normal      ● Attention    ● Critical    ● Unknown   │
│   #4CAF50       #FF9800        #F44336       #9E9E9E    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                  APPOINTMENT STATUS                       │
├──────────────────────────────────────────────────────────┤
│  ● Scheduled   ● In Progress  ● Completed   ● Cancelled │
│   #2196F3       #FF9800        #4CAF50       #9E9E9E    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                  PRESCRIPTION STATUS                      │
├──────────────────────────────────────────────────────────┤
│  ● Active      ● Refill Needed ● Expired    ● On Hold   │
│   #4CAF50       #FF9800         #F44336      #9E9E9E    │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Page Layouts

### 5.1 Medical Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 IVYAR Medical Program                    🔔 3  🌐 UA ▼  👤 Петренко І. │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐  ┌────────────────────────────────────────────────────┐   │
│  │             │  │                                                     │   │
│  │  Dashboard  │  │  Good morning, Іван! 👋                            │   │
│  │  ─────────  │  │                                                     │   │
│  │             │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  📅 Appts   │  │  │ Next Appt   │ │ Prescriptions│ │ Lab Results │   │   │
│  │             │  │  │             │ │             │ │             │   │   │
│  │  📋 Records │  │  │  📅 Jan 5   │ │  💊 3 Active│ │  🔬 2 New   │   │   │
│  │             │  │  │  Dr. Koval  │ │  1 Refill   │ │  All Normal │   │   │
│  │  💊 Rx      │  │  │  Cardiology │ │  Due        │ │             │   │   │
│  │             │  │  │             │ │             │ │             │   │   │
│  │  🏃 Programs│  │  │ [View] [Reschd]│ [Request]  │ │ [View All]  │   │   │
│  │             │  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  │  ♿ Disabil.│  │                                                     │   │
│  │             │  │  ┌──────────────────────────────────────────────┐   │   │
│  │  💳 Billing │  │  │              HEALTH ALERTS                    │   │   │
│  │             │  │  ├──────────────────────────────────────────────┤   │   │
│  │  ⚙️ Settings│  │  │  ⚠️  Blood pressure check overdue (7 days)   │   │   │
│  │             │  │  │  💊 Metformin refill needed in 5 days        │   │   │
│  │             │  │  │  📅 Annual checkup due in 30 days            │   │   │
│  │             │  │  └──────────────────────────────────────────────┘   │   │
│  │─────────────│  │                                                     │   │
│  │ Quick Actions│  │  ┌──────────────────────┐ ┌───────────────────┐   │   │
│  │             │  │  │  UPCOMING APPOINTMENTS │ │ ACTIVE MEDICATIONS│   │   │
│  │ [Book Appt] │  │  ├──────────────────────┤ ├───────────────────┤   │   │
│  │ [Refill Rx] │  │  │                       │ │                   │   │   │
│  │ [Message]   │  │  │  Jan 5, 10:00         │ │ 💊 Metformin      │   │   │
│  │ [Emergency] │  │  │  Dr. Koval - Cardio   │ │    500mg 2×/day   │   │   │
│  │             │  │  │  📍 Clinic A, Room 201│ │    Refill: Jan 10 │   │   │
│  │             │  │  │                       │ │                   │   │   │
│  └─────────────┘  │  │  Jan 12, 14:30        │ │ 💊 Lisinopril     │   │   │
│                   │  │  Dr. Bondar - General │ │    10mg 1×/day    │   │   │
│                   │  │  📍 Clinic B, Room 105│ │    Refill: Jan 25 │   │   │
│                   │  │                       │ │                   │   │   │
│                   │  │  Jan 20, 09:00        │ │ 💊 Aspirin        │   │   │
│                   │  │  Physical Therapy     │ │    100mg 1×/day   │   │   │
│                   │  │  📍 Rehab Center      │ │    Refill: Feb 1  │   │   │
│                   │  │                       │ │                   │   │   │
│                   │  │  [View All]           │ │ [View All]        │   │   │
│                   │  └──────────────────────┘ └───────────────────┘   │   │
│                   │                                                     │   │
│                   └────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Appointment Scheduling

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 Medical Program  >  Appointments  >  Schedule New                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Schedule New Appointment                                                    │
│  ═══════════════════════                                                     │
│                                                                              │
│  Step 1 of 4: Select Service                                                 │
│  ────────────────────────────────────────────────────────────────────────── │
│  ● ○ ○ ○                                                                    │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐      │
│  │                    │ │                    │ │                    │      │
│  │   🩺 Primary Care  │ │   ❤️ Cardiology    │ │   🧠 Neurology     │      │
│  │                    │ │                    │ │                    │      │
│  │   General checkup  │ │   Heart health     │ │   Brain & nerves   │      │
│  │   Sick visits      │ │   Blood pressure   │ │   Headaches        │      │
│  │   Preventive care  │ │   Heart rhythm     │ │   Neuropathy       │      │
│  │                    │ │                    │ │                    │      │
│  │   [Select]         │ │   [Select]         │ │   [Select]         │      │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘      │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐      │
│  │                    │ │                    │ │                    │      │
│  │   🦴 Orthopedics   │ │   🧘 Mental Health │ │   🏃 Rehabilitation│      │
│  │                    │ │                    │ │                    │      │
│  │   Bones & joints   │ │   Counseling       │ │   Physical therapy │      │
│  │   Back pain        │ │   PTSD support     │ │   Recovery         │      │
│  │   Injuries         │ │   Stress mgmt      │ │   Mobility         │      │
│  │                    │ │                    │ │                    │      │
│  │   [Select]         │ │   [Select]         │ │   [Select]         │      │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘      │
│                                                                              │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐      │
│  │                    │ │                    │ │                    │      │
│  │   👁️ Ophthalmology │ │   🦷 Dental        │ │   🔬 Laboratory    │      │
│  │                    │ │                    │ │                    │      │
│  │   Vision care      │ │   Dental checkup   │ │   Blood tests      │      │
│  │   Eye exams        │ │   Oral surgery     │ │   Diagnostics      │      │
│  │                    │ │                    │ │                    │      │
│  │   [Select]         │ │   [Select]         │ │   [Select]         │      │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘      │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  💻 Telemedicine Available                                            │   │
│  │  Video consultations available for: Primary Care, Mental Health,     │   │
│  │  Follow-up visits                                                     │   │
│  │                                                     [Book Telemedicine]│   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│                                               [Cancel]  [Continue →]        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Appointment Calendar Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Schedule New Appointment                                                    │
│                                                                              │
│  Step 2 of 4: Select Date & Time                                            │
│  ────────────────────────────────────────────────────────────────────────── │
│  ● ● ○ ○                                                                    │
│                                                                              │
│  Selected: ❤️ Cardiology                                                     │
│                                                                              │
│  ┌─────────────────────────────────────┐  ┌──────────────────────────────┐ │
│  │         JANUARY 2025                │  │  Available Time Slots        │ │
│  │  ◄                            ►     │  │  ─────────────────────────── │ │
│  │                                     │  │                              │ │
│  │  Mo  Tu  We  Th  Fr  Sa  Su        │  │  📅 Thursday, Jan 9, 2025    │ │
│  │                                     │  │                              │ │
│  │       1   2   3   4   5            │  │  Morning:                    │ │
│  │                   ●                 │  │  ┌──────┐ ┌──────┐ ┌──────┐ │ │
│  │   6   7   8  [9] 10  11  12        │  │  │ 09:00│ │ 09:30│ │ 10:00│ │ │
│  │              ███                    │  │  └──────┘ └──────┘ └──────┘ │ │
│  │  13  14  15  16  17  18  19        │  │  ┌──────┐ ┌──────┐          │ │
│  │       ●   ●                         │  │  │ 10:30│ │ 11:00│          │ │
│  │  20  21  22  23  24  25  26        │  │  └──────┘ └──────┘          │ │
│  │                                     │  │                              │ │
│  │  27  28  29  30  31                │  │  Afternoon:                  │ │
│  │                                     │  │  ┌──────┐ ┌──────┐ ┌──────┐ │ │
│  │                                     │  │  │ 14:00│ │ 14:30│ │ 15:00│ │ │
│  │  ● Available  ███ Selected          │  │  └──────┘ └──────┘ └──────┘ │ │
│  └─────────────────────────────────────┘  │  ┌──────┐ ┌──────┐          │ │
│                                           │  │ 15:30│ │ 16:00│          │ │
│  ┌─────────────────────────────────────┐  │  └──────┘ └──────┘          │ │
│  │  👨‍⚕️ Select Provider (Optional)     │  │                              │ │
│  │  ─────────────────────────────────  │  │  Selected: 10:00 ✓          │ │
│  │                                     │  │                              │ │
│  │  ○ Any available provider          │  └──────────────────────────────┘ │
│  │  ● Dr. Koval, Oleksandr            │                                   │
│  │    ★★★★★ (4.9) | 15 years exp.     │                                   │
│  │  ○ Dr. Shevchenko, Maria           │                                   │
│  │    ★★★★☆ (4.7) | 10 years exp.     │                                   │
│  └─────────────────────────────────────┘                                   │
│                                                                              │
│                                      [← Back]  [Cancel]  [Continue →]       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Medical Records

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 Medical Program  >  Medical Records                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Medical Records                                           [📥 Download All] │
│  ═══════════════                                                             │
│                                                                              │
│  ┌────────────┬───────────┬───────────┬───────────┬───────────┐            │
│  │  All       │  History  │  Lab      │  Imaging  │  Documents│            │
│  │  Records   │           │  Results  │           │           │            │
│  └────────────┴───────────┴───────────┴───────────┴───────────┘            │
│                                                                              │
│  Search: [🔍 Search records...                              ] [Filter ▼]    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Recent Records                                                       │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  ┌───┐  Dec 15, 2024 - Lab Results                        ●  New    │   │
│  │  │🔬 │  Complete Blood Count (CBC)                                   │   │
│  │  └───┘  Provider: Lab Center Kyiv                                    │   │
│  │         Status: ✓ Results within normal range                        │   │
│  │                                                    [View] [Download]  │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ┌───┐  Dec 10, 2024 - Visit Summary                                 │   │
│  │  │📋 │  Cardiology Follow-up                                         │   │
│  │  └───┘  Provider: Dr. Koval, Oleksandr                               │   │
│  │         Diagnosis: Hypertension, controlled                          │   │
│  │         Next Steps: Continue current medication                      │   │
│  │                                                    [View] [Download]  │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ┌───┐  Nov 28, 2024 - Imaging                                       │   │
│  │  │🩻 │  Chest X-Ray                                                  │   │
│  │  └───┘  Provider: Diagnostic Center                                  │   │
│  │         Finding: No abnormalities detected                           │   │
│  │                                                    [View] [Download]  │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ┌───┐  Nov 15, 2024 - Visit Summary                                 │   │
│  │  │📋 │  Annual Physical Examination                                  │   │
│  │  └───┘  Provider: Dr. Bondar, Tetiana                                │   │
│  │         Overall: Good health, minor recommendations                  │   │
│  │                                                    [View] [Download]  │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Showing 1-4 of 28 records                        [← Previous] [Next →]     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Prescriptions Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 Medical Program  >  Prescriptions                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  My Prescriptions                                                            │
│  ═══════════════                                                             │
│                                                                              │
│  ┌────────────┬───────────┬───────────┬───────────────┐                    │
│  │  Active (3)│  Refill   │  History  │  Pharmacy Info│                    │
│  │            │  Needed(1)│           │               │                    │
│  └────────────┴───────────┴───────────┴───────────────┘                    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │  💊 Metformin 500mg                                    ● Active │ │   │
│  │  │  ─────────────────────────────────────────────────────────────  │ │   │
│  │  │                                                                  │ │   │
│  │  │  Dosage:    1 tablet twice daily with meals                     │ │   │
│  │  │  Quantity:  60 tablets                                          │ │   │
│  │  │  Refills:   2 remaining                                         │ │   │
│  │  │  Prescriber: Dr. Koval, Oleksandr                               │ │   │
│  │  │                                                                  │ │   │
│  │  │  ┌────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Supply Remaining                                          │ │ │   │
│  │  │  │  ████████████████████░░░░░░░░░░  65%  (15 days left)      │ │ │   │
│  │  │  └────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                  │ │   │
│  │  │  ⚠️ Refill recommended by Jan 10                                │ │   │
│  │  │                                                                  │ │   │
│  │  │                            [📋 Instructions] [🔄 Request Refill]│ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │  💊 Lisinopril 10mg                                    ● Active │ │   │
│  │  │  ─────────────────────────────────────────────────────────────  │ │   │
│  │  │                                                                  │ │   │
│  │  │  Dosage:    1 tablet once daily in the morning                  │ │   │
│  │  │  Quantity:  30 tablets                                          │ │   │
│  │  │  Refills:   5 remaining                                         │ │   │
│  │  │  Prescriber: Dr. Koval, Oleksandr                               │ │   │
│  │  │                                                                  │ │   │
│  │  │  ┌────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Supply Remaining                                          │ │ │   │
│  │  │  │  ████████████████████████████████████░░  85%  (25 days)   │ │ │   │
│  │  │  └────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                  │ │   │
│  │  │                            [📋 Instructions] [🔄 Request Refill]│ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │  💊 Aspirin 100mg                                      ● Active │ │   │
│  │  │  ─────────────────────────────────────────────────────────────  │ │   │
│  │  │                                                                  │ │   │
│  │  │  Dosage:    1 tablet once daily with food                       │ │   │
│  │  │  Quantity:  30 tablets                                          │ │   │
│  │  │  Refills:   11 remaining (annual supply)                        │ │   │
│  │  │                                                                  │ │   │
│  │  │  ┌────────────────────────────────────────────────────────────┐ │ │   │
│  │  │  │  Supply Remaining                                          │ │ │   │
│  │  │  │  ████████████████████████████████████████████████  95%    │ │ │   │
│  │  │  └────────────────────────────────────────────────────────────┘ │ │   │
│  │  │                                                                  │ │   │
│  │  │                            [📋 Instructions] [🔄 Request Refill]│ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📍 My Pharmacy                                                       │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │  🏪 Military Pharmacy #12                                            │   │
│  │  📍 вул. Хрещатик, 15, Київ                                          │   │
│  │  📞 +380 44 123 4567                                                  │   │
│  │  🕐 Mon-Fri: 8:00-20:00 | Sat: 9:00-18:00                            │   │
│  │                                                    [Change Pharmacy]  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Mental Health & Rehabilitation Programs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 Medical Program  >  Programs                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Health Programs                                                             │
│  ═══════════════                                                             │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🧘 MENTAL HEALTH SUPPORT                                             │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  Free confidential support for veterans and military families        │   │
│  │                                                                       │   │
│  │  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐│   │
│  │  │                   │  │                   │  │                   ││   │
│  │  │  💬 Individual    │  │  👥 Group         │  │  📞 24/7 Crisis   ││   │
│  │  │     Counseling    │  │     Therapy       │  │     Hotline       ││   │
│  │  │                   │  │                   │  │                   ││   │
│  │  │  One-on-one       │  │  Connect with     │  │  Immediate        ││   │
│  │  │  sessions with    │  │  peers who        │  │  support when     ││   │
│  │  │  licensed         │  │  understand       │  │  you need it      ││   │
│  │  │  therapist        │  │                   │  │                   ││   │
│  │  │                   │  │                   │  │  ☎️ 0 800 500 335 ││   │
│  │  │  [Schedule]       │  │  [View Groups]    │  │  [Call Now]       ││   │
│  │  └───────────────────┘  └───────────────────┘  └───────────────────┘│   │
│  │                                                                       │   │
│  │  Programs Available:                                                  │   │
│  │  • PTSD Treatment Program                    [Learn More]             │   │
│  │  • Stress Management Workshop                [Enroll]                 │   │
│  │  • Family Counseling Services                [Learn More]             │   │
│  │  • Sleep Improvement Program                 [Enroll]                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🏃 PHYSICAL REHABILITATION                                           │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  Your Active Programs:                                                │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │  Physical Therapy - Lower Back                      In Progress │ │   │
│  │  │  ───────────────────────────────────────────────────────────── │ │   │
│  │  │  Provider: Rehab Center Kyiv                                    │ │   │
│  │  │  Started: Nov 15, 2024                                          │ │   │
│  │  │  Sessions: 8 of 12 completed                                    │ │   │
│  │  │                                                                  │ │   │
│  │  │  Progress: ████████████████████░░░░░░  67%                      │ │   │
│  │  │                                                                  │ │   │
│  │  │  Next Session: Jan 8, 2025 at 10:00                             │ │   │
│  │  │                                        [View Details] [Schedule] │ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  Available Programs:                                                  │   │
│  │  • Post-Surgery Recovery                     [Apply]                  │   │
│  │  • Mobility Improvement                      [Apply]                  │   │
│  │  • Prosthetics Training                      [Apply]                  │   │
│  │  • Occupational Therapy                      [Apply]                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🏋️ WELLNESS PROGRAMS                                                 │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  • Fitness for Veterans (Free gym access)    [Enroll]                 │   │
│  │  • Nutrition Counseling                      [Schedule]               │   │
│  │  • Smoking Cessation                         [Enroll]                 │   │
│  │  • Weight Management                         [Enroll]                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.7 Disability Services

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏥 Medical Program  >  Disability Services                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Disability Services                                                         │
│  ══════════════════                                                          │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📊 YOUR DISABILITY STATUS                                            │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ┌─────────────────────┐     ┌────────────────────────────────────┐ │   │
│  │  │                     │     │                                     │ │   │
│  │  │  Current Group      │     │  Assessment Details                 │ │   │
│  │  │                     │     │                                     │ │   │
│  │  │       ██████        │     │  Group: II                          │ │   │
│  │  │       ██  ██        │     │  Cause: Combat Injury               │ │   │
│  │  │       ██████        │     │  Established: March 15, 2024        │ │   │
│  │  │         II          │     │  Review Date: March 15, 2025        │ │   │
│  │  │                     │     │                                     │ │   │
│  │  │  Combat-Related     │     │  Benefits:                          │ │   │
│  │  │                     │     │  • Pension: +45% bonus              │ │   │
│  │  └─────────────────────┘     │  • Healthcare: Priority access      │ │   │
│  │                              │  • Transportation: Free public      │ │   │
│  │                              │  • Housing: Accessibility support   │ │   │
│  │                              │                                     │ │   │
│  │                              │            [View Full Details]      │ │   │
│  │                              └────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📅 UPCOMING REVIEW                                                   │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ⏰ Your disability status review is scheduled:                       │   │
│  │                                                                       │   │
│  │     📅 March 15, 2025 at 10:00                                       │   │
│  │     📍 Medical Commission Center, Kyiv                               │   │
│  │     ⏱️ Duration: ~2 hours                                            │   │
│  │                                                                       │   │
│  │  Documents Required:                                                  │   │
│  │  ☑️ Medical records (last 12 months)                                 │   │
│  │  ☑️ ID and military documents                                        │   │
│  │  ☐ Updated treatment summary from physician                          │   │
│  │  ☐ Employer statement (if applicable)                                │   │
│  │                                                                       │   │
│  │                    [Upload Documents] [Reschedule] [Prepare Checklist]│   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📋 QUICK ACTIONS                                                     │   │
│  │  ─────────────────────────────────────────────────────────────────── │   │
│  │                                                                       │   │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │   │
│  │  │ 📄 Request      │ │ ⬆️ Appeal       │ │ 📑 Download     │        │   │
│  │  │    Certificate  │ │    Decision     │ │    Documents    │        │   │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘        │   │
│  │                                                                       │   │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │   │
│  │  │ 📞 Contact      │ │ ❓ FAQ          │ │ 🏠 Accessibility │        │   │
│  │  │    Support      │ │                 │ │    Services     │        │   │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Components

### 6.1 Health Alert Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⚠️  ATTENTION REQUIRED                                              │
│  ─────────────────────────────────────────────────────────────────── │
│                                                                       │
│  Blood Pressure Check Overdue                                        │
│                                                                       │
│  Your last blood pressure reading was 45 days ago.                   │
│  Regular monitoring is recommended for hypertension management.      │
│                                                                       │
│                                        [Dismiss] [Schedule Check-up] │
└──────────────────────────────────────────────────────────────────────┘

Types: Critical (red), Warning (amber), Info (blue), Success (green)
```

### 6.2 Appointment Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                                                             │
│  │ JAN │  Cardiology Follow-up                            Confirmed │
│  │  5  │  ───────────────────────────────────────────────────────── │
│  │ 10AM│  👨‍⚕️ Dr. Koval, Oleksandr                                   │
│  └─────┘  📍 Clinic A, Room 201, Kyiv                                │
│           ⏱️ 30 minutes                                              │
│                                                                       │
│           [Add to Calendar] [Get Directions] [Reschedule] [Cancel]  │
└──────────────────────────────────────────────────────────────────────┘
```

### 6.3 Medication Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  💊  Metformin 500mg                                        ● Active │
│  ─────────────────────────────────────────────────────────────────── │
│                                                                       │
│  Take 1 tablet twice daily with meals                                │
│                                                                       │
│  Supply: █████████████░░░░░░░  65%  |  15 days remaining            │
│                                                                       │
│  ⚠️ Refill by: Jan 10, 2025                                          │
│                                                                       │
│                              [View Instructions] [Request Refill]    │
└──────────────────────────────────────────────────────────────────────┘
```

### 6.4 Lab Result Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  🔬  Complete Blood Count (CBC)                             ● Normal │
│  ─────────────────────────────────────────────────────────────────── │
│                                                                       │
│  Date: Dec 15, 2024                                                  │
│  Provider: Lab Center Kyiv                                           │
│                                                                       │
│  Key Results:                                                        │
│  ├─ Hemoglobin:    14.5 g/dL    (Normal: 13.5-17.5)        ✓       │
│  ├─ White Cells:   7.2 K/uL     (Normal: 4.5-11.0)         ✓       │
│  └─ Platelets:     250 K/uL     (Normal: 150-400)          ✓       │
│                                                                       │
│                                           [View Full Report] [PDF]   │
└──────────────────────────────────────────────────────────────────────┘
```

### 6.5 Provider Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌────────┐                                                          │
│  │  👨‍⚕️   │  Dr. Oleksandr Koval                                     │
│  │        │  Cardiologist                                            │
│  │        │  ★★★★★ (4.9) | 127 reviews                               │
│  └────────┘                                                          │
│                                                                       │
│  🏥 Military Hospital Kyiv                                           │
│  📍 вул. Госпітальна, 18                                             │
│  🗣️ Ukrainian, English                                               │
│                                                                       │
│  Specializations: Hypertension, Heart Disease, Cardiac Rehabilitation│
│                                                                       │
│  Next Available: Jan 5, 2025 at 10:00                                │
│                                                                       │
│                              [View Profile] [Book Appointment]       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 7. Mobile Design

### 7.1 Mobile Dashboard

```
┌─────────────────────────────┐
│  🏥  Medical      🔔 ≡      │
├─────────────────────────────┤
│                             │
│  Good morning, Іван! 👋     │
│                             │
│  ┌─────────────────────────┐│
│  │  ⚠️ 2 items need        ││
│  │     attention           ││
│  │                 [View]  ││
│  └─────────────────────────┘│
│                             │
│  Next Appointment           │
│  ┌─────────────────────────┐│
│  │  📅 Jan 5, 10:00        ││
│  │  Dr. Koval - Cardiology ││
│  │  Clinic A, Room 201     ││
│  │            [Directions] ││
│  └─────────────────────────┘│
│                             │
│  Medications                │
│  ┌─────────────────────────┐│
│  │  💊 3 Active            ││
│  │  ⚠️ 1 Refill Needed     ││
│  │                 [View]  ││
│  └─────────────────────────┘│
│                             │
│  Recent Lab Results         │
│  ┌─────────────────────────┐│
│  │  🔬 CBC - Dec 15        ││
│  │  ✓ All Normal           ││
│  │                 [View]  ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠    📅    💊    📋    ⚙️  │
│ Home  Appts  Rx  Records Set│
└─────────────────────────────┘
```

### 7.2 Mobile Appointment Booking

```
┌─────────────────────────────┐
│  ←  Book Appointment        │
├─────────────────────────────┤
│                             │
│  Step 1: Select Service     │
│  ● ○ ○ ○                    │
│                             │
│  ┌─────────────────────────┐│
│  │  🩺 Primary Care        ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │  ❤️ Cardiology          ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │  🧠 Neurology           ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │  🦴 Orthopedics         ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │  🧘 Mental Health       ││
│  └─────────────────────────┘│
│  ┌─────────────────────────┐│
│  │  🏃 Rehabilitation      ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  💻 Video Consultation  ││
│  │     Available           ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│        [Continue →]         │
└─────────────────────────────┘
```

---

## 8. Accessibility

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Color Contrast** | 4.5:1 minimum for all text |
| **Text Resize** | Up to 200% without loss |
| **Keyboard Navigation** | Full access, visible focus |
| **Screen Reader** | ARIA labels, live regions |
| **Touch Targets** | Minimum 44×44px |
| **Error Identification** | Clear error messages with suggestions |

### Medical-Specific Accessibility

| Feature | Description |
|---------|-------------|
| **Emergency Button** | Always visible, high contrast |
| **Medication Reminders** | Visual + audio + haptic options |
| **Large Text Mode** | 18px base for elderly users |
| **High Contrast Mode** | For vision impairments |
| **Voice Commands** | For mobility impairments |
| **Simplified View** | Reduced cognitive load option |

### Emergency Access

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  🚨  EMERGENCY                                                        │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                                                                  │ │
│  │                    ☎️ CALL 103                                   │ │
│  │                    Emergency Services                            │ │
│  │                                                                  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  📞 Crisis Hotline: 0 800 500 335 (24/7)                        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  📍 Nearest ER: Military Hospital Kyiv (2.3 km)                 │ │
│  │                                            [Get Directions]      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  Your Emergency Contacts:                                             │
│  • Spouse: +380 50 123 4567                            [Call]        │
│  • Primary Doctor: Dr. Koval                           [Call]        │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Technology Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts (for health metrics)
- **Calendar:** React Big Calendar
- **Forms:** React Hook Form + Zod

### Integration Points

| System | Integration |
|--------|-------------|
| **Pension Fund** | Disability status, pensioner benefits |
| **Fair Insurance** | Coverage details, claims |
| **AI Administrator** | Symptom checker, appointment suggestions |
| **Compliance Engine** | Medical data regulations |

---

*Medical Program UI Design v1.0.0*  
*IVYAR Governance Platform*  
*December 2025*
