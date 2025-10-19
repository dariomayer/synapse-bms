// frontend/src/modules/landing/components/protocol-badge.tsx
import { type Protocol } from '@/modules/landing/types'
import { motion } from 'framer-motion'

interface ProtocolBadgeProps {
  protocol: Protocol
  index: number
}

export function ProtocolBadge({ protocol, index }: ProtocolBadgeProps) {
  return (
    <motion.div 
      className="group relative p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/60 hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="text-4xl">{protocol.icon}</div>
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {protocol.name}
        </h4>
        <p className="text-xs text-muted-foreground leading-snug">
          {protocol.description}
        </p>
      </div>
    </motion.div>
  )
}
