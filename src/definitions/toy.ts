import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to toy.
 */
export type ToyDefinitions = LocaleEntry<{
  name: string[];
  brand: string[];
  category: string[];
  age: string[];
  description: string[];
}>;
