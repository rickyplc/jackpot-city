import { describe, expect, it } from 'vitest'

import { pluralise } from '@/lib/text/pluralise'

describe('pluralise', () => {
  describe('default behaviour (adds "s" when count !== 1)', () => {
    it.each([
      { count: 0, expected: 'cats' },
      { count: 2, expected: 'cats' },
      { count: -1, expected: 'cats' },
      { count: 1.5, expected: 'cats' },
      { count: Number.NaN, expected: 'cats' },
      { count: Number.POSITIVE_INFINITY, expected: 'cats' },
      { count: Number.NEGATIVE_INFINITY, expected: 'cats' },
    ])('returns "$expected" for count=$count', ({ count, expected }) => {
      expect(pluralise(count, 'cat')).toBe(expected)
    })

    it('returns singular when count === 1', () => {
      expect(pluralise(1, 'cat')).toBe('cat')
    })

    it('treats numerically-equal 1 values as 1 (e.g. 1.0, 1e0)', () => {
      expect(pluralise(1.0, 'cat')).toBe('cat')
      expect(pluralise(1, 'cat')).toBe('cat')
    })
  })

  describe('custom plural override', () => {
    it('uses provided plural for irregular nouns', () => {
      expect(pluralise(2, 'person', 'people')).toBe('people')
      expect(pluralise(0, 'city', 'cities')).toBe('cities')
    })

    it('still returns singular when count === 1 even if plural is provided', () => {
      expect(pluralise(1, 'person', 'people')).toBe('person')
    })

    it('respects empty-string plural overrides (non-nullish)', () => {
      expect(pluralise(2, 'thing', '')).toBe('')
    })
  })

  describe('documents current naive pluralisation behaviour', () => {
    it('simply appends "s" when no plural is provided', () => {
      expect(pluralise(3, 'bus')).toBe('buss')
      expect(pluralise(3, 'city')).toBe('citys')
      expect(pluralise(3, 'glass')).toBe('glasss')
    })
  })

  describe('immutability of inputs', () => {
    it('does not mutate provided strings', () => {
      const singular = 'cat'
      const plural = 'cats'
      pluralise(2, singular, plural)
      expect(singular).toBe('cat')
      expect(plural).toBe('cats')
    })
  })
})
