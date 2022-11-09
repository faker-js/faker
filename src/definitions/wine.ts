import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to wine.
 */
export type WineDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  winery: string[];
  type: string[];
  region: string[];
  zone: string[];
  appellation: string[];
  composition: string[];
  size: string[];
}>;
