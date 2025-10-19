// frontend/src/modules/landing/components/roadmap-item.tsx
import { type RoadmapItem } from '@/modules/landing/types'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface RoadmapItemProps {
  item: RoadmapItem
  index: number
}

export function RoadmapItemComponent({ item, index }: RoadmapItemProps) {
  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-primary" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusLabel = () => {
    switch (item.status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In progress'
      default:
        return 'Planned'
    }
  }

  return (
    <motion.div 
      className="relative pl-8 pb-8 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="absolute left-0 top-0 flex flex-col items-center">
        {getStatusIcon()}
        <div className="w-0.5 h-full bg-border/50 mt-2 group-last:hidden" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground">
            Fase {item.phase}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {getStatusLabel()}
          </span>
        </div>
        <h4 className="text-base font-semibold text-foreground">
          {item.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
