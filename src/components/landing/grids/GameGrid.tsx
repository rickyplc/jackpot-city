'use client'

import { motion } from 'motion/react'

import { AchievementCard } from '@/components/landing/AchievementCard'
import type { Game } from '@/types'

type Props = { games: Game[]; delay: number }

export function GameGrid({ games, delay }: Props) {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.2, duration: 1 }}
    >
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{
            delay: delay + 0.4 + index * 0.08,
            duration: 0.8,
            type: 'spring',
            stiffness: 120,
            damping: 20,
          }}
          className="relative z-10 hover:z-[10000] transition-all duration-200"
        >
          <AchievementCard
            id={game.id}
            gameTitle={game.gameTitle}
            thumbnailUrl={game.thumbnailUrl}
            timeLeft={game.timeLeft}
            progressPercentage={game.progressPercentage}
            achievements={game.achievements}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
