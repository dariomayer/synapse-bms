// src/modules/module-template/i18n/index.ts
import { createModuleI18nLoader } from '@/shared/i18n/module-loader'

// Import statici per compatibilità con Vite build
import en from './en.json'
import it from './it.json'

const translations: Record<string, unknown> = { en, it }

// Sostituisci 'module-template' con il namespace del tuo modulo
export const ensureModuleTemplateI18n = createModuleI18nLoader(
  'module-template',
  (lang: string) => Promise.resolve({ default: translations[lang] || translations.en }),
  () => Promise.resolve({ default: en }),
)
