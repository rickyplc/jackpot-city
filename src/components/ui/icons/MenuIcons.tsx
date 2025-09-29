'use client'

import {
  Building2,
  CircleDot,
  Gem,
  Grid2X2,
  PanelRight,
  PanelsTopLeft,
  RadioTower,
  Sparkles,
  SquareStack,
} from 'lucide-react'
import type { ReactElement } from 'react'

import type { MenuIconId } from '@/types/navigation'

export const menuIconMap: Record<MenuIconId, ReactElement> = {
  grid: <Grid2X2 className="h-4 w-4 opacity-80" />,
  sparkles: <Sparkles className="h-4 w-4 opacity-80" />,
  slots: <PanelsTopLeft className="h-4 w-4 opacity-80" />,
  gem: <Gem className="h-4 w-4 opacity-80" />,
  live: <RadioTower className="h-4 w-4 opacity-80" />,
  roulette: <CircleDot className="h-4 w-4 opacity-80" />,
  blackjack: <SquareStack className="h-4 w-4 opacity-80" />,
  poker: <PanelRight className="h-4 w-4 opacity-80" />,
  provider: <Building2 className="h-4 w-4 opacity-80" />,
}
