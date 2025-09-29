import type { ParamSearch } from '@/lib/navigation/params'
import { buildPathWithParam, readEnumParam } from '@/lib/navigation/params'
import type { ProviderId } from '@/types'
import { PROVIDER_ID_SET } from '@/types/providers'

/**
 * Derive the provider state from the URL parameters.
 *
 * @param params - The URL parameters.
 * @returns The provider state.
 */
export const deriveProviderFromParams = (params: ParamSearch): ProviderId | undefined => {
  return readEnumParam<ProviderId>(params, 'provider', PROVIDER_ID_SET)
}

/**
 * Build a path with the given provider.
 *
 * @param pathname - The pathname.
 * @param params - The URL parameters.
 * @param provider - The provider.
 * @returns The path with the given provider.
 */
export const buildPathWithProvider = (
  pathname: string,
  params: ParamSearch,
  provider?: ProviderId,
): string => {
  // Remove the provider param if it is undefined
  return buildPathWithParam(pathname, params, 'provider', provider)
}
