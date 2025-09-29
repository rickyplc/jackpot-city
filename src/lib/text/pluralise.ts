/**
 * Pluralises a word based on the count.
 *
 * @param count - The number of items.
 * @param singular - The singular form of the word.
 * @param plural - The plural form of the word.
 * @returns The plural form of the word.
 */
export const pluralise = (count: number, singular: string, plural?: string) => {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}
