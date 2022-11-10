import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to beer.
 */
export type BeerDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  brewery: string[];
  taste: string[];
  type: string[];
  region: string[];
  zone: string[];
  size: string[];
}>;
