// frontend/src/modules/landing/content/features.ts
import { type Feature } from '@/modules/landing/types'
import i18next from 'i18next'

export function featuresData(): Feature[] {
  return [
    {
      icon: '🌐',
      title: i18next.t('landing:features.items.gateway.title'),
      description: i18next.t('landing:features.items.gateway.description'),
    },
    {
      icon: '📊',
      title: i18next.t('landing:features.items.dashboard.title'),
      description: i18next.t('landing:features.items.dashboard.description'),
    },
    {
      icon: '🏢',
      title: i18next.t('landing:features.items.digitalTwin.title'),
      description: i18next.t('landing:features.items.digitalTwin.description'),
    },
    {
      icon: '🔌',
      title: i18next.t('landing:features.items.mqtt.title'),
      description: i18next.t('landing:features.items.mqtt.description'),
    },
    {
      icon: '🔐',
      title: i18next.t('landing:features.items.rbac.title'),
      description: i18next.t('landing:features.items.rbac.description'),
    },
    {
      icon: '🐳',
      title: i18next.t('landing:features.items.docker.title'),
      description: i18next.t('landing:features.items.docker.description'),
    },
  ]
}
