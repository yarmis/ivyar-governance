# Daily Operations Report Template

## Report Header

```
═══════════════════════════════════════════════════════════════════════════════
                        IVYAR DAILY OPERATIONS REPORT
                           {DATE} | {CLASSIFICATION}
═══════════════════════════════════════════════════════════════════════════════
```

## Section 1: Executive Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXECUTIVE SUMMARY                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Overall Status: {GREEN/YELLOW/RED}                                          │
│                                                                              │
│  Key Metrics:                                                                │
│  • Fleet Readiness:    {VALUE}% ({CHANGE} vs yesterday)                     │
│  • Active Repairs:     {VALUE} ({CHANGE} vs yesterday)                      │
│  • Completed Today:    {VALUE}                                               │
│  • Critical Issues:    {VALUE}                                               │
│                                                                              │
│  Summary: {2-3 sentence overview}                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 2: Fleet Status

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             FLEET STATUS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Platform Type    │ Total │ Operational │ In Repair │ Rate   │ vs Target   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  LTV              │  520  │    452      │    48     │ 87.0%  │   +2.0%     │
│  MTV              │  280  │    230      │    35     │ 82.0%  │   -3.0%     │
│  HTV              │  180  │    122      │    42     │ 68.0%  │  -17.0%     │
│  APC              │  150  │    108      │    28     │ 72.0%  │   -8.0%     │
│  IFV              │   85  │     69      │    12     │ 81.0%  │   -4.0%     │
│  MBT              │   32  │     19      │    10     │ 58.0%  │  -12.0%     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  TOTAL            │ 1247  │    973      │   175     │ 78.0%  │   -7.0%     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 3: Repair Activity

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           REPAIR ACTIVITY                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Repairs Started:     {VALUE}                                                │
│  Repairs Completed:   {VALUE}                                                │
│  Average MTTR (R2):   {VALUE} hours                                          │
│  First-Time Fix Rate: {VALUE}%                                               │
│                                                                              │
│  By Repair Level:                                                            │
│  • R1 (Field):        {VALUE} started │ {VALUE} completed                   │
│  • R2 (Base):         {VALUE} started │ {VALUE} completed                   │
│  • R3 (Regional):     {VALUE} started │ {VALUE} completed                   │
│  • R4 (Factory):      {VALUE} started │ {VALUE} completed                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 4: Critical Issues

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CRITICAL ISSUES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  {ISSUE 1}                                                                   │
│  Vehicle: {ID} | Platform: {TYPE} | Issue: {DESCRIPTION}                    │
│  Status: {STATUS} | Duration: {DAYS} days | ETA: {DATE}                     │
│  Action: {REQUIRED ACTION}                                                   │
│                                                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                              │
│  {ISSUE 2}                                                                   │
│  ...                                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 5: Parts & Supply

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PARTS & SUPPLY                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Parts Issued Today:     {VALUE}                                             │
│  Parts on Order:         {VALUE}                                             │
│  Critical Stockouts:     {VALUE}                                             │
│  Expected Deliveries:    {VALUE}                                             │
│                                                                              │
│  Awaited Parts:                                                              │
│  • {PART 1}: Qty {QTY}, ETA {DATE}                                          │
│  • {PART 2}: Qty {QTY}, ETA {DATE}                                          │
│  • ...                                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 6: Recommendations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RECOMMENDATIONS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. {RECOMMENDATION 1}                                                       │
│     Priority: {HIGH/MED/LOW} | Owner: {ROLE} | Deadline: {DATE}             │
│                                                                              │
│  2. {RECOMMENDATION 2}                                                       │
│     Priority: {HIGH/MED/LOW} | Owner: {ROLE} | Deadline: {DATE}             │
│                                                                              │
│  3. {RECOMMENDATION 3}                                                       │
│     Priority: {HIGH/MED/LOW} | Owner: {ROLE} | Deadline: {DATE}             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Report Footer

```
═══════════════════════════════════════════════════════════════════════════════
Generated: {TIMESTAMP} | Report ID: {ID} | Classification: {LEVEL}
Next Report: {NEXT_DATE} 08:00 UTC
Contact: ops-center@ivyar.io
═══════════════════════════════════════════════════════════════════════════════
```
