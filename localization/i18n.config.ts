/**
 * i18n Configuration
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import enCommon from './en/common.json';
import enParts from './en/parts.json';
import enRepairs from './en/repairs.json';
import enFleet from './en/fleet.json';
import enAI from './en/ai.json';
import enErrors from './en/errors.json';

// Ukrainian
import ukCommon from './uk/common.json';
import ukParts from './uk/parts.json';
import ukRepairs from './uk/repairs.json';
import ukFleet from './uk/fleet.json';
import ukAI from './uk/ai.json';
import ukErrors from './uk/errors.json';

// German
import deCommon from './de/common.json';
import deParts from './de/parts.json';
import deRepairs from './de/repairs.json';
import deFleet from './de/fleet.json';
import deAI from './de/ai.json';
import deErrors from './de/errors.json';

// Polish
import plCommon from './pl/common.json';
import plParts from './pl/parts.json';
import plRepairs from './pl/repairs.json';
import plFleet from './pl/fleet.json';
import plAI from './pl/ai.json';
import plErrors from './pl/errors.json';

export const resources = {
  en: {
    common: enCommon,
    parts: enParts,
    repairs: enRepairs,
    fleet: enFleet,
    ai: enAI,
    errors: enErrors,
  },
  uk: {
    common: ukCommon,
    parts: ukParts,
    repairs: ukRepairs,
    fleet: ukFleet,
    ai: ukAI,
    errors: ukErrors,
  },
  de: {
    common: deCommon,
    parts: deParts,
    repairs: deRepairs,
    fleet: deFleet,
    ai: deAI,
    errors: deErrors,
  },
  pl: {
    common: plCommon,
    parts: plParts,
    repairs: plRepairs,
    fleet: plFleet,
    ai: plAI,
    errors: plErrors,
  },
};

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'parts', 'repairs', 'fleet', 'ai', 'errors'],
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
