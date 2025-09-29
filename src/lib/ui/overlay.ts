import { useEffect, useRef } from 'react'

/** True after first client render (for safe portals). */
export const useIsMounted = (): boolean => {
  const mountedRef = useRef(false)

  // Avoid re-render, just read .current
  if (typeof window !== 'undefined') {
    mountedRef.current = true
  }

  return mountedRef.current
}

/**
 * Lock document.body scroll while `locked` is true.
 *
 * @param locked - Whether to lock the body scroll.
 * @returns void
 */
export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

/**
 * Simple focus trap handler for a dialog container.
 *
 * @param container - The container to trap focus in.
 * @returns void
 */
export const trapFocusKeydownHandler = (container: HTMLElement | null) => {
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  return (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !container) {
      return
    }

    const nodes = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
    )
    if (nodes.length === 0) {
      return
    }

    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
