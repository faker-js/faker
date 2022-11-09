import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to jewels.
 */
export type JewelsDefinitions = LocaleEntry<{
  brand: string[];
  model: string[];
  category: string[];
  material: string[];
  gender: string[];
}>;
