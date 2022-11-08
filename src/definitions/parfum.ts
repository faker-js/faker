import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to parfum.
 */
export type ParfumDefinitions = LocaleEntry<{
  brand: string[];
  model: string[];
  category: string[];
  size: string[];
  capacity: string[];
  gender: string[];
  description: string[];
  composition: string[];
}>;
