import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to cosmetic.
 */
export type CosmeticDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  category: string[];
  description: string[];
  howToUse: string[];
}>;
