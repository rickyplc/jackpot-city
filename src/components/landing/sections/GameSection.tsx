'use client'
import { motion } from 'motion/react'
import type { ReactElement } from 'react'

import { GameGrid } from '@/components/landing/grids/GameGrid'
import type { Game } from '@/types'

type Props = {
  title: string
  subtitle: string
  games: Game[]
  delay: number
  primaryColor: string
  accentColor: string
}

export function GameSection({
  title,
  subtitle,
  games,
  delay,
  primaryColor,
  accentColor,
}: Props): ReactElement {
  return (
    <motion.div layout initial={false} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-16">
      <motion.div
        className="text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.1, duration: 0.6 }}
      >
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 relative"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 50%, ${primaryColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 0 20px ${primaryColor}30`,
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          layout
          className="w-20 h-1 mx-auto mt-4 rounded-full"
          style={{ background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})` }}
        />
      </motion.div>

      <GameGrid games={games} />
    </motion.div>
  )
}
