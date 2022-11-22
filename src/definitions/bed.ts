import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to bed.
 */
export type BedDefinitions = LocaleEntry<{
  name: string[];
  category: string[];
  style: string[];
  material: string[];
}>;
