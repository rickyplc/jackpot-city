'use client'

import { Bell, Menu, MessageSquareText, Star, X } from 'lucide-react'
import { useRef, useState } from 'react'

import { MobileCategoryOverlay } from '@/components/landing/header/MobileCategoryOverlay'
import { menuIconMap } from '@/components/ui/icons/MenuIcons'
import type { CategoryId, MenuItem } from '@/types/navigation'

type Props = {
  items: MenuItem[]
  selected: CategoryId
  onSelect: (id: CategoryId) => void
  onOpenProvider?: () => void
  promotionsCount?: number
  onPromotions?: () => void
  onContact?: () => void
  onFavorites?: () => void
  onSearch?: (value: string) => void
}

export function GameMenuBar({
  items,
  selected,
  onSelect,
  onOpenProvider,
  promotionsCount = 0,
  onPromotions,
  onContact,
  onFavorites,
  onSearch,
}: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const clearSearch = () => {
    setQuery('')
    onSearch?.('')
    inputRef.current?.focus()
  }

  return (
    <nav className="top-12 z-40 w-full bg-black/40 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2 sm:px-6">
        {/* Burger: visible below xl */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="cursor-pointer inline-flex xl:hidden rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/5 hover:text-white"
          aria-label="Browse Categories"
          aria-haspopup="dialog"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-category-dialog"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop categories: xl+ */}
        <div className="relative flex-1 min-w-0 hidden xl:block">
          <ul className="flex items-center gap-2 overflow-x-auto scroll-smooth whitespace-nowrap pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map(({ id, label, iconId }) => {
              const active = id === selected
              const handleClick = () => {
                if (id === 'provider') {
                  onOpenProvider?.()
                  return
                }
                onSelect(id)
              }
              return (
                <li key={id} className="shrink-0">
                  <button
                    type="button"
                    onClick={handleClick}
                    className={`cursor-pointer group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition
                      ${active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    {menuIconMap[iconId]}
                    <span className="whitespace-nowrap">{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/40 to-transparent" />
        </div>

        {/* Right group: always visible (mobile + desktop) */}
        <div className="ml-3 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPromotions}
            className="relative rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/5 hover:text-white"
            aria-label="Promotions"
          >
            <Bell className="h-4 w-4" />
            {promotionsCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {promotionsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onContact}
            className="rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/5 hover:text-white"
            aria-label="Contact"
          >
            <MessageSquareText className="h-4 w-4" />
          </button>

          {/* Search */}
          <div className="flex items-center">
            <div className="relative ml-2">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  const value = event.target.value
                  setQuery(value)
                  onSearch?.(value)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    clearSearch()
                  }
                }}
                placeholder="Search games…"
                className="w-28 sm:w-40 rounded-md border border-white/10 bg-black/40 px-2 pr-7 py-1 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-sky-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300 hover:text-white hover:bg-white/10"
                  aria-label="Clear search"
                  tabIndex={-1}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onFavorites}
            className="rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/5 hover:text-white"
            aria-label="My Games"
          >
            <Star className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile category overlay */}
      <MobileCategoryOverlay
        open={isMenuOpen}
        items={items}
        selected={selected}
        onSelect={(id) => {
          if (id === 'provider') {
            setIsMenuOpen(false)
            onOpenProvider?.()
            return
          }
          onSelect(id)
          setIsMenuOpen(false)
        }}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  )
}
