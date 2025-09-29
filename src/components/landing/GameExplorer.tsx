'use client'

import { useState } from 'react'

import type { Game } from '@/types'
import { CATEGORY_ITEMS, type CategoryId } from '@/types/navigation'

import { filterByCategory, filterByNew, filterByQuery } from '@/lib/games/filter'
import { partitionGames } from '@/lib/games/partition'
import { pluralise } from '@/lib/text/pluralise'

import { CasinoHeader } from '@/components/landing/header/CasinoHeader'
import { GameSection } from '@/components/landing/sections/GameSection'

type Props = { games: Game[] }

export function GameExplorer({ games }: Props) {
  const [category, setCategory] = useState<CategoryId>('all')
  const [isNewOnly, setIsNewOnly] = useState(false)
  const [query, setQuery] = useState('')

  const handleSelect = (id: CategoryId) => {
    if (id === 'new') {
      setIsNewOnly((value) => !value)
      return
    }

    if (id === 'provider') {
      // Hook up provider/overflow UI later.
      return
    }

    setIsNewOnly(false)
    setCategory(id)
  }

  const selectedForMenu: CategoryId = isNewOnly ? 'new' : category

  const hasQuery = query.trim().length > 0

  let filtered = games

  if (hasQuery) {
    filtered = filterByQuery(games, query)
  } else {
    const categoryForFiltering: CategoryId = isNewOnly ? 'all' : category

    filtered = filterByCategory(games, categoryForFiltering)
  }

  if (!hasQuery) {
    filtered = filterByNew(filtered, isNewOnly)
  }

  const { active, completed, comingSoon } = partitionGames(filtered)
  const total = active.length + completed.length + comingSoon.length

  return (
    <>
      <CasinoHeader
        menu={{
          items: CATEGORY_ITEMS,
          selected: selectedForMenu,
          onSelect: handleSelect,
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
            <p className="mt-1 text-sm text-slate-400">
              Try a different category{query ? ', clearing your search' : ''}.
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

            <p className="mt-12 sm:mt-16 text-center text-blue-200/80 text-sm sm:text-base">
              🎲 New challenges are added weekly. Check back regularly for more rewards! 🎰
            </p>
          </>
        )}
      </div>
    </>
  )
}
