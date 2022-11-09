import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to liquor.
 */
export type LiquorDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  brand: string[];
  category: string[];
  size: string[];
}>;
