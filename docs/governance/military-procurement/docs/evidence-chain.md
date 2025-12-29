# Evidence Chain

## Overview / Огляд

The Evidence Chain is the backbone of trust: a tamper-resistant, time-ordered record of what was known, considered, and decided.

Evidence Chain — це хребет довіри: стійкий до змін, хронологічний запис того, що було відомо, розглянуто та вирішено.

## Components / Компоненти

### Event Log / Журнал подій
**EN:** Captures all key actions and status changes.

**UA:** Фіксує всі ключові дії та зміни статусів.

### Explainability Graph / Граф пояснюваності
**EN:** Shows how rules, risks and ethics led to a decision.

**UA:** Показує, як правила, ризики та етика привели до рішення.

### ZIP/Manifest Export / ZIP/Manifest експорт
**EN:** Bundles evidence with checksums for external audit.

**UA:** Формує пакет доказів з контрольними сумами для зовнішнього аудиту.

## Structure / Структура

```
evidence/
├── manifest/
│   ├── evidence-manifest.json
│   └── evidence-index.csv
├── logs/
│   ├── events.log
│   ├── decisions.log
│   └── explainability-graph.json
└── exports/
    ├── evidence-package.zip
    └── evidence-checksums.sha256
```

## Audit Support / Підтримка аудиту

Evidence Chain provides:
- Immutable event logging
- Decision traceability
- Checksummed exports
- Integration with Audit Interface

---
Version: 1.0 | Last Updated: 2025-12-28
