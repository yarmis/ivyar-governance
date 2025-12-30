# Pension Fund Portal - UI Design System

## IVYAR Pension Fund Engine

**Document ID:** IVYAR-UI-001  
**Version:** 1.0  
**Last Updated:** December 2025

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Layout System](#4-layout-system)
5. [Components](#5-components)
6. [Page Designs](#6-page-designs)
7. [Responsive Design](#7-responsive-design)
8. [Accessibility](#8-accessibility)
9. [Icons & Illustrations](#9-icons--illustrations)
10. [Implementation](#10-implementation)

---

## 1. Design Philosophy

### 1.1 Core Principles

| Principle | Description |
|-----------|-------------|
| **Clarity** | Clear information hierarchy, no ambiguity |
| **Trust** | Professional, government-grade appearance |
| **Accessibility** | WCAG 2.1 AA compliant |
| **Efficiency** | Minimal clicks to complete tasks |
| **Respect** | Dignified treatment of veterans and pensioners |

### 1.2 User Personas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER PERSONAS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  👴 PENSIONER (60+)              👨‍💼 ADMINISTRATOR              👩‍⚕️ CASE WORKER    │
│  - Limited tech skills          - Daily heavy use              - Field work       │
│  - Needs large text             - Complex operations           - Mobile-first     │
│  - Simple navigation            - Data-heavy views             - Quick access     │
│  - Ukrainian/English            - Reports & analytics          - Offline support  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Design Goals

- **Load time:** < 2 seconds
- **Task completion:** < 3 clicks for common tasks
- **Error rate:** < 1% on forms
- **Satisfaction:** > 4.5/5 rating

---

## 2. Color System

### 2.1 Primary Palette

```css
:root {
  /* Primary - Ukrainian Blue */
  --primary-50: #E3F2FD;
  --primary-100: #BBDEFB;
  --primary-200: #90CAF9;
  --primary-300: #64B5F6;
  --primary-400: #42A5F5;
  --primary-500: #0057B8;  /* Main brand color */
  --primary-600: #1565C0;
  --primary-700: #0D47A1;
  --primary-800: #0A3D91;
  --primary-900: #062A6E;
  
  /* Secondary - Ukrainian Gold */
  --secondary-50: #FFFDE7;
  --secondary-100: #FFF9C4;
  --secondary-200: #FFF59D;
  --secondary-300: #FFF176;
  --secondary-400: #FFEE58;
  --secondary-500: #FFD700;  /* Main accent */
  --secondary-600: #FDD835;
  --secondary-700: #FBC02D;
  --secondary-800: #F9A825;
  --secondary-900: #F57F17;
}
```

### 2.2 Semantic Colors

```css
:root {
  /* Success */
  --success-light: #E8F5E9;
  --success-main: #4CAF50;
  --success-dark: #2E7D32;
  
  /* Warning */
  --warning-light: #FFF3E0;
  --warning-main: #FF9800;
  --warning-dark: #E65100;
  
  /* Error */
  --error-light: #FFEBEE;
  --error-main: #F44336;
  --error-dark: #C62828;
  
  /* Info */
  --info-light: #E3F2FD;
  --info-main: #2196F3;
  --info-dark: #1565C0;
}
```

### 2.3 Neutral Colors

```css
:root {
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --gray-200: #EEEEEE;
  --gray-300: #E0E0E0;
  --gray-400: #BDBDBD;
  --gray-500: #9E9E9E;
  --gray-600: #757575;
  --gray-700: #616161;
  --gray-800: #424242;
  --gray-900: #212121;
  
  --white: #FFFFFF;
  --black: #000000;
}
```

### 2.4 Color Usage

| Element | Color | Usage |
|---------|-------|-------|
| Header | Primary-500 | Main navigation |
| Buttons (Primary) | Primary-500 | Main actions |
| Buttons (Secondary) | Gray-200 | Secondary actions |
| Links | Primary-600 | Clickable text |
| Success states | Success-main | Confirmations |
| Warnings | Warning-main | Alerts |
| Errors | Error-main | Validation errors |
| Background | Gray-50 | Page background |
| Cards | White | Content containers |

---

## 3. Typography

### 3.1 Font Stack

```css
:root {
  --font-primary: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-secondary: 'Source Sans Pro', 'Open Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### 3.2 Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 48px | 700 | 1.2 | Hero sections |
| H1 | 36px | 700 | 1.25 | Page titles |
| H2 | 28px | 600 | 1.3 | Section headers |
| H3 | 22px | 600 | 1.35 | Card titles |
| H4 | 18px | 600 | 1.4 | Subsections |
| Body Large | 18px | 400 | 1.6 | Important text |
| Body | 16px | 400 | 1.5 | Default text |
| Body Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 400 | 1.4 | Labels, hints |
| Overline | 11px | 600 | 1.5 | Category labels |

### 3.3 Accessibility Mode

```css
/* High contrast / Large text mode */
.accessibility-mode {
  --font-size-base: 18px;
  --font-size-scale: 1.2;
  --line-height-base: 1.8;
  --letter-spacing: 0.02em;
}
```

---

## 4. Layout System

### 4.1 Grid System

```css
:root {
  --grid-columns: 12;
  --grid-gutter: 24px;
  --container-max: 1440px;
  --container-padding: 24px;
}

/* Breakpoints */
--breakpoint-xs: 0;
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-xxl: 1440px;
```

### 4.2 Spacing Scale

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

### 4.3 Main Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (64px)                                   │
│  ┌─────────┐  ┌──────────────────────────────────┐  ┌─────────────────────┐│
│  │  Logo   │  │        Navigation                 │  │  User Menu         ││
│  └─────────┘  └──────────────────────────────────┘  └─────────────────────┘│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐  ┌────────────────────────────────────────────────────┐   │
│  │             │  │                                                     │   │
│  │   SIDEBAR   │  │                    MAIN CONTENT                     │   │
│  │   (240px)   │  │                                                     │   │
│  │             │  │                                                     │   │
│  │  - Menu     │  │  ┌─────────────────────────────────────────────┐   │   │
│  │  - Quick    │  │  │              PAGE HEADER                     │   │   │
│  │    Actions  │  │  └─────────────────────────────────────────────┘   │   │
│  │  - Status   │  │                                                     │   │
│  │             │  │  ┌─────────────────────────────────────────────┐   │   │
│  │             │  │  │                                             │   │   │
│  │             │  │  │              CONTENT AREA                   │   │   │
│  │             │  │  │                                             │   │   │
│  │             │  │  │                                             │   │   │
│  │             │  │  └─────────────────────────────────────────────┘   │   │
│  │             │  │                                                     │   │
│  └─────────────┘  └────────────────────────────────────────────────────┘   │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                              FOOTER (120px)                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│  │  Legal Links    │  │   Contact Info  │  │      Language Toggle        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Components

### 5.1 Buttons

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BUTTON SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRIMARY          SECONDARY        OUTLINE          TEXT                    │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ Action   │    │ Action   │    │ Action   │    │ Action   │              │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘              │
│  Blue bg         Gray bg         Blue border     No bg                      │
│  White text      Dark text       Blue text       Blue text                  │
│                                                                              │
│  SIZES:                                                                      │
│  ┌────┐  Small (32px)                                                       │
│  ┌──────┐  Medium (40px)                                                    │
│  ┌────────┐  Large (48px)                                                   │
│  ┌──────────┐  XLarge (56px) - for elderly users                           │
│                                                                              │
│  STATES:                                                                     │
│  Default → Hover → Active → Disabled → Loading                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Cards

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CARD VARIANTS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STAT CARD                    INFO CARD                    ACTION CARD      │
│  ┌────────────────┐          ┌────────────────┐          ┌────────────────┐│
│  │ 💰              │          │ ℹ️ Information  │          │ 📝             ││
│  │                │          │                │          │                ││
│  │ 45,230 ₴      │          │ Your next      │          │ Update your    ││
│  │ Monthly        │          │ payment is     │          │ bank details   ││
│  │ Pension        │          │ scheduled for  │          │                ││
│  │                │          │ January 5th    │          │ ┌────────────┐ ││
│  │ +5.2% ↑       │          │                │          │ │  Update    │ ││
│  └────────────────┘          └────────────────┘          │ └────────────┘ ││
│                                                          └────────────────┘│
│                                                                              │
│  PENSION SUMMARY CARD                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🏅 Military Pension - Colonel                                        │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │                                                                       │  │
│  │  Base Pension     Combat Bonus     Disability      Total             │  │
│  │  35,000 ₴        +5,200 ₴         +10,500 ₴       50,700 ₴          │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ [████████████████████████████████████████░░░░░░░░░░] 78%        │ │  │
│  │  │ 78% of maximum pension                                          │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │  │
│  │  │ View Details │  │ Payment Hist │  │   Download   │               │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Forms

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FORM ELEMENTS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TEXT INPUT                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Personal ID Number *                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────────┐   │  │
│  │ │ 3456789012                                                      │   │  │
│  │ └────────────────────────────────────────────────────────────────┘   │  │
│  │ Enter your 10-digit personal ID                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  SELECT / DROPDOWN                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Military Rank *                                                       │  │
│  │ ┌────────────────────────────────────────────────────────────────┐   │  │
│  │ │ Colonel (Полковник)                                         ▼  │   │  │
│  │ └────────────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  DATE PICKER                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Service Start Date *                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────────┐   │  │
│  │ │ 📅 01/15/1995                                                   │   │  │
│  │ └────────────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  FILE UPLOAD                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Upload Documents                                                      │  │
│  │ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   │  │
│  │                                                                       │  │
│  │ │     📁 Drag files here or click to browse                      │   │  │
│  │          PDF, JPG, PNG up to 10MB                                    │  │
│  │ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ERROR STATE                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Email Address *                                                       │  │
│  │ ┌────────────────────────────────────────────────────────────────┐   │  │
│  │ │ invalid-email                                                   │   │  │
│  │ └────────────────────────────────────────────────────────────────┘   │  │
│  │ ⚠️ Please enter a valid email address                                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NAVIGATION                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  HEADER NAVIGATION                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ 🇺🇦 IVYAR    Dashboard   My Pension   Payments   Documents    👤 ▼  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  SIDEBAR NAVIGATION                                                         │
│  ┌────────────────────┐                                                     │
│  │                    │                                                     │
│  │  📊 Dashboard      │  ← Active (highlighted)                            │
│  │                    │                                                     │
│  │  💰 My Pension     │                                                     │
│  │     ├ Overview     │                                                     │
│  │     ├ Calculation  │                                                     │
│  │     └ History      │                                                     │
│  │                    │                                                     │
│  │  💳 Payments       │                                                     │
│  │     ├ Upcoming     │                                                     │
│  │     └ History      │                                                     │
│  │                    │                                                     │
│  │  📄 Documents      │                                                     │
│  │     ├ My Files     │                                                     │
│  │     └ Upload       │                                                     │
│  │                    │                                                     │
│  │  ⚙️ Settings       │                                                     │
│  │                    │                                                     │
│  │  ❓ Help           │                                                     │
│  │                    │                                                     │
│  └────────────────────┘                                                     │
│                                                                              │
│  BREADCRUMBS                                                                │
│  Home > My Pension > Calculation Details                                    │
│                                                                              │
│  TABS                                                                       │
│  ┌──────────┬──────────┬──────────┬──────────┐                             │
│  │ Overview │ Details  │ History  │ Documents│                             │
│  ├──────────┴──────────┴──────────┴──────────┤                             │
│  │ ═══════                                    │                             │
│  └───────────────────────────────────────────┘                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Data Tables

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA TABLE                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Payment History                                              🔍 Search     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Date       │ Amount      │ Method       │ Status      │ Actions     │  │
│  ├────────────┼─────────────┼──────────────┼─────────────┼─────────────┤  │
│  │ 05.01.2025 │ 45,230 ₴   │ Bank Transfer│ ✅ Complete │ 📄 Receipt  │  │
│  ├────────────┼─────────────┼──────────────┼─────────────┼─────────────┤  │
│  │ 05.12.2024 │ 45,230 ₴   │ Bank Transfer│ ✅ Complete │ 📄 Receipt  │  │
│  ├────────────┼─────────────┼──────────────┼─────────────┼─────────────┤  │
│  │ 05.11.2024 │ 43,076 ₴   │ Bank Transfer│ ✅ Complete │ 📄 Receipt  │  │
│  ├────────────┼─────────────┼──────────────┼─────────────┼─────────────┤  │
│  │ 05.10.2024 │ 43,076 ₴   │ Postal       │ ✅ Complete │ 📄 Receipt  │  │
│  └────────────┴─────────────┴──────────────┴─────────────┴─────────────┘  │
│                                                                              │
│  ◀ Previous    Page 1 of 24    Next ▶         Showing 1-10 of 238          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Alerts & Notifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ALERTS                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SUCCESS                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ✅ Your bank details have been updated successfully                   ✕│  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  WARNING                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ⚠️ Your documents will expire in 30 days. Please renew them.         ✕│  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ERROR                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ❌ Payment failed. Please contact support.                            ✕│  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  INFO                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ℹ️ Your pension has been indexed by 5.2% effective January 2025      ✕│  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  NOTIFICATION TOAST (bottom-right)                                          │
│                                         ┌────────────────────────────────┐  │
│                                         │ ✅ Changes saved               │  │
│                                         │    2 seconds ago               │  │
│                                         └────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Page Designs

### 6.1 Dashboard (Pensioner View)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🇺🇦 IVYAR Pension Portal                         UA │ EN    👤 Ivan Petrenko│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐  ┌────────────────────────────────────────────────────┐   │
│  │ 📊 Dashboard│  │                                                     │   │
│  │             │  │  Good morning, Ivan! 👋                            │   │
│  │ 💰 Pension  │  │                                                     │   │
│  │ 💳 Payments │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │ 📄 Documents│  │  │ 💰 45,230 ₴│ │ 📅 Jan 5    │ │ 📈 +5.2%    │   │   │
│  │ ⚙️ Settings │  │  │ Current    │ │ Next        │ │ Indexation  │   │   │
│  │ ❓ Help     │  │  │ Pension    │ │ Payment     │ │ This Year   │   │   │
│  │             │  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  │             │  │                                                     │   │
│  │ ━━━━━━━━━━ │  │  📊 PENSION BREAKDOWN                               │   │
│  │             │  │  ┌─────────────────────────────────────────────┐   │   │
│  │ Quick       │  │  │                                             │   │   │
│  │ Actions:    │  │  │  Base      ████████████████░░░░  35,000 ₴  │   │   │
│  │             │  │  │  Combat    ████░░░░░░░░░░░░░░░░   5,200 ₴  │   │   │
│  │ ┌─────────┐│  │  │  Disability████████░░░░░░░░░░░░  10,500 ₴  │   │   │
│  │ │Download ││  │  │  Dependents█░░░░░░░░░░░░░░░░░░░     530 ₴  │   │   │
│  │ │Statement││  │  │  ───────────────────────────────────────────│   │   │
│  │ └─────────┘│  │  │  TOTAL                            51,230 ₴  │   │   │
│  │             │  │  │  Tax (exempt)                          0 ₴  │   │   │
│  │ ┌─────────┐│  │  │  NET PENSION                      51,230 ₴  │   │   │
│  │ │ Update  ││  │  │                                             │   │   │
│  │ │ Bank    ││  │  └─────────────────────────────────────────────┘   │   │
│  │ └─────────┘│  │                                                     │   │
│  │             │  │  📋 RECENT ACTIVITY                                │   │
│  │ ┌─────────┐│  │  ┌─────────────────────────────────────────────┐   │   │
│  │ │ Contact ││  │  │ ✅ Dec 5 - Payment received: 45,230 ₴       │   │   │
│  │ │ Support ││  │  │ 📝 Dec 1 - Indexation applied: +5.2%        │   │   │
│  │ └─────────┘│  │  │ ✅ Nov 5 - Payment received: 43,076 ₴       │   │   │
│  │             │  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────┘  └────────────────────────────────────────────────────┘   │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ © 2025 IVYAR | Privacy Policy | Terms of Service | Contact: 0-800-XXX-XXX  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Pension Calculator Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🇺🇦 IVYAR Pension Portal                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Home > My Pension > Calculation Details                                    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  💰 PENSION CALCULATION                              📄 Download PDF │  │
│  │  ════════════════════════════════════════════════════════════════════│  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ SERVICE INFORMATION                                             │ │  │
│  │  │                                                                 │ │  │
│  │  │ Rank at Retirement    Colonel (Полковник)                      │ │  │
│  │  │ Base Salary           65,000 ₴                                 │ │  │
│  │  │ Total Service         28 years                                 │ │  │
│  │  │ Combat Service        6 years (Zone A)                         │ │  │
│  │  │ Effective Years       28 + 12 = 40 years                       │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ CALCULATION BREAKDOWN                                           │ │  │
│  │  │                                                                 │ │  │
│  │  │ Step 1: Pension Percentage                                     │ │  │
│  │  │ ┌─────────────────────────────────────────────────────────────┐│ │  │
│  │  │ │ 50% + (20 × 2%) = 90% (capped at maximum)                   ││ │  │
│  │  │ └─────────────────────────────────────────────────────────────┘│ │  │
│  │  │                                                                 │ │  │
│  │  │ Step 2: Base Pension                                           │ │  │
│  │  │ ┌─────────────────────────────────────────────────────────────┐│ │  │
│  │  │ │ 65,000 ₴ × 90% = 58,500 ₴                                   ││ │  │
│  │  │ └─────────────────────────────────────────────────────────────┘│ │  │
│  │  │                                                                 │ │  │
│  │  │ Step 3: Coefficients                                           │ │  │
│  │  │ ┌─────────────────────────────────────────────────────────────┐│ │  │
│  │  │ │ Service: 1.30 (35+ years)                                   ││ │  │
│  │  │ │ Rank: 1.70 (Colonel)                                        ││ │  │
│  │  │ │ 58,500 × 1.30 × 1.70 = 129,285 ₴                           ││ │  │
│  │  │ └─────────────────────────────────────────────────────────────┘│ │  │
│  │  │                                                                 │ │  │
│  │  │ Step 4: Bonuses                                                │ │  │
│  │  │ ┌─────────────────────────────────────────────────────────────┐│ │  │
│  │  │ │ Combat: 58,500 × 2% × 6 = 7,020 ₴                          ││ │  │
│  │  │ │ Awards: 58,500 × 10% = 5,850 ₴                             ││ │  │
│  │  │ └─────────────────────────────────────────────────────────────┘│ │  │
│  │  │                                                                 │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │                          FINAL RESULT                           │ │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  │
│  │  │                                                                 │ │  │
│  │  │  Gross Pension:     142,155 ₴                                  │ │  │
│  │  │  Maximum Limit:     150,000 ₴                                  │ │  │
│  │  │  Tax (exempt):            0 ₴                                  │ │  │
│  │  │                      ─────────                                  │ │  │
│  │  │  NET PENSION:       142,155 ₴ / month                          │ │  │
│  │  │                                                                 │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │  │
│  │  │ 📄 Download  │  │ 📧 Email Me  │  │ ❓ Questions │               │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Admin Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🇺🇦 IVYAR Admin Portal                    🔔 3   👤 Admin: Olena Kovalenko │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐  ┌────────────────────────────────────────────────────┐   │
│  │ 📊 Overview │  │                                                     │   │
│  │ 👥 Pensioners│  │  FUND OVERVIEW                        📅 Dec 2025  │   │
│  │ 💳 Payments │  │                                                     │   │
│  │ 📈 Reports  │  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌─────┐ │   │
│  │ ⚖️ Compliance│  │  │ 125,430   │ │ 5.67B ₴  │ │ 45,230 ₴ │ │98.2%│ │   │
│  │ ⚙️ Settings │  │  │Pensioners │ │Monthly    │ │Average    │ │Fund │ │   │
│  │             │  │  │ +2.1%↑    │ │Liability  │ │Pension    │ │Ratio│ │   │
│  │             │  │  └───────────┘ └───────────┘ └───────────┘ └─────┘ │   │
│  │ ━━━━━━━━━━ │  │                                                     │   │
│  │             │  │  📊 MONTHLY PAYMENTS TREND                          │   │
│  │ ALERTS (3)  │  │  ┌─────────────────────────────────────────────┐   │   │
│  │             │  │  │     ▃                                        │   │   │
│  │ ⚠️ 12 pending│  │  │    ▄█▄                              ▂▃▄    │   │   │
│  │    approvals│  │  │   ▄███▄                           ▃▄████▄   │   │   │
│  │             │  │  │  ▄█████▄  ▂▃▄▅▆▇█▇▆▅▄▃▂▃▄▅▆▇████████████▄  │   │   │
│  │ ⚠️ 3 payment │  │  │ ▄███████▄██████████████████████████████████ │   │   │
│  │    failures │  │  │ Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec│   │   │
│  │             │  │  └─────────────────────────────────────────────┘   │   │
│  │ 🔴 1 fraud   │  │                                                     │   │
│  │    alert    │  │  ┌─────────────────────┐ ┌─────────────────────┐   │   │
│  │             │  │  │ BY PENSION TYPE     │ │ BY RANK CATEGORY    │   │   │
│  │             │  │  │                     │ │                     │   │   │
│  │             │  │  │ ██████ Military 78% │ │ ████ Enlisted  45% │   │   │
│  │             │  │  │ ██ Disability  12%  │ │ ████ Officers  42% │   │   │
│  │             │  │  │ █ Survivor     7%   │ │ █ Generals    13% │   │   │
│  │             │  │  │ █ Other       3%    │ │                     │   │   │
│  │             │  │  └─────────────────────┘ └─────────────────────┘   │   │
│  │             │  │                                                     │   │
│  │             │  │  PENDING TASKS                                      │   │
│  │             │  │  ┌─────────────────────────────────────────────┐   │   │
│  │             │  │  │ 🔴 Review fraud alert #FA-2025-001          │   │   │
│  │             │  │  │ 🟡 Approve 12 new pension applications       │   │   │
│  │             │  │  │ 🟡 Process 3 failed payment retries          │   │   │
│  │             │  │  │ 🟢 Generate monthly report                   │   │   │
│  │             │  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────┘  └────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Mobile Views

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│ 🇺🇦 IVYAR     ≡    │     │ 🇺🇦 IVYAR     ≡    │     │ 🇺🇦 IVYAR     ≡    │
├─────────────────────┤     ├─────────────────────┤     ├─────────────────────┤
│                     │     │                     │     │                     │
│ Good morning, Ivan! │     │ 💰 My Pension       │     │ Payment History     │
│                     │     │                     │     │                     │
│ ┌─────────────────┐ │     │ ┌─────────────────┐ │     │ 🔍 Search...        │
│ │   💰 45,230 ₴   │ │     │ │ Monthly Pension │ │     │                     │
│ │ Current Pension │ │     │ │                 │ │     │ ┌─────────────────┐ │
│ └─────────────────┘ │     │ │   45,230 ₴     │ │     │ │ Jan 5, 2025     │ │
│                     │     │ │                 │ │     │ │ 45,230 ₴        │ │
│ ┌─────────────────┐ │     │ │ +5.2% indexed  │ │     │ │ ✅ Complete     │ │
│ │   📅 Jan 5      │ │     │ └─────────────────┘ │     │ └─────────────────┘ │
│ │ Next Payment    │ │     │                     │     │                     │
│ └─────────────────┘ │     │ Breakdown:          │     │ ┌─────────────────┐ │
│                     │     │                     │     │ │ Dec 5, 2024     │ │
│ Quick Actions       │     │ Base        35,000 │     │ │ 45,230 ₴        │ │
│                     │     │ Combat       5,200 │     │ │ ✅ Complete     │ │
│ ┌────────┐┌────────┐│     │ Disability  10,500 │     │ └─────────────────┘ │
│ │Download││ Update ││     │ Dependents     530 │     │                     │
│ │  PDF   ││  Bank  ││     │ ────────────────── │     │ ┌─────────────────┐ │
│ └────────┘└────────┘│     │ TOTAL       51,230 │     │ │ Nov 5, 2024     │ │
│                     │     │                     │     │ │ 43,076 ₴        │ │
│ ┌────────┐┌────────┐│     │ ┌─────────────────┐ │     │ │ ✅ Complete     │ │
│ │Contact ││  Help  ││     │ │  View Details   │ │     │ └─────────────────┘ │
│ │Support ││        ││     │ └─────────────────┘ │     │                     │
│ └────────┘└────────┘│     │                     │     │ Load More...        │
│                     │     │                     │     │                     │
├─────────────────────┤     ├─────────────────────┤     ├─────────────────────┤
│ 🏠  💰  💳  📄  ⚙️  │     │ 🏠  💰  💳  📄  ⚙️  │     │ 🏠  💰  💳  📄  ⚙️  │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
   HOME                        MY PENSION                  PAYMENTS
```

---

## 7. Responsive Design

### 7.1 Breakpoint Behavior

| Breakpoint | Sidebar | Cards | Table | Navigation |
|------------|---------|-------|-------|------------|
| Mobile (<576px) | Hidden | Stack | Scroll | Bottom bar |
| Tablet (576-992px) | Collapsed | 2-col | Scroll | Hamburger |
| Desktop (992-1200px) | Visible | 3-col | Full | Full |
| Large (>1200px) | Visible | 4-col | Full | Full |

### 7.2 Touch Targets

- Minimum touch target: 44×44px
- Spacing between targets: 8px minimum
- Large buttons for elderly users: 56×56px

---

## 8. Accessibility

### 8.1 WCAG 2.1 AA Compliance

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.4.3 | Contrast 4.5:1 | All text meets ratio |
| 1.4.4 | Text resize 200% | No content loss |
| 2.1.1 | Keyboard access | Full keyboard nav |
| 2.4.7 | Focus visible | Custom focus ring |
| 3.3.2 | Labels | All inputs labeled |

### 8.2 Accessibility Features

```css
/* Focus indicators */
:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --primary-500: #0000FF;
    --text-primary: #000000;
    --background: #FFFFFF;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* Large text mode */
.large-text-mode {
  font-size: 125%;
  line-height: 1.8;
}
```

### 8.3 Screen Reader Support

- ARIA labels on all interactive elements
- Live regions for dynamic content
- Landmark roles for navigation
- Skip links for main content

---

## 9. Icons & Illustrations

### 9.1 Icon System

Using **Lucide Icons** (MIT License)

| Category | Icons |
|----------|-------|
| Navigation | Home, User, Settings, Menu, ChevronRight |
| Actions | Download, Upload, Edit, Trash, Plus |
| Status | CheckCircle, AlertCircle, XCircle, Info |
| Finance | Wallet, CreditCard, TrendingUp, Calculator |
| Documents | FileText, File, Folder, Paperclip |

### 9.2 Illustration Style

- Flat design with subtle shadows
- Ukrainian color palette (blue/yellow accents)
- Inclusive representation
- Military and civilian imagery

---

## 10. Implementation

### 10.1 React Components

```tsx
// Button Component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  size: 'small' | 'medium' | 'large' | 'xlarge';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

// Card Component
interface CardProps {
  variant: 'stat' | 'info' | 'action' | 'summary';
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

// PensionBreakdown Component
interface PensionBreakdownProps {
  basePension: number;
  combatBonus: number;
  disabilityBonus: number;
  dependentsBonus: number;
  totalPension: number;
  currency?: string;
}
```

### 10.2 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          500: '#0057B8',
          700: '#0D47A1',
        },
        secondary: {
          500: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
};
```

### 10.3 Component Library Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Table/
│   │   ├── Alert/
│   │   └── Modal/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── PageLayout/
│   ├── pension/
│   │   ├── PensionCard/
│   │   ├── PensionBreakdown/
│   │   ├── PensionCalculator/
│   │   └── PaymentHistory/
│   └── admin/
│       ├── Dashboard/
│       ├── PensionerList/
│       └── Reports/
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── components/
└── assets/
    ├── icons/
    └── illustrations/
```

---

## Summary

This UI Design System provides a comprehensive foundation for the IVYAR Pension Fund Portal, ensuring:

- **Accessibility** for elderly users
- **Trust** through professional design
- **Efficiency** with clear information hierarchy
- **Responsiveness** across all devices
- **Compliance** with WCAG 2.1 AA standards

---

*IVYAR Pension Fund Portal - UI Design System*
*Version 1.0 | December 2025*
