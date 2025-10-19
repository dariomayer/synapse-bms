// frontend/src/modules/landing/content/roadmap.ts
import { type RoadmapItem } from '@/modules/landing/types'
import i18next from 'i18next'

export function roadmapData(): RoadmapItem[] {
  return [
    {
      phase: 1,
      title: i18next.t('landing:roadmap.items.phase1.title'),
      description: i18next.t('landing:roadmap.items.phase1.description'),
      status: 'in-progress',
    },
    {
      phase: 2,
      title: i18next.t('landing:roadmap.items.phase2.title'),
      description: i18next.t('landing:roadmap.items.phase2.description'),
      status: 'planned',
    },
    {
      phase: 3,
      title: i18next.t('landing:roadmap.items.phase3.title'),
      description: i18next.t('landing:roadmap.items.phase3.description'),
      status: 'planned',
    },
    {
      phase: 4,
      title: i18next.t('landing:roadmap.items.phase4.title'),
      description: i18next.t('landing:roadmap.items.phase4.description'),
      status: 'planned',
    },
    {
      phase: 5,
      title: i18next.t('landing:roadmap.items.phase5.title'),
      description: i18next.t('landing:roadmap.items.phase5.description'),
      status: 'planned',
    },
  ]
}
