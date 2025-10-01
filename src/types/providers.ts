export type ProviderId = 'pragmatic' | 'evolution' | 'netent' | 'microgaming'

export type ProviderItem = {
  id: ProviderId
  label: string
}

export const PROVIDERS: ProviderItem[] = [
  { id: 'pragmatic', label: 'Pragmatic Play' },
  { id: 'evolution', label: 'Evolution' },
  { id: 'netent', label: 'NetEnt' },
  { id: 'microgaming', label: 'Microgaming' },
] as const

export const PROVIDER_ID_SET: ReadonlySet<ProviderId> = new Set(
  PROVIDERS.map((provider) => provider.id),
)
