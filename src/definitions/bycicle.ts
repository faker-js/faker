import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to book's names.
 */
export type BycicleDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  material: string[];
  category: string[];
  description: string[];
  size: string[];
  gender: string[];
}>;
