# IVYAR Localization

## Overview

Multi-language support for IVYAR platform with 4 languages.

## Supported Languages

| Code | Language | Status | Completeness |
|------|----------|--------|--------------|
| en | English | ✅ Base | 100% |
| uk | Українська | ✅ Complete | 100% |
| de | Deutsch | ✅ Complete | 100% |
| pl | Polski | ✅ Complete | 100% |

## Structure

```
localization/
├── en/                 # English (base)
│   ├── common.json     # Common UI strings
│   ├── parts.json      # Parts catalog
│   ├── repairs.json    # Repair module
│   ├── fleet.json      # Fleet management
│   ├── ai.json         # AI Advisor
│   └── errors.json     # Error messages
├── uk/                 # Ukrainian
├── de/                 # German
└── pl/                 # Polish
```

## Usage (React)

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.app_name')}</h1>
      <p>{t('parts.search.placeholder')}</p>
    </div>
  );
}
```

## Usage (React Native)

```tsx
import { useTranslation } from 'react-i18next';

const MyScreen = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <View>
      <Text>{t('common.welcome')}</Text>
    </View>
  );
};
```

## Interpolation

```json
{
  "results_count": "Found {{count}} parts",
  "greeting": "Hello, {{name}}!"
}
```

```tsx
t('results_count', { count: 42 })  // "Found 42 parts"
t('greeting', { name: 'Іван' })    // "Hello, Іван!"
```

## Pluralization

```json
{
  "parts_count": {
    "one": "{{count}} part",
    "other": "{{count}} parts"
  }
}
```

## Adding New Language

1. Create folder: `localization/{code}/`
2. Copy all JSON files from `en/`
3. Translate all values
4. Register in i18n config
5. Add to language selector

*Version: 1.0.0 | December 2025*
