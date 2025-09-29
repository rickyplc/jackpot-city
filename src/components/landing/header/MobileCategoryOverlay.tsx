'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { menuIconMap } from '@/components/ui/icons/MenuIcons'
import { trapFocusKeydownHandler, useBodyScrollLock, useIsMounted } from '@/lib/ui/overlay'
import type { CategoryId, MenuItem } from '@/types/navigation'

type Props = {
  open: boolean
  items: MenuItem[]
  selected: CategoryId
  onSelect: (id: CategoryId) => void
  onClose: () => void
}

export function MobileCategoryOverlay({ open, items, selected, onSelect, onClose }: Props) {
  const isMounted = useIsMounted()
  useBodyScrollLock(open)

  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  // Focus the close button when opened
  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = trapFocusKeydownHandler(dialogRef.current)
    const node = dialogRef.current
    const listener = (event: KeyboardEvent) => handler(event)

    node?.addEventListener('keydown', listener)
    return () => node?.removeEventListener('keydown', listener)
  }, [open])

  if (!isMounted || !open) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-category-title"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="mx-auto flex h-full max-w-[1600px] flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="animate-[fadeInDown_200ms_ease-out] flex items-center justify-between px-4 py-3 sm:px-6">
          <h2 id="mobile-category-title" className="text-white text-base font-medium">
            Browse Categories
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1.5 text-xs text-slate-200 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="animate-[fadeInUp_220ms_ease-out] rounded-t-2xl bg-black/60 border-t border-white/10 px-4 sm:px-6 pb-10 pt-4 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
          <ul className="grid grid-cols-1 gap-2">
            {items.map(({ id, label, iconId }) => {
              const active = id === selected
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(id)
                      onClose()
                    }}
                    className={`w-full cursor-pointer flex items-center justify-between rounded-xl border px-3 py-3.5 text-base transition
                      ${active ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 text-slate-200 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="scale-110">{menuIconMap[iconId]}</span>
                      <span>{label}</span>
                    </span>
                    {active && (
                      <span className="text-[10px] uppercase tracking-wide text-white/70">
                        Selected
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Scoped keyframes */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>,
    document.body,
  )
}
