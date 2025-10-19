// src/shared/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './en.json'
import itCommon from './it.json'

const initPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      it: { common: itCommon },
    },
    supportedLngs: ['en', 'it'],
    load: 'languageOnly',
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  })

// Sincronizza l'attributo lang quando cambia la lingua
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  localStorage.setItem('i18nextLng', lng)
})

export { initPromise }
export default i18n
