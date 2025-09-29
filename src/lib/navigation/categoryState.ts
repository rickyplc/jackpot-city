import type { ParamSearch } from '@/lib/navigation/params'
import { buildPathWithParam, readEnumParam } from '@/lib/navigation/params'
import { CATEGORY_ITEMS, type CategoryId } from '@/types/navigation'

const CATEGORY_ID_SET: ReadonlySet<CategoryId> = new Set(CATEGORY_ITEMS.map((item) => item.id))

/**
 * Derive the category state from the URL parameters.
 *
 * @param params - The URL parameters.
 * @returns The category state.
 */
export const deriveCategoryStateFromParams = (
  params: ParamSearch,
): { category: CategoryId; isNewOnly: boolean } => {
  const value = readEnumParam<CategoryId>(params, 'category', CATEGORY_ID_SET)

  if (value === 'new') {
    return { category: 'all', isNewOnly: true }
  }
  if (value) {
    return { category: value, isNewOnly: false }
  }

  return { category: 'all', isNewOnly: false }
}

/**
 * Build a path with the given category.
 *
 * @param pathname - The pathname.
 * @param params - The URL parameters.
 * @param nextCategory - The next category.
 * @returns The path with the given category.
 */
export const buildPathWithCategory = (
  pathname: string,
  params: ParamSearch,
  nextCategory: CategoryId,
): string => {
  // Default category "all" is omitted from the URL
  return buildPathWithParam(pathname, params, 'category', nextCategory, {
    defaultValue: 'all',
  })
}
