// src/shared/i18n/module-loader.ts
import i18n from '@/shared/i18n/config'

const initializedNamespaces = new Set<string>()

export function createModuleI18nLoader(
  namespace: string,
  loadLang: (lang: string) => Promise<{ default: unknown }>,
  loadFallback: () => Promise<{ default: unknown }>,
) {
  async function loadNamespace(lng: string) {
    const lang = (lng || i18n.language || 'en').split('-')[0]
    if (i18n.hasResourceBundle(lang, namespace)) return
    
    try {
      const mod = await loadLang(lang)
      i18n.addResourceBundle(lang, namespace, mod.default, true, true)
    } catch {
      try {
        const fallback = await loadFallback()
        i18n.addResourceBundle(lang, namespace, fallback.default, true, true)
      } catch {
        // no-op
      }
    }
  }

  return async function ensureModuleI18n() {
    // Pre-carica tutte le lingue supportate per evitare race condition al cambio lingua
    const supportedLngs = i18n.options.supportedLngs
    const supportedLanguages = (Array.isArray(supportedLngs) ? supportedLngs : ['en', 'it'])
      .filter((lng: string) => lng !== 'cimode')
    await Promise.all(supportedLanguages.map((lng: string) => loadNamespace(lng)))
    
    if (!initializedNamespaces.has(namespace)) {
      initializedNamespaces.add(namespace)
      i18n.on('languageChanged', (lng) => {
        void loadNamespace(lng)
      })
    }
  }
}
