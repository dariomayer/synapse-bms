// frontend/src/modules/landing/sections/features-section.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FeatureCard } from '@/modules/landing/components/feature-card'
import { featuresData } from '@/modules/landing/content/features'

export function FeaturesSection() {
  const { t } = useTranslation('landing')
  const features = featuresData()

  return (
    <section id="features" className="relative w-full py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
