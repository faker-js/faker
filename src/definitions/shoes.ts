import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to shoes.
 */
export type ShoesDefinitions = LocaleEntry<{
  brand: string[];
  productType: string[];
  size: string[];
  style: string[];
  material: string[];
}>;
