import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to stay's names.
 */
export type StaysDefinitions = LocaleEntry<{
  propertyName: string[];
  propertyType: string[];
  description: string[];
  facilities: string[];
  starRating: string[];
  reviewScore: string[];
  brands: string[];
}>;
