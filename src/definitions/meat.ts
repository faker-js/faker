import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to meat.
 */
export type MeatDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  category: string[];
  cut: string[];
}>;
