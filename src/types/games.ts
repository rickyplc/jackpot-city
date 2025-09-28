import type { CategoryId } from '@/types/navigation'

export type AchievementIconId = 'star' | 'trophy' | 'target' | 'coins' | 'flame' | 'zap'

export type ProviderId = 'pragmatic' | 'evolution' | 'netent' | 'microgaming' | (string & {})

export interface Achievement {
  id: string
  name: string
  iconId: AchievementIconId
  completed: boolean
}

export interface Game {
  id: string
  gameTitle: string
  thumbnailUrl: string
  timeLeft: string // "4 days left" | "Starts in 3 days"
  progressPercentage: number // 0..100
  achievements: Achievement[]
  categories: CategoryId[] // e.g. ['slots'] or ['live','roulette']
  isNew: boolean
  provider: ProviderId
}
