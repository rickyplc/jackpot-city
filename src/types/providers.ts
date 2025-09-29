export type ProviderIconId = 'pragmatic' | 'evolution' | 'netent' | 'microgaming'

export type ProviderId = 'pragmatic' | 'evolution' | 'netent' | 'microgaming' | (string & {})

export type ProviderItem = {
  id: ProviderId
  label: string
  iconId?: ProviderIconId
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
