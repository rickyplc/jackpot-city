'use client'

import { Bell, MessageSquareText, Search, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { menuIconMap } from '@/components/ui/icons/MenuIcons'
import type { CategoryId, MenuItem } from '@/types/navigation'

type Props = {
  items: MenuItem[]
  selected: CategoryId
  onSelect: (id: CategoryId) => void
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
  promotionsCount = 0,
  onPromotions,
  onContact,
  onFavorites,
  onSearch,
}: Props) {
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus()
    }
  }, [showSearch])

  return (
    <nav className="top-12 z-40 w-full bg-black/40 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2 sm:px-6">
        <ul className="flex items-center gap-3 overflow-x-auto">
          {items.map(({ id, label, iconId }) => {
            const active = id === selected

            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelect(id)}
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

        <div className="ml-4 flex items-center gap-2">
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

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setShowSearch((v) => !v)}
              className="rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/5 hover:text-white"
              aria-label="Find Games"
            >
              <Search className="h-4 w-4" />
            </button>
            {showSearch && (
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  const value = event.target.value
                  setQuery(value)
                  onSearch?.(value)
                }}
                placeholder="Find games…"
                className="ml-2 w-40 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-sky-500"
              />
            )}
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
    </nav>
  )
}
