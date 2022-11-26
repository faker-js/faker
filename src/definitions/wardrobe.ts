import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to wardrobe.
 */
export type WardrobeDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  category: string[];
  style: string[];
  material: string[];
}>;
