import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to plant.
 */
export type PlantDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  potSize: string[];
  category: string[];
}>;
