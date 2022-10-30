import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to food's names.
 */
export type FoodDefinitions = LocaleEntry<{
  name: string[];
  type: string[];
  description: string[];
  flavor: string[];
}>;
