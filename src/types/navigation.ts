export type CategoryId =
  | 'all'
  | 'new'
  | 'slots'
  | 'jackpots'
  | 'live'
  | 'roulette'
  | 'blackjack'
  | 'poker'
  | 'provider'

export type MenuIconId =
  | 'grid'
  | 'sparkles'
  | 'slots'
  | 'gem'
  | 'live'
  | 'roulette'
  | 'blackjack'
  | 'poker'
  | 'provider'

export interface MenuItem {
  id: CategoryId
  label: string
  iconId: MenuIconId
}

export const CATEGORY_ITEMS: MenuItem[] = [
  { id: 'all', label: 'All Games', iconId: 'grid' },
  { id: 'new', label: 'New', iconId: 'sparkles' },
  { id: 'slots', label: 'Slots', iconId: 'slots' },
  { id: 'jackpots', label: 'Jackpots', iconId: 'gem' },
  { id: 'live', label: 'Live Casino', iconId: 'live' },
  { id: 'roulette', label: 'Roulette', iconId: 'roulette' },
  { id: 'blackjack', label: 'Blackjack', iconId: 'blackjack' },
  { id: 'poker', label: 'Poker', iconId: 'poker' },
  { id: 'provider', label: 'By Provider', iconId: 'provider' },
]

export const CATEGORY_LABEL_BY_ID: Record<CategoryId, string> = Object.fromEntries(
  CATEGORY_ITEMS.map((item) => [item.id, item.label]),
) as Record<CategoryId, string>
