import type { CategoryId, Game, ProviderId } from '@/types'
import { CATEGORY_LABEL_BY_ID } from '@/types/navigation'

const NON_FILTER_CATEGORY_IDS = new Set(['all', 'new', 'provider'])

function isGameCategory(categoryId: CategoryId): boolean {
  return !NON_FILTER_CATEGORY_IDS.has(categoryId)
}

export function filterByCategory(games: Game[], category: CategoryId): Game[] {
  if (!isGameCategory(category)) return games
  return games.filter((game) => game.categories.includes(category))
}

export function filterByNew(games: Game[], isNewOnly: boolean): Game[] {
  return isNewOnly ? games.filter((game) => game.isNew) : games
}

export function filterByProvider(games: Game[], provider?: ProviderId): Game[] {
  return provider ? games.filter((game) => game.provider === provider) : games
}

export function filterByQuery(games: Game[], query: string): Game[] {
  const normalisedQuery = query.trim().toLowerCase()
  if (!normalisedQuery) return games

  return games.filter((game) => {
    if (game.gameTitle.toLowerCase().includes(normalisedQuery)) {
      return true
    }

    if (game.provider.toLowerCase().includes(normalisedQuery)) {
      return true
    }

    for (const categoryId of game.categories) {
      if (categoryId.toLowerCase().includes(normalisedQuery)) {
        return true
      }

      const categoryLabel = CATEGORY_LABEL_BY_ID[categoryId]?.toLowerCase()
      if (categoryLabel && categoryLabel.includes(normalisedQuery)) {
        return true
      }
    }

    return false
  })
}
