// frontend/src/modules/landing/sections/roadmap-section.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { RoadmapItemComponent } from '@/modules/landing/components/roadmap-item'
import { roadmapData } from '@/modules/landing/content/roadmap'

export function RoadmapSection() {
  const { t } = useTranslation('landing')
  const roadmap = roadmapData()

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('roadmap.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('roadmap.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-0">
          {roadmap.map((item, index) => (
            <RoadmapItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
