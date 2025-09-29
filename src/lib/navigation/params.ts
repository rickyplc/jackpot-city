import type { ReadonlyURLSearchParams } from 'next/navigation'

export type ParamSearch = URLSearchParams | ReadonlyURLSearchParams

/**
 * Read a param and validate it against an allowed set.
 *
 * @param params - The URL parameters.
 * @param key - The key of the param.
 * @param allowed - The allowed set.
 * @returns The param value.
 */
export function readEnumParam<T extends string>(
  params: ParamSearch,
  key: string,
  allowed: ReadonlySet<T>,
): T | undefined {
  const raw = params.get(key)
  return raw && allowed.has(raw as T) ? (raw as T) : undefined
}

/**
 * Build a path with a param set or removed if
 * value is undefined or equals default.
 *
 * @param pathname - The pathname.
 * @param params - The URL parameters.
 * @param key - The key of the param.
 * @param value - The value of the param.
 * @param options - The options.
 * @returns The path with the given param.
 */
export const buildPathWithParam = <T extends string | undefined>(
  pathname: string,
  params: ParamSearch,
  key: string,
  value: T,
  options?: { defaultValue?: T },
): string => {
  const next = new URLSearchParams(params.toString())

  const shouldRemove = value === undefined || (options && value === options.defaultValue)

  if (shouldRemove) next.delete(key)
  else next.set(key, String(value))

  const qs = next.toString()
  return qs ? `${pathname}?${qs}` : pathname
}

/**
 * Read a toggle param that is "active" when param === activeValue.
 *
 * @param params - The URL parameters.
 * @param key - The key of the param.
 * @param activeValue - The active value.
 * @returns The toggle param.
 */
export const readToggleParam = (params: ParamSearch, key: string, activeValue: string): boolean => {
  return params.get(key) === activeValue
}
