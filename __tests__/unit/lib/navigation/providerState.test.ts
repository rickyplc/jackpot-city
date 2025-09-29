import { describe, expect, it, vi } from 'vitest'

// Provide spies before hoisted vi.mock factories use them
const { readEnumParamMock, buildPathWithParamMock } = vi.hoisted(() => {
  return {
    readEnumParamMock: vi.fn((params: URLSearchParams, key: string, allowed: Set<string>) => {
      const value = params.get(key) ?? undefined

      return value && allowed.has(value) ? value : undefined
    }),
    buildPathWithParamMock: vi.fn(
      (pathname: string, params: URLSearchParams, key: string, value?: string) => {
        const next = new URLSearchParams(params)

        if (value == null) {
          next.delete(key)
        } else {
          next.set(key, value)
        }

        const qs = next.toString()

        return qs ? `${pathname}?${qs}` : pathname
      },
    ),
  }
})

vi.mock('@/types/providers', () => ({
  PROVIDER_ID_SET: new Set(['pragmatic', 'evolution', 'netent', 'microgaming']),
}))

vi.mock('@/lib/navigation/params', () => ({
  readEnumParam: readEnumParamMock,
  buildPathWithParam: buildPathWithParamMock,
}))

import { buildPathWithProvider, deriveProviderFromParams } from '@/lib/navigation/providerState'

describe('deriveProviderFromParams', () => {
  it('returns provider when present and allowed', () => {
    const params = new URLSearchParams('provider=evolution')
    const res = deriveProviderFromParams(params)

    expect(res).toBe('evolution')
    expect(readEnumParamMock).toHaveBeenCalledWith(params, 'provider', expect.any(Set))
  })

  it('returns undefined when provider param is missing', () => {
    const params = new URLSearchParams('q=starburst')
    expect(deriveProviderFromParams(params)).toBeUndefined()
  })

  it('returns undefined when provider value is not allowed', () => {
    const params = new URLSearchParams('provider=unknownVendor')
    expect(deriveProviderFromParams(params)).toBeUndefined()
  })

  it('is case-sensitive (mismatched case invalid)', () => {
    const params = new URLSearchParams('provider=Evolution')
    expect(deriveProviderFromParams(params)).toBeUndefined()
  })
})

describe('buildPathWithProvider', () => {
  it('sets/overwrites provider and preserves other params', () => {
    const pathname = '/games'
    const params = new URLSearchParams('q=roulette&page=2&provider=netent')

    const next = buildPathWithProvider(pathname, params, 'evolution')

    expect(next).toBe('/games?q=roulette&page=2&provider=evolution')
    expect(buildPathWithParamMock).toHaveBeenCalledWith(pathname, params, 'provider', 'evolution')
  })

  it('adds provider when missing', () => {
    const pathname = '/games'
    const params = new URLSearchParams('q=starburst')
    const next = buildPathWithProvider(pathname, params, 'pragmatic')

    expect(next).toBe('/games?q=starburst&provider=pragmatic')
  })

  it('removes provider when undefined; keeps other params', () => {
    const pathname = '/games'
    const params = new URLSearchParams('provider=netent&foo=1')
    const next = buildPathWithProvider(pathname, params, undefined)

    expect(next).toBe('/games?foo=1')
    expect(buildPathWithParamMock).toHaveBeenCalledWith(pathname, params, 'provider', undefined)
  })

  it('returns bare pathname when removing provider leaves no params', () => {
    const pathname = '/games'
    const params = new URLSearchParams('provider=microgaming')
    const next = buildPathWithProvider(pathname, params, undefined)

    expect(next).toBe('/games')
  })
})
