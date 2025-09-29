import { trapFocusKeydownHandler, useBodyScrollLock, useIsMounted } from '@/lib/ui/overlay'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

/* ---------------------------------- HOOKS ---------------------------------- */

describe('useIsMounted', () => {
  it('returns true in a browser-like (jsdom) environment', () => {
    const { result } = renderHook(() => useIsMounted())
    expect(result.current).toBe(true)
  })
})

describe('useBodyScrollLock', () => {
  it('does nothing when locked=false', () => {
    document.body.style.overflow = 'auto'
    renderHook(() => useBodyScrollLock(false))
    expect(document.body.style.overflow).toBe('auto')
  })

  it('sets overflow=hidden when locked=true, and restores on unmount', () => {
    document.body.style.overflow = 'auto'
    const { unmount } = renderHook(() => useBodyScrollLock(true))

    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('auto')
  })

  it('restores the exact previous overflow value when toggled back to false', () => {
    // previous value is something non-default to ensure proper restoration
    document.body.style.overflow = 'scroll'

    const { rerender, unmount } = renderHook(
      ({ locked }: { locked: boolean }) => useBodyScrollLock(locked),
      { initialProps: { locked: true } },
    )

    expect(document.body.style.overflow).toBe('hidden')

    // Toggle to false -> cleanup should restore previous value ('scroll')
    rerender({ locked: false })
    expect(document.body.style.overflow).toBe('scroll')

    // Unmount should not change anything further
    unmount()
    expect(document.body.style.overflow).toBe('scroll')
  })
})

/* ------------------------------ FOCUS TRAPPING ----------------------------- */

describe('trapFocusKeydownHandler', () => {
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  function makeContainer() {
    const container = document.createElement('div')
    container.innerHTML = `
      <button id="first">First</button>
      <input id="middle" />
      <a id="link" href="#">Link</a>
      <button id="disabled" disabled>Disabled</button>
      <button id="hidden" aria-hidden="true">Hidden</button>
      <div id="tabTarget" tabindex="0">Tabbable div</div>
      <div id="untabbable" tabindex="-1">Not tabbable</div>
    `
    document.body.appendChild(container)
    return container
  }

  /**
   * Compute edges the same way the SUT does
   *
   * @param container - The container to compute edges for.
   * @returns The edges of the container.
   */
  const getEdges = (container: HTMLElement) => {
    const nodes = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
    )

    return {
      nodes,
      first: nodes[0] ?? null,
      last: nodes.length ? nodes[nodes.length - 1] : null,
    }
  }

  it('cycles focus from last -> first on Tab (no shift)', () => {
    const container = makeContainer()
    const handler = trapFocusKeydownHandler(container)
    const { first, last } = getEdges(container)
    expect(first?.id).toBe('first')
    expect(last?.id).toBe('tabTarget')

    last!.focus()
    expect(document.activeElement).toBe(last)

    const evt = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent
    handler(evt)

    expect(evt.preventDefault).toHaveBeenCalled()
    expect(document.activeElement).toBe(first)

    container.remove()
  })

  it('cycles focus from first -> last on Shift+Tab', () => {
    const container = makeContainer()
    const handler = trapFocusKeydownHandler(container)
    const { first, last } = getEdges(container)
    expect(first?.id).toBe('first')
    expect(last?.id).toBe('tabTarget')

    first!.focus()
    expect(document.activeElement).toBe(first)

    const evt = { key: 'Tab', shiftKey: true, preventDefault: vi.fn() } as unknown as KeyboardEvent
    handler(evt)

    expect(evt.preventDefault).toHaveBeenCalled()
    expect(document.activeElement).toBe(last)

    container.remove()
  })

  it('ignores disabled and aria-hidden elements when computing edges', () => {
    const container = makeContainer()
    const handler = trapFocusKeydownHandler(container)
    const { first, last, nodes } = getEdges(container)

    // Assert edges don't include disabled/hidden
    expect(nodes.some((n) => n.id === 'disabled')).toBe(false)
    expect(nodes.some((n) => n.id === 'hidden')).toBe(false)
    expect(first?.id).toBe('first')
    expect(last?.id).toBe('tabTarget')

    // Now check wrapping still works with those edges
    last!.focus()
    const evt = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent
    handler(evt)
    expect(evt.preventDefault).toHaveBeenCalled()
    expect(document.activeElement).toBe(first)

    container.remove()
  })

  it('does nothing when there are no focusable nodes', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const handler = trapFocusKeydownHandler(container)

    const outside = document.createElement('button')
    document.body.appendChild(outside)
    outside.focus()
    expect(document.activeElement).toBe(outside)

    const evt = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent
    handler(evt)

    expect(evt.preventDefault).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(outside)

    outside.remove()
    container.remove()
  })

  it('does nothing when the key is not Tab', () => {
    const container = makeContainer()
    const handler = trapFocusKeydownHandler(container)

    const first = container.querySelector('#first') as HTMLElement
    first.focus()
    const evt = {
      key: 'Enter',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent
    handler(evt)

    expect(evt.preventDefault).not.toHaveBeenCalled()
    expect((document.activeElement as HTMLElement)?.id).toBe('first')

    container.remove()
  })

  it('is safe when container is null', () => {
    const handler = trapFocusKeydownHandler(null)
    const evt = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent
    expect(() => handler(evt)).not.toThrow()
    expect(evt.preventDefault).not.toHaveBeenCalled()
  })
})
