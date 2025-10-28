// frontend/src/modules/landing/sections/hero-section.tsx
import { useTranslation } from 'react-i18next'
import { ArrowRight, Github } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const { t } = useTranslation('landing')

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 pt-24 pb-16">
      <motion.div 
        className="max-w-5xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t('hero.badge')}
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            {t('hero.title')}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a
            href="https://github.com/dariomayer/synapse-bms"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t('hero.cta.github')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            {t('hero.cta.discover')}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
