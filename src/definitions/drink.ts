import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to drink.
 */
export type DrinkDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  brand: string[];
  category: string[];
}>;
