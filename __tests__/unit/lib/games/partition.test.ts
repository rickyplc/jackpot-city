import { describe, expect, it } from 'vitest'

import { extractDays, isStartingSoon, partitionGames } from '@/lib/games/partition'
import type { Game } from '@/types'

const makeGame = (
  partial: Partial<Game> &
    Pick<
      Game,
      'id' | 'gameTitle' | 'provider' | 'categories' | 'isNew' | 'timeLeft' | 'progressPercentage'
    >,
): Game => {
  return {
    thumbnailUrl: '/img/placeholder.png',
    achievements: [],
    ...partial,
  }
}

describe('extractDays', () => {
  it('extracts days from "X days left" and "X day left"', () => {
    expect(extractDays('4 days left')).toBe(4)
    expect(extractDays('1 day left')).toBe(1)
  })

  it('extracts days from "Starts in X days" / "Starts in X day"', () => {
    expect(extractDays('Starts in 3 days')).toBe(3)
    expect(extractDays('Starts in 1 day')).toBe(1)
  })

  it('is case-insensitive and tolerant of extra text', () => {
    expect(extractDays('4 DAYS LEFT')).toBe(4)
    expect(extractDays('about 10 days left!!')).toBe(10)
  })

  it('returns 0 when no day count is present', () => {
    expect(extractDays('Coming soon')).toBe(0)
    expect(extractDays('')).toBe(0)
  })
})

describe('isStartingSoon', () => {
  const game = (timeLeft: string): Game =>
    makeGame({
      id: 'x',
      gameTitle: 't',
      provider: 'pragmatic',
      categories: ['slots'],
      isNew: false,
      timeLeft,
      progressPercentage: 0,
    })

  it('returns true when "Starts in" is present (case-insensitive)', () => {
    expect(isStartingSoon(game('Starts in 3 days'))).toBe(true)
    expect(isStartingSoon(game('starts in 2 days'))).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isStartingSoon(game('5 days left'))).toBe(false)
    expect(isStartingSoon(game('Coming soon'))).toBe(false)
  })
})

describe('partitionGames', () => {
  const games: Game[] = [
    // ACTIVE (progress < 100, not starting soon)
    makeGame({
      id: 'a1',
      gameTitle: 'Active A',
      provider: 'microgaming',
      categories: ['slots'],
      isNew: true,
      timeLeft: '5 days left',
      progressPercentage: 20,
    }),
    makeGame({
      id: 'a2',
      gameTitle: 'Active B',
      provider: 'netent',
      categories: ['slots'],
      isNew: false,
      timeLeft: '1 day left',
      progressPercentage: 99,
    }),

    // COMPLETED (progress === 100)
    makeGame({
      id: 'c1',
      gameTitle: 'Completed A',
      provider: 'evolution',
      categories: ['live'],
      isNew: false,
      timeLeft: '2 days left',
      progressPercentage: 100,
    }),
    makeGame({
      id: 'c2',
      gameTitle: 'Completed B',
      provider: 'pragmatic',
      categories: ['jackpots'],
      isNew: false,
      timeLeft: '0 days left',
      progressPercentage: 100,
    }),

    // COMING SOON (contains "Starts in")
    makeGame({
      id: 's1',
      gameTitle: 'Soon A',
      provider: 'pragmatic',
      categories: ['blackjack'],
      isNew: false,
      timeLeft: 'Starts in 3 days',
      progressPercentage: 0,
    }),
    makeGame({
      id: 's2',
      gameTitle: 'Soon B',
      provider: 'netent',
      categories: ['roulette'],
      isNew: false,
      timeLeft: 'Starts in 1 day',
      progressPercentage: 50,
    }),

    // Edge: would be active by progress, but "Starts in" should push it to comingSoon
    makeGame({
      id: 's3',
      gameTitle: 'Soon C',
      provider: 'microgaming',
      categories: ['poker'],
      isNew: true,
      timeLeft: 'Starts in 10 days',
      progressPercentage: 10,
    }),
  ]

  it('groups games into active, completed, and comingSoon', () => {
    const { active, completed, comingSoon } = partitionGames(games)

    expect(active.map((game) => game.id)).toEqual(['a2', 'a1']) // sorted by days: 1, then 5
    expect(completed.map((game) => game.id)).toEqual(['c2', 'c1']) // sorted by days: 0, then 2
    expect(comingSoon.map((game) => game.id)).toEqual(['s2', 's1', 's3']) // sorted by days: 1, 3, 10
  })

  it('excludes "starting soon" items from active even if progress < 100', () => {
    const { active, comingSoon } = partitionGames(games)
    expect(active.some((game) => game.id === 's3')).toBe(false)
    expect(comingSoon.some((game) => game.id === 's3')).toBe(true)
  })
})
