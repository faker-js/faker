import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to glasses.
 */
export type GlassesDefinitions = LocaleEntry<{
  brand: string[];
  productType: string[];
  gender: string[];
  shape: string[];
  material: string[];
  size: string[];
  lensType: string[];
}>;
