import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to videogame.
 */
export type VideogameDefinitions = LocaleEntry<{
  publisher: string[];
  brand: string[];
  developer: string[];
  name: string[];
  description: string[];
  genre: string[];
  ageRating: string[];
  platform: string[];
  condition: string[];
}>;
