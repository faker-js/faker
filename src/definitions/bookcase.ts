import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to bookcase.
 */
export type BookcaseDefinitions = LocaleEntry<{
  name: string[];
  category: string[];
  style: string[];
  material: string[];
}>;
