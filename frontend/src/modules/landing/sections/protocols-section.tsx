// frontend/src/modules/landing/sections/protocols-section.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ProtocolBadge } from '@/modules/landing/components/protocol-badge'
import { protocolsData } from '@/modules/landing/content/protocols'

export function ProtocolsSection() {
  const { t } = useTranslation('landing')
  const protocols = protocolsData()

  return (
    <section className="relative w-full py-24 px-6 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('protocols.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('protocols.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {protocols.map((protocol, index) => (
            <ProtocolBadge key={index} protocol={protocol} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
