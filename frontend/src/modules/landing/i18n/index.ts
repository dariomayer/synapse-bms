// frontend/src/modules/landing/i18n/index.ts
import i18next from 'i18next'
import enTranslations from './en.json'
import itTranslations from './it.json'

export async function ensureLandingI18n() {
  const currentLanguage = i18next.language || 'it'

  if (!i18next.hasResourceBundle('it', 'landing')) {
    i18next.addResourceBundle('it', 'landing', itTranslations, true, true)
  }

  if (!i18next.hasResourceBundle('en', 'landing')) {
    i18next.addResourceBundle('en', 'landing', enTranslations, true, true)
  }

  if (i18next.language !== currentLanguage) {
    await i18next.changeLanguage(currentLanguage)
  }

  return true
}
