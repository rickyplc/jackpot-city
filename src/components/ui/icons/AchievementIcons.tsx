'use client'

import { Coins, Flame, Star, Target, Trophy, Zap } from 'lucide-react'
import type { ReactElement } from 'react'

import type { AchievementIconId } from '@/types'

export const achievementIconMap: Record<AchievementIconId, ReactElement> = {
  star: <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
  trophy: <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
  target: <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
  coins: <Coins className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
  flame: <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
  zap: <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />,
}
