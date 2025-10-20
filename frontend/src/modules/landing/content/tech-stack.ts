// frontend/src/modules/landing/content/tech-stack.ts
import { type Technology } from '@/modules/landing/types'
import i18next from 'i18next'

export function techStackData(): Technology[] {
  return [
    {
      category: i18next.t('landing:techStack.categories.backend'),
      items: ['Node.js', 'TypeScript', 'Express', 'WebSocket', 'PostgreSQL'],
    },
    {
      category: i18next.t('landing:techStack.categories.frontend'),
      items: ['React 18', 'Vite', 'TypeScript', 'Redux', 'i18next'],
    },
    {
      category: i18next.t('landing:techStack.categories.protocols'),
      items: ['BACnet/IP', 'Modbus TCP', 'KNX', 'MQTT', 'REST API'],
    },
    {
      category: i18next.t('landing:techStack.categories.visualization'),
      items: ['Three.js', 'Recharts', 'Framer Motion'],
    },
    {
      category: i18next.t('landing:techStack.categories.ui'),
      items: ['Tailwind CSS v4', 'shadcn/ui', 'Lucide React'],
    },
    {
      category: i18next.t('landing:techStack.categories.deployment'),
      items: ['Docker', 'CapRover', 'InfluxDB', 'Grafana'],
    },
  ]
}
