import type { CategoryId, Game, ProviderId } from '@/types'
import { CATEGORY_LABEL_BY_ID } from '@/types/navigation'

const NON_FILTER_CATEGORY_IDS = new Set(['all', 'new', 'provider'])

/**
 * Check if the category is a game category.
 *
 * @param categoryId - The category ID.
 * @returns
 */
const isGameCategory = (categoryId: CategoryId): boolean => {
  return !NON_FILTER_CATEGORY_IDS.has(categoryId)
}

/**
 * Filter the games by category.
 *
 * @param games - The games.
 * @param category - The category.
 * @returns The filtered games.
 */
export const filterByCategory = (games: Game[], category: CategoryId): Game[] => {
  if (!isGameCategory(category)) {
    return games
  }

  return games.filter((game) => game.categories.includes(category))
}

/**
 * Filter the games by new.
 *
 * @param games - The games.
 * @param isNewOnly - The new only.
 * @returns The filtered games.
 */
export const filterByNew = (games: Game[], isNewOnly: boolean): Game[] => {
  return isNewOnly ? games.filter((game) => game.isNew) : games
}

/**
 * Filter the games by provider.
 *
 * @param games - The games.
 * @param provider - The provider.
 * @returns The filtered games.
 */
export const filterByProvider = (games: Game[], provider?: ProviderId | 'all' | ''): Game[] => {
  if (!provider || provider === 'all') return games
  return games.filter((game) => game.provider === provider)
}

/**
 * Filter the games by query.
 *
 * @param games - The games.
 * @param query - The query.
 * @returns The filtered games.
 */
export const filterByQuery = (games: Game[], query: string): Game[] => {
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
      const label = CATEGORY_LABEL_BY_ID[categoryId]?.toLowerCase()

      if (label && label.includes(normalisedQuery)) {
        return true
      }
    }

    return false
  })
}
