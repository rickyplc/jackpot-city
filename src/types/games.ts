export type AchievementIconId = 'star' | 'trophy' | 'target' | 'coins' | 'flame' | 'zap'

export type Achievement = {
  id: string
  name: string
  iconId: AchievementIconId
  completed: boolean
}

export type Game = {
  id: string
  gameTitle: string
  thumbnailUrl: string
  timeLeft: string // "4 days left" | "Starts in 3 days"
  progressPercentage: number // 0..100
  achievements: Achievement[]
}
