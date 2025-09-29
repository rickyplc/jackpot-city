'use client'

import { AnimatePresence, motion } from 'motion/react'

import { AchievementCard } from '@/components/landing/AchievementCard'
import type { Game } from '@/types'

type Props = { games: Game[] }

export function GameGrid({ games }: Props) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5"
    >
      <AnimatePresence initial={false}>
        {games.map((game, index) => (
          <motion.div
            layout
            key={game.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut', delay: index * 0.02 }}
            className="relative z-10 transition-all duration-200"
          >
            <AchievementCard {...game} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
