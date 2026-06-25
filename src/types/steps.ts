import type { LucideIcon } from 'lucide-react'

export type StepId =
  | 'task-selection'
  | 'anticipation'
  | 'monitor'
  | 'selecting'
  | 'sequencing'
  | 'connecting'

export interface StepConfig {
  id: StepId
  label: string
  section: 'getting-started' | 'five-practices'
  stepNumber?: number
  icon?: LucideIcon
  bannerHint: string
  contentType: 'chat' | 'final-plan'
}
