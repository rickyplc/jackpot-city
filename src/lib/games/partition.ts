import type { Game } from '@/types'

export const extractDays = (timeLeft: string): number => {
  const match = timeLeft.match(/(\d+)\s+days?/i)

  return match ? parseInt(match[1], 10) : 0
}

export const isStartingSoon = (game: Game): boolean => {
  return /starts in/i.test(game.timeLeft)
}

export const partitionGames = (games: Game[]) => {
  const active = games
    .filter((game) => game.progressPercentage < 100 && !isStartingSoon(game))
    .sort((a, b) => extractDays(a.timeLeft) - extractDays(b.timeLeft))

  const completed = games
    .filter((game) => game.progressPercentage === 100)
    .sort((a, b) => extractDays(a.timeLeft) - extractDays(b.timeLeft))

  const comingSoon = games
    .filter(isStartingSoon)
    .sort((a, b) => extractDays(a.timeLeft) - extractDays(b.timeLeft))

  return { active, completed, comingSoon }
}
