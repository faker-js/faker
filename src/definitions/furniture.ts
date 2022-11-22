import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to furniture.
 */
export type FurnitureDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  category: string[];
  style: string[];
  material: string[];
}>;
