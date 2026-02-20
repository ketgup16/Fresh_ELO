import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';
import enMarty from './locales/en/marty.json';

import esCommon from './locales/es/common.json';
import esPages from './locales/es/pages.json';
import esMarty from './locales/es/marty.json';

import frCommon from './locales/fr/common.json';
import frPages from './locales/fr/pages.json';
import frMarty from './locales/fr/marty.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        pages: enPages,
        marty: enMarty,
      },
      es: {
        common: esCommon,
        pages: esPages,
        marty: esMarty,
      },
      fr: {
        common: frCommon,
        pages: frPages,
        marty: frMarty,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'pages', 'marty'],
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
