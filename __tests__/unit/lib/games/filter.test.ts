import { beforeAll, describe, expect, it, vi } from 'vitest'

// Mock labels BEFORE importing the SUT
vi.mock('@/types/navigation', () => ({
  CATEGORY_LABEL_BY_ID: {
    all: 'All Games',
    new: 'New',
    slots: 'Slots',
    jackpots: 'Jackpots',
    live: 'Live Casino',
    roulette: 'Roulette',
    blackjack: 'Blackjack',
    poker: 'Poker',
    provider: 'By Provider',
  } as Record<string, string>,
}))

import { filterByCategory, filterByNew, filterByProvider, filterByQuery } from '@/lib/games/filter'
import type { Game } from '@/types'

// Helper to create fully-typed Game objects with sensible defaults
const makeGame = (
  partial: Partial<Game> & Pick<Game, 'id' | 'gameTitle' | 'provider' | 'categories' | 'isNew'>,
): Game => {
  return {
    thumbnailUrl: '/img/placeholder.png',
    timeLeft: '4 days left',
    progressPercentage: 0,
    achievements: [],
    ...partial,
  }
}

describe('games filters', () => {
  let games: Game[]

  beforeAll(() => {
    games = [
      makeGame({
        id: 'g1',
        gameTitle: 'Mega Moolah',
        provider: 'microgaming',
        categories: ['jackpots', 'slots'],
        isNew: true,
      }),
      makeGame({
        id: 'g2',
        gameTitle: 'Lightning Roulette',
        provider: 'evolution',
        categories: ['live', 'roulette'],
        isNew: false,
      }),
      makeGame({
        id: 'g3',
        gameTitle: 'Book of Ra',
        provider: 'novomatic',
        categories: ['slots'],
        isNew: false,
      }),
      makeGame({
        id: 'g4',
        gameTitle: 'Starburst',
        provider: 'netent',
        categories: ['slots'],
        isNew: true,
      }),
      makeGame({
        id: 'g5',
        gameTitle: 'Royal Blackjack',
        provider: 'pragmatic',
        categories: ['blackjack', 'live'],
        isNew: true,
      }),
    ]
  })

  describe('filterByCategory', () => {
    it('returns original array reference for NON_FILTER categories: all/new/provider', () => {
      expect(filterByCategory(games, 'all')).toBe(games)
      expect(filterByCategory(games, 'new')).toBe(games)
      expect(filterByCategory(games, 'provider')).toBe(games)
    })

    it('filters to games that include the given real category', () => {
      expect(filterByCategory(games, 'slots').map((game) => game.id)).toEqual(['g1', 'g3', 'g4'])
      expect(filterByCategory(games, 'live').map((game) => game.id)).toEqual(['g2', 'g5'])
      expect(filterByCategory(games, 'blackjack').map((game) => game.id)).toEqual(['g5'])
    })

    it('returns empty array if no game has the category', () => {
      expect(filterByCategory(games, 'poker').map((game) => game.id)).toEqual([])
    })
  })

  describe('filterByNew', () => {
    it('returns only games with isNew=true when isNewOnly=true', () => {
      expect(filterByNew(games, true).map((game) => game.id)).toEqual(['g1', 'g4', 'g5'])
    })

    it('returns original array reference when isNewOnly=false', () => {
      expect(filterByNew(games, false)).toBe(games)
    })
  })

  describe('filterByProvider', () => {
    it('returns only games from the specified provider', () => {
      expect(filterByProvider(games, 'evolution').map((game) => game.id)).toEqual(['g2'])
      expect(filterByProvider(games, 'netent').map((game) => game.id)).toEqual(['g4'])
    })

    it('is case-sensitive (strict equality) for provider IDs', () => {
      expect(filterByProvider(games, 'Evolution')).toEqual([])
    })

    it('returns original array reference when provider is undefined', () => {
      expect(filterByProvider(games, undefined)).toBe(games)
    })
  })

  describe('filterByQuery', () => {
    it('matches by gameTitle (case-insensitive, substring)', () => {
      expect(filterByQuery(games, 'mool')[0].id).toBe('g1')
      expect(filterByQuery(games, 'roulette')[0].id).toBe('g2')
      expect(filterByQuery(games, 'STAR')[0].id).toBe('g4')
    })

    it('matches by provider (case-insensitive, substring)', () => {
      expect(filterByQuery(games, 'eVoLuTi').map((game) => game.id)).toEqual(['g2'])
    })

    it('matches by category ID (case-insensitive, substring)', () => {
      // 'jack' matches 'jackpots' and 'blackjack'
      expect(filterByQuery(games, 'jack').map((game) => game.id)).toEqual(['g1', 'g5'])
      // more specific query that matches only the jackpots category
      expect(filterByQuery(games, 'jackpot').map((game) => game.id)).toEqual(['g1'])
    })

    it('matches by category LABEL from CATEGORY_LABEL_BY_ID (case-insensitive, substring)', () => {
      expect(filterByQuery(games, 'slot').map((game) => game.id)).toEqual(['g1', 'g3', 'g4']) // "Slots"
      expect(filterByQuery(games, 'live').map((game) => game.id)).toEqual(['g2', 'g5']) // "Live Casino"
      expect(filterByQuery(games, 'black').map((game) => game.id)).toEqual(['g5']) // "Blackjack"
    })

    it('trims and lowercases the query; empty/whitespace returns original array reference', () => {
      expect(filterByQuery(games, '')).toBe(games)
      expect(filterByQuery(games, '   ')).toBe(games)
      expect(filterByQuery(games, '\n\t ')).toBe(games)
      expect(filterByQuery(games, '  STARBURST  ').map((game) => game.id)).toEqual(['g4'])
    })

    it('preserves original order when filtering', () => {
      // 'live' matches g2 then g5 in original order
      expect(filterByQuery(games, 'live').map((game) => game.id)).toEqual(['g2', 'g5'])
    })
  })
})
