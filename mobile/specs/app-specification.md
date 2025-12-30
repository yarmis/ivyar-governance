# IVYAR Mobile App Specification

## 1. User Roles & Permissions

| Role | Search | Scan | Repairs | Fleet | AI | Reports |
|------|:------:|:----:|:-------:|:-----:|:--:|:-------:|
| Operator | ✅ | ✅ | View | View | ✅ | ❌ |
| Technician | ✅ | ✅ | Full | View | ✅ | ❌ |
| Logistics | ✅ | ✅ | View | View | ✅ | View |
| Manager | ✅ | ✅ | Full | Full | ✅ | Full |

## 2. Screen Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              APP NAVIGATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐                                                               │
│  │  Splash  │                                                               │
│  └────┬─────┘                                                               │
│       │                                                                      │
│       ▼                                                                      │
│  ┌──────────┐     ┌──────────┐                                              │
│  │  Login   │────▶│   MFA    │                                              │
│  └────┬─────┘     └────┬─────┘                                              │
│       │                │                                                     │
│       └────────┬───────┘                                                     │
│                ▼                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        MAIN TAB NAVIGATOR                            │   │
│  ├──────────┬──────────┬──────────┬──────────┬──────────┐              │   │
│  │   Home   │  Search  │  Repairs │  Fleet   │  Profile │              │   │
│  │    🏠    │    🔍    │    🔧    │    🚗    │    👤    │              │   │
│  └────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬─────┘              │   │
│       │          │          │          │          │                     │   │
│       ▼          ▼          ▼          ▼          ▼                     │   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │Dashboard│ │ Search  │ │Repair   │ │ Fleet   │ │Settings │           │   │
│  │         │ │ Results │ │  List   │ │  List   │ │         │           │   │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └─────────┘           │   │
│       │          │          │          │                                │   │
│       │          ▼          ▼          ▼                                │   │
│       │     ┌─────────┐ ┌─────────┐ ┌─────────┐                        │   │
│       │     │  Part   │ │ Repair  │ │ Vehicle │                        │   │
│       │     │ Details │ │ Details │ │ Details │                        │   │
│       │     └────┬────┘ └─────────┘ └─────────┘                        │   │
│       │          │                                                      │   │
│       │          ▼                                                      │   │
│       │     ┌─────────┐                                                │   │
│       │     │ Analogs │                                                │   │
│       │     └─────────┘                                                │   │
│       │                                                                 │   │
│       └──────────────────────┐                                         │   │
│                              ▼                                          │   │
│                         ┌─────────┐                                    │   │
│                         │   AI    │                                    │   │
│                         │ Advisor │                                    │   │
│                         └─────────┘                                    │   │
│                                                                         │   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3. Screen Specifications

### 3.1 Home Dashboard

**Purpose:** Quick overview and shortcuts

**Components:**
- Fleet readiness card (percentage + trend)
- Active repairs count
- Quick action buttons (Search, Scan, New Repair)
- Recent activity list
- Alerts/notifications

**Data Requirements:**
- Fleet summary from `/v1/fleet/readiness`
- Active repairs from `/v1/repairs?status=active`
- Recent activity from local storage + API

### 3.2 Part Search

**Purpose:** Find parts by text, barcode, or voice

**Components:**
- Search input with voice button
- Scan barcode button
- Filter chips (Category, Brand, Platform)
- Results list with PartCard
- Empty state / Loading state

**Search Modes:**
1. Text search (debounced 300ms)
2. Barcode scan (camera)
3. Voice input (speech-to-text)

**API:** `POST /v1/catalog/search`

### 3.3 Part Details

**Purpose:** Full part information

**Sections:**
1. Header (image, part number, brand)
2. Description (EN/UK)
3. Specifications table
4. Fitment list
5. Repair coverage badges (R1-R4)
6. Analogs button
7. Safety warnings (if applicable)

**Actions:**
- Find Analogs
- Add to Repair
- Share Part
- Save to Favorites

**API:** `GET /v1/catalog/parts/{id}?include=analogs,fitment`

### 3.4 Analog Finder

**Purpose:** Find alternative parts

**Components:**
- Original part card
- Confidence filter slider
- Type filter (OEM, Aftermarket)
- Analog list with confidence badges
- Comparison modal

**API:** `GET /v1/catalog/analogs/{partNumber}`

### 3.5 Repair List

**Purpose:** View and manage repairs

**Tabs:**
- Active
- Waiting
- Completed

**Components:**
- Filter bar (Level, Priority, Workshop)
- Repair cards with status indicator
- FAB for new repair (technician+)

**API:** `GET /v1/repairs`

### 3.6 Repair Details

**Purpose:** Full repair information and actions

**Sections:**
1. Header (ticket #, status badge, priority)
2. Vehicle info
3. Issue description
4. Progress bar
5. Timeline / Activity log
6. Parts used list
7. Action buttons

**Actions (by status):**
- Waiting: Start, Escalate
- Active: Update Progress, Add Parts, Complete, Hold
- On Hold: Resume, Escalate

**API:** `GET /v1/repairs/{id}`, `PATCH /v1/repairs/{id}`

### 3.7 New Repair

**Purpose:** Create repair ticket

**Form Fields:**
- Vehicle (search/scan)
- Issue description
- Repair level (R1-R4)
- Priority (Low-Critical)
- Notes

**Validation:**
- Vehicle required
- Issue min 10 chars
- Level required

**API:** `POST /v1/repairs`

### 3.8 Fleet List

**Purpose:** View vehicle status

**Components:**
- Summary cards (Operational, In Repair, Pending)
- Filter bar (Status, Platform, Unit)
- Vehicle list
- Map view toggle

**API:** `GET /v1/fleet/vehicles`

### 3.9 Vehicle Details

**Purpose:** Vehicle information and history

**Sections:**
1. Header (ID, platform, status)
2. Specifications
3. Current location (if available)
4. Repair history
5. Maintenance schedule

**API:** `GET /v1/fleet/vehicles/{id}`

### 3.10 AI Advisor

**Purpose:** AI-powered assistant

**Components:**
- Chat message list
- Input bar with send button
- Voice input button
- Suggested actions
- Citation links

**Features:**
- Streaming responses
- Context awareness (current screen)
- Part/repair linking

**API:** `POST /v1/ai/ask`, `GET /v1/ai/stream`

### 3.11 Settings

**Purpose:** App configuration

**Sections:**
- Account info
- Language selection
- Notification preferences
- Offline data (sync status, clear)
- Theme (Light/Dark/System)
- About (version, licenses)
- Logout

## 4. Offline Capabilities

| Data | Storage | Sync |
|------|---------|------|
| User profile | MMKV | On login |
| Part catalog (subset) | SQLite | Daily |
| Favorite parts | SQLite | Real-time |
| Active repairs | SQLite | Real-time |
| Repair procedures | SQLite | Weekly |
| Search history | MMKV | Local only |

**Sync Strategy:**
1. Queue offline actions
2. Sync on connectivity restore
3. Conflict resolution: server wins with notification

## 5. Push Notifications

| Event | Priority | Action |
|-------|----------|--------|
| Repair assigned | High | Open repair |
| Repair escalated | High | Open repair |
| Parts arrived | Medium | Open repair |
| Fleet alert | High | Open fleet |
| System update | Low | Open settings |

## 6. Security

| Feature | Implementation |
|---------|----------------|
| Authentication | JWT + Refresh token |
| Biometric | Face ID / Fingerprint |
| PIN backup | 6-digit PIN |
| Session timeout | 15 min inactive |
| Certificate pinning | Production only |
| Encrypted storage | MMKV encryption |
| Remote wipe | Push notification trigger |

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| App launch (cold) | < 2s |
| App launch (warm) | < 500ms |
| Screen transition | < 300ms |
| Search response | < 1s |
| Image load | < 500ms |
| Offline detection | < 1s |
| Memory usage | < 200MB |
| Bundle size | < 50MB |

## 8. Accessibility

- VoiceOver / TalkBack support
- Dynamic font scaling
- Color contrast WCAG AA
- Touch targets 44x44 minimum
- Screen reader labels
- Reduce motion support
