// src/modules/module-template/pages/module-template-page.tsx
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ensureModuleTemplateI18n } from '@/modules/module-template/i18n'

export function ModuleTemplatePage() {
  useEffect(() => {
    void ensureModuleTemplateI18n()
  }, [])

  const { t } = useTranslation('module-template')

  return (
    <main className="min-h-dvh flex items-center justify-center px-6 md:px-12 lg:px-16 xl:px-24">
      <section className="w-full max-w-3xl space-y-6 rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm p-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('welcome')}</p>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{t('description')}</p>
        <div>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-3 py-1 border border-border/50 bg-foreground/5 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {t('cta')}
          </button>
        </div>
      </section>
    </main>
  )
}
