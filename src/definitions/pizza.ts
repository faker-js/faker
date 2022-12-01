import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to book's names.
 */
export type PizzaDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  category: string[];
  preparation: string[];
  ingredients: string[];
}>;
