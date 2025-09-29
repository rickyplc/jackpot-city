import { CATEGORY_ITEMS, type CategoryId } from '@/types/navigation'

const CATEGORY_ID_SET: ReadonlySet<CategoryId> = new Set(CATEGORY_ITEMS.map((item) => item.id))

export const deriveCategoryStateFromParams = (
  params: URLSearchParams,
): {
  category: CategoryId
  isNewOnly: boolean
} => {
  const raw = params.get('category')

  if (raw && CATEGORY_ID_SET.has(raw as CategoryId)) {
    if (raw === 'new') {
      return { category: 'all', isNewOnly: true }
    }

    return { category: raw as CategoryId, isNewOnly: false }
  }

  return { category: 'all', isNewOnly: false }
}

export const buildPathWithCategory = (
  pathname: string,
  params: URLSearchParams,
  nextCategory: CategoryId,
): string => {
  const next = new URLSearchParams(params)

  if (nextCategory && nextCategory !== 'all') {
    next.set('category', nextCategory)
  } else {
    next.delete('category')
  }

  const queryString = next.toString()

  return queryString ? `${pathname}?${queryString}` : pathname
}
