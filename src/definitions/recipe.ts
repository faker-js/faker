import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to recipe's names.
 */
export type RecipeDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  category: string[];
  preparation: string[];
  ingredients: string[];
  difficulty: string[];
  doses: string[];
}>;
