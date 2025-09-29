import { describe, expect, it, vi } from 'vitest'

// Mock BEFORE importing the SUT so CATEGORY_ID_SET is built from these items.
vi.mock('@/types/navigation', () => ({
  CATEGORY_ITEMS: [
    { id: 'all', label: 'All Games', iconId: 'grid' },
    { id: 'new', label: 'New', iconId: 'sparkles' },
    { id: 'slots', label: 'Slots', iconId: 'slots' },
    { id: 'jackpots', label: 'Jackpots', iconId: 'gem' },
    { id: 'live', label: 'Live Casino', iconId: 'live' },
    { id: 'roulette', label: 'Roulette', iconId: 'roulette' },
    { id: 'blackjack', label: 'Blackjack', iconId: 'blackjack' },
    { id: 'poker', label: 'Poker', iconId: 'poker' },
    { id: 'provider', label: 'By Provider', iconId: 'provider' },
  ],
}))

import {
  buildPathWithCategory,
  deriveCategoryStateFromParams,
} from '@/lib/navigation/categoryState'
import type { CategoryId } from '@/types/navigation'

describe('deriveCategoryStateFromParams', () => {
  it('returns {all,false} when no category param is present', () => {
    const params = new URLSearchParams('foo=1')
    expect(deriveCategoryStateFromParams(params)).toEqual({
      category: 'all',
      isNewOnly: false,
    })
  })

  it('returns {all,true} when category=new', () => {
    const params = new URLSearchParams('category=new')
    expect(deriveCategoryStateFromParams(params)).toEqual({
      category: 'all',
      isNewOnly: true,
    })
  })

  it('returns {<id>,false} when category is a valid CategoryId (not "new")', () => {
    const params = new URLSearchParams('category=slots')
    expect(deriveCategoryStateFromParams(params)).toEqual({
      category: 'slots',
      isNewOnly: false,
    })
  })

  it('returns default for invalid category values', () => {
    const params = new URLSearchParams('category=not-a-real-id')
    expect(deriveCategoryStateFromParams(params)).toEqual({
      category: 'all',
      isNewOnly: false,
    })
  })

  it('is case-sensitive for category matching (invalid if case differs)', () => {
    const params = new URLSearchParams('category=SLOTS')
    expect(deriveCategoryStateFromParams(params)).toEqual({
      category: 'all',
      isNewOnly: false,
    })
  })
})

describe('buildPathWithCategory', () => {
  const parse = (path: string) => new URL('http://x.test' + path).searchParams

  it('adds category param when nextCategory != "all"', () => {
    const pathname = '/games'
    const params = new URLSearchParams('foo=1&bar=2')
    const next = buildPathWithCategory(pathname, params, 'slots')
    const sp = parse(next)

    expect(next.startsWith('/games')).toBe(true)
    expect(sp.get('foo')).toBe('1')
    expect(sp.get('bar')).toBe('2')
    expect(sp.get('category')).toBe('slots')
  })

  it('removes category param when nextCategory = "all"', () => {
    const pathname = '/games'
    const params = new URLSearchParams('category=jackpots&foo=1')
    const next = buildPathWithCategory(pathname, params, 'all')
    const sp = parse(next)

    expect(sp.get('category')).toBeNull()
    expect(sp.get('foo')).toBe('1')
    expect(next).toBe('/games?foo=1') // still has other params
  })

  it('updates category when it already exists', () => {
    const pathname = '/games'
    const params = new URLSearchParams('category=live')
    const next = buildPathWithCategory(pathname, params, 'roulette')
    const sp = parse(next)

    expect(sp.get('category')).toBe('roulette')
  })

  it('preserves other params and their values when setting category', () => {
    const pathname = '/games'
    const params = new URLSearchParams('q=starburst&page=2')
    const next = buildPathWithCategory(pathname, params, 'blackjack')
    const sp = parse(next)

    expect(sp.get('q')).toBe('starburst')
    expect(sp.get('page')).toBe('2')
    expect(sp.get('category')).toBe('blackjack')
  })

  it('returns bare pathname (no "?" suffix) when result has no params', () => {
    const pathname = '/games'
    const params = new URLSearchParams('category=slots') // will be removed when setting 'all'
    const next = buildPathWithCategory(pathname, params, 'all')
    expect(next).toBe('/games')
  })

  it('allows setting non-filter categories like "provider" as a plain query value', () => {
    const pathname = '/games'
    const params = new URLSearchParams('')
    const next = buildPathWithCategory(pathname, params, 'provider')
    const sp = parse(next)

    expect(sp.get('category')).toBe('provider')
  })

  it('works when there were no initial params', () => {
    const pathname = '/games'
    const params = new URLSearchParams()
    const next = buildPathWithCategory(pathname, params, 'poker')
    const sp = parse(next)

    expect(next.startsWith('/games')).toBe(true)
    expect(sp.get('category')).toBe('poker')
  })

  it('type-safety: only accepts known CategoryId strings at call-site', () => {
    const c: CategoryId = 'slots'
    const pathname = '/games'
    const params = new URLSearchParams()
    const next = buildPathWithCategory(pathname, params, c)
    expect(parse(next).get('category')).toBe('slots')
  })
})
