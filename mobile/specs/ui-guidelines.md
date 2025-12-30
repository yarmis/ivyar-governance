# IVYAR Mobile UI Guidelines

## 1. Color Palette

### Light Theme
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #1a365d | Buttons, links, accents |
| primaryLight | #2c5282 | Hover states |
| background | #f7fafc | Screen background |
| backgroundSecondary | #edf2f7 | Cards, inputs |
| card | #ffffff | Card backgrounds |
| text | #1a202c | Primary text |
| textSecondary | #718096 | Secondary text |
| border | #e2e8f0 | Borders, dividers |
| error | #e53e3e | Error states |
| warning | #dd6b20 | Warning states |
| success | #38a169 | Success states |

### Dark Theme
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #63b3ed | Buttons, links |
| background | #1a202c | Screen background |
| card | #2d3748 | Card backgrounds |
| text | #f7fafc | Primary text |
| textSecondary | #a0aec0 | Secondary text |
| border | #4a5568 | Borders |

## 2. Typography

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| H1 | System | 28 | Bold | 34 |
| H2 | System | 24 | Bold | 30 |
| H3 | System | 20 | SemiBold | 26 |
| Body | System | 16 | Regular | 22 |
| BodySmall | System | 14 | Regular | 20 |
| Caption | System | 12 | Regular | 16 |
| Button | System | 16 | SemiBold | 22 |

## 3. Spacing

| Token | Value |
|-------|-------|
| xs | 4 |
| sm | 8 |
| md | 16 |
| lg | 24 |
| xl | 32 |
| xxl | 48 |

## 4. Components

### Buttons
- Height: 48px (primary), 40px (secondary)
- Border radius: 12px
- Min width: 120px
- Padding horizontal: 24px

### Cards
- Border radius: 12px
- Padding: 16px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)

### Inputs
- Height: 48px
- Border radius: 12px
- Border width: 1.5px
- Padding horizontal: 16px

### Badges
- Height: 24px
- Border radius: 6px (small), 12px (pill)
- Padding horizontal: 10px

## 5. Icons

Using Lucide React Native icons:
- Size small: 16px
- Size default: 20px
- Size large: 24px
- Tab bar: 24px

## 6. Animations

| Type | Duration | Easing |
|------|----------|--------|
| Fade | 200ms | ease-out |
| Slide | 300ms | ease-in-out |
| Scale | 200ms | ease-out |
| Bounce | 400ms | spring |

## 7. Touch Targets

- Minimum: 44x44px
- Recommended: 48x48px
- Hit slop: 8px all sides

## 8. Status Colors

| Status | Color |
|--------|-------|
| Operational | #38a169 |
| In Repair | #3182ce |
| Pending | #dd6b20 |
| Critical | #e53e3e |

| Priority | Color |
|----------|-------|
| Critical | #e53e3e |
| High | #dd6b20 |
| Medium | #ecc94b |
| Low | #38a169 |

| Repair Level | Color |
|--------------|-------|
| R1 | #38a169 |
| R2 | #3182ce |
| R3 | #dd6b20 |
| R4 | #e53e3e |
