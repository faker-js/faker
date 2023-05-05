import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to plants.
 */
export type PlantDefinition = LocaleEntry<{
  tree: string[];
  flower: string[];
}>;
