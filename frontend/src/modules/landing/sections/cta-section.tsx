// frontend/src/modules/landing/sections/cta-section.tsx
import { useTranslation } from 'react-i18next'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTASection() {
  const { t } = useTranslation('landing')

  return (
    <section className="relative w-full py-24 px-6">
      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('cta.title')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com/dariopratola/synapse-bms"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t('cta.github')}
          </a>
          <a
            href="https://github.com/dariopratola/synapse-bms#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            {t('cta.documentation')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            {t('cta.footer')}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
