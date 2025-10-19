// frontend/src/modules/landing/content/protocols.ts
import { type Protocol } from '@/modules/landing/types'
import i18next from 'i18next'

export function protocolsData(): Protocol[] {
  return [
    {
      name: 'BACnet/IP',
      description: i18next.t('landing:protocols.items.bacnet'),
      icon: '🏗️',
    },
    {
      name: 'Modbus TCP',
      description: i18next.t('landing:protocols.items.modbus'),
      icon: '⚙️',
    },
    {
      name: 'KNX',
      description: i18next.t('landing:protocols.items.knx'),
      icon: '💡',
    },
    {
      name: 'MQTT',
      description: i18next.t('landing:protocols.items.mqtt'),
      icon: '📡',
    },
  ]
}
