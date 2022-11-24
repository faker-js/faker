import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to kitchen.
 */
export type KitchenDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  category: string[];
  style: string[];
  material: string[];
}>;
