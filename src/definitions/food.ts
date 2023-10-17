import type { LocaleEntry } from './definitions';

export type FoodDefinition = LocaleEntry<{
  /**
   * List of description patterns.
   */
  description_pattern: string[];

  /**
   * Common dish names.
   */
  dish: string[];

  /**
   * A list of cooking styles that are commonly associated with a particular food item or recipe.
   */
  ethnic_category: string[];

  /**
   * A list of common fruit names.
   */
  fruit: string[];

  /**
   * Common ingredient names.
   */
  ingredient: string[];

  /**
   * A list of common spice names.
   */
  spice: string[];

  /**
   * A list of common vegetable names.
   */
  vegetable: string[];
}>;
