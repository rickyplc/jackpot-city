'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import type { Game, ProviderId } from '@/types'
import { CATEGORY_ITEMS, type CategoryId } from '@/types/navigation'

import { filterByCategory, filterByNew, filterByProvider, filterByQuery } from '@/lib/games/filter'
import { partitionGames } from '@/lib/games/partition'
import {
  buildPathWithCategory,
  deriveCategoryStateFromParams,
} from '@/lib/navigation/categoryState'
import { buildPathWithProvider, deriveProviderFromParams } from '@/lib/navigation/providerState'
import { pluralise } from '@/lib/text/pluralise'

import { CasinoHeader } from '@/components/landing/header/CasinoHeader'
import { ProviderOverlay } from '@/components/landing/header/ProviderOverlay'
import { GameSection } from '@/components/landing/sections/GameSection'

type Props = { games: Game[] }

export function GameExplorer({ games }: Props): ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL -> state (category/new)
  const initialCat = deriveCategoryStateFromParams(new URLSearchParams(searchParams))
  const [category, setCategory] = useState<CategoryId>(initialCat.category)
  const [isNewOnly, setIsNewOnly] = useState<boolean>(initialCat.isNewOnly)

  // URL -> state (provider)
  const initialProvider = deriveProviderFromParams(new URLSearchParams(searchParams))
  const [provider, setProvider] = useState<ProviderId | undefined>(initialProvider)

  const [query, setQuery] = useState('')

  // Sync when URL changes (back/forward)
  useEffect(() => {
    const nextCat = deriveCategoryStateFromParams(new URLSearchParams(searchParams))
    if (nextCat.category !== category || nextCat.isNewOnly !== isNewOnly) {
      setCategory(nextCat.category)
      setIsNewOnly(nextCat.isNewOnly)
    }
    const nextProvider = deriveProviderFromParams(new URLSearchParams(searchParams))
    if (nextProvider !== provider) {
      setProvider(nextProvider)
    }
  }, [searchParams, category, isNewOnly, provider])

  /** Build URL with the given category, ensuring provider is removed (mutually exclusive). */
  const setUrlCategory = (nextCategory: CategoryId) => {
    const baseParams = new URLSearchParams(searchParams.toString())
    baseParams.delete('provider') // enforce exclusivity
    const href = buildPathWithCategory(pathname, baseParams, nextCategory)
    router.replace(href, { scroll: false })
  }

  /** Build URL with the given provider, ensuring category is removed (mutually exclusive). */
  const setUrlProvider = (next?: ProviderId) => {
    const baseParams = new URLSearchParams(searchParams.toString())
    baseParams.delete('category') // enforce exclusivity
    const href = buildPathWithProvider(pathname, baseParams, next)
    router.replace(href, { scroll: false })
  }

  const [isProviderOpen, setIsProviderOpen] = useState(false)

  const handleSelectCategory = (id: CategoryId) => {
    if (id === 'new') {
      // Selecting "new" also clears provider (mutually exclusive in URL)
      const next = !isNewOnly
      setIsNewOnly(next)
      setProvider(undefined)
      setUrlCategory(next ? 'new' : category)
      return
    }
    if (id === 'provider') {
      setIsProviderOpen(true)
      return
    }
    // Normal category click clears provider and turns off "new"
    setIsNewOnly(false)
    setProvider(undefined)
    setCategory(id)
    setUrlCategory(id)
  }

  const handleSelectProvider = (next?: ProviderId) => {
    // Selecting provider clears category/new (mutually exclusive in URL)
    setIsNewOnly(false)
    setCategory('all')
    setProvider(next)
    setUrlProvider(next)
  }

  const selectedForMenu: CategoryId = provider ? 'provider' : isNewOnly ? 'new' : category

  // ---------- Filtering pipeline ----------
  const hasQuery = query.trim().length > 0
  let filtered: Game[] = games

  if (hasQuery) {
    // Search: keep provider filter, ignore category/new for clearer UX.
    filtered = filterByProvider(filtered, provider)
    filtered = filterByQuery(filtered, query)
  } else {
    // Provider first (no-op for undefined/'all')
    filtered = filterByProvider(filtered, provider)

    // If a provider is active, neutralise category by using the 'provider' sentinel
    const effectiveCategory: CategoryId = provider ? 'provider' : category
    filtered = filterByCategory(filtered, effectiveCategory)

    // New-only last
    filtered = filterByNew(filtered, isNewOnly)
  }
  // ---------------------------------------

  const { active, completed, comingSoon } = partitionGames(filtered)
  const total = active.length + completed.length + comingSoon.length

  return (
    <>
      <CasinoHeader
        menu={{
          items: CATEGORY_ITEMS,
          selected: selectedForMenu,
          onSelect: handleSelectCategory,
          onOpenProvider: () => setIsProviderOpen(true),
          promotionsCount: 4,
          onSearch: setQuery,
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {total === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-14 text-center">
            <p className="text-base sm:text-lg text-slate-200">
              No games available for this selection{query ? ` matching “${query}”` : ''}.
            </p>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <GameSection
                title="🎮 Active Weekly Challenges"
                subtitle={`${active.length} ${pluralise(active.length, 'game')} available to play now`}
                games={active}
                delay={0.1}
                primaryColor="#3385FF"
                accentColor="#8b5cf6"
              />
            )}
            {completed.length > 0 && (
              <GameSection
                title="🏆 Completed Weekly Challenges"
                subtitle={`${completed.length} ${pluralise(completed.length, 'challenge')} completed - Well done!`}
                games={completed}
                delay={0.6}
                primaryColor="#fbbf24"
                accentColor="#f59e0b"
              />
            )}
            {comingSoon.length > 0 && (
              <GameSection
                title="⏰ Coming Soon"
                subtitle={`${comingSoon.length} new ${pluralise(comingSoon.length, 'challenge')} starting soon`}
                games={comingSoon}
                delay={1.1}
                primaryColor="#6b7280"
                accentColor="#9ca3af"
              />
            )}
          </>
        )}
      </div>

      {/* Provider overlay */}
      <ProviderOverlay
        open={isProviderOpen}
        selected={provider}
        onSelect={handleSelectProvider}
        onClose={() => setIsProviderOpen(false)}
      />
    </>
  )
}
