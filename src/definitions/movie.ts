import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to movie's names.
 */
export type MovieDefinitions = LocaleEntry<{
  title: string[];
  director: string[];
  writers: string[];
  cast: string[];
  description: string[];
  duration: string[];
  genre: string[];
}>;
