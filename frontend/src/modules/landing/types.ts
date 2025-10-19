// frontend/src/modules/landing/types.ts
export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Protocol {
  name: string
  description: string
  icon: string
}

export interface RoadmapItem {
  phase: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
}

export interface Technology {
  category: string
  items: string[]
}
