import { Clock } from 'lucide-react'
import { motion } from 'motion/react'

import { Badge } from '@/components/ui/Badge'
import { achievementIconMap } from '@/components/ui/icons/AchievementIcons'
import type { Game } from '@/types'

export function AchievementCard({
  gameTitle,
  thumbnailUrl,
  timeLeft,
  progressPercentage,
  achievements,
}: Game) {
  const completedCount = achievements.filter((achievement) => achievement.completed).length
  const isComingSoon = timeLeft.includes('Starts in')

  return (
    <motion.div
      className={`rounded-2xl relative group cursor-pointer backdrop-blur-sm ${
        isComingSoon ? 'opacity-70' : ''
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={
        isComingSoon
          ? {
              scale: 1.02,
              y: -4,
            }
          : {
              scale: 1.03,
              y: -12,
              rotateY: 2,
            }
      }
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      }}
    >
      {/* Time indicator */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 25 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <Badge
            variant="secondary"
            className={`text-white backdrop-blur-md shadow-xl relative overflow-hidden ${
              isComingSoon
                ? 'border-gray-400/50 shadow-gray-400/15'
                : progressPercentage === 100
                  ? 'border-blue-400/40 shadow-blue-500/20'
                  : 'border-yellow-400/60 shadow-yellow-500/25'
            }`}
            style={{
              background: isComingSoon
                ? 'linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)'
                : progressPercentage === 100
                  ? 'linear-gradient(135deg, #3385FF 0%, #1d4ed8 50%, #1e40af 100%)'
                  : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="relative z-10"
            >
              <Clock className="w-3 h-3 mr-1" />
            </motion.div>
            <span className="relative z-10">{timeLeft}</span>
          </Badge>
        </motion.div>
      </div>

      {/* Enhanced game thumbnail - optimized for smaller tiles */}
      <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden rounded-t-2xl">
        <div className="w-full h-full relative">
          <img
            src={thumbnailUrl}
            alt={gameTitle}
            className={`w-full h-full object-cover ${isComingSoon ? 'brightness-50 saturate-50' : 'brightness-110 saturate-110'}`}
          />

          {/* Subtle vignette effect for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Game title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <motion.h3
              className={`font-semibold text-[10px] sm:text-xs text-white relative inline-block ${
                !isComingSoon ? 'px-1.5 py-0.5 rounded-md backdrop-blur-md' : ''
              }`}
              style={
                !isComingSoon
                  ? {
                      background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.06) 100%),
                  rgba(0, 0, 0, 0.3)
                `,
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow:
                        '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                    }
                  : {}
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={
                isComingSoon
                  ? {}
                  : {
                      scale: 1.02,
                      textShadow: '0 0 20px rgba(51, 133, 255, 0.6)',
                      boxShadow:
                        '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(51, 133, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                    }
              }
            >
              {gameTitle}
            </motion.h3>
          </div>
        </div>
      </div>

      {/* Content  */}
      <div className="p-3 sm:p-4 space-y-3 bg-black/20 backdrop-blur-sm rounded-b-2xl">
        {/* Modern progress section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <motion.span
              className={`text-sm font-medium ${isComingSoon ? 'text-gray-400' : 'text-white/80'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={isComingSoon ? {} : { color: '#ffffff', scale: 1.02 }}
            >
              {completedCount}/6 Completed
            </motion.span>
            <motion.span
              className={`text-sm font-bold ${isComingSoon ? 'text-gray-400' : 'text-white'}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={
                isComingSoon
                  ? {}
                  : {
                      scale: 1.1,
                      textShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
                    }
              }
            >
              {progressPercentage}%
            </motion.span>
          </div>

          <motion.div
            className="relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="h-2 rounded-full overflow-hidden relative bg-white/10">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: isComingSoon
                    ? 'linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)'
                    : progressPercentage === 100
                      ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
                      : 'linear-gradient(90deg, #3385FF 0%, #06b6d4 50%, #8b5cf6 100%)',
                  width: `${progressPercentage}%`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ delay: 0.6, duration: 1.5, ease: 'easeOut' }}
              ></motion.div>
            </div>
          </motion.div>
        </div>

        {/* Modern achievement icons */}
        <div className="flex gap-x-1.5 md:gap-x-1 lg:gap-x-1.5 items-center justify-center">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.2,
                y: -4,
                rotate: 8,
              }}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 15,
              }}
              className="relative group/icon"
            >
              <motion.div
                className={`
                  w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden
                  ${
                    achievement.completed
                      ? isComingSoon
                        ? 'bg-gradient-to-br from-amber-500/60 to-orange-600/60 text-amber-200 shadow-lg shadow-amber-500/20'
                        : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-400/40'
                      : isComingSoon
                        ? 'bg-white/5 text-gray-500 border border-white/10'
                        : 'bg-white/10 text-white/60 border border-white/20'
                  }
                `}
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 600,
                  damping: 15,
                }}
              >
                <div className="w-2.5 h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3">
                  {achievementIconMap[achievement.iconId]}
                </div>
              </motion.div>

              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-black/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover/icon:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none border border-white/20 shadow-2xl"
                style={{ zIndex: 99999 }}
              >
                {achievement.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/95"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: isComingSoon
            ? ''
            : progressPercentage === 100
              ? 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.1) 100%)'
              : 'linear-gradient(135deg, rgba(51,133,255,0.1) 0%, rgba(139,92,246,0.1) 100%)',
          boxShadow: isComingSoon
            ? ''
            : progressPercentage === 100
              ? '0 0 40px rgba(251,191,36,0.2), inset 0 0 40px rgba(251,191,36,0.05)'
              : '0 0 40px rgba(51,133,255,0.2), inset 0 0 40px rgba(51,133,255,0.05)',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  )
}
