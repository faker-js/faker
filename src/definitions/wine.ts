import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to wine.
 */
export type WineDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  winery: string[];
  bio: string[];
  type: string[];
  region: string[];
  wineZone: string[];
  appellation: string[];
  composition: string[];
  bottleType: string[];
  content: string[];
}>;
