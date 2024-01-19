import type { LocaleEntry } from './definitions';

export type FoodDefinition = LocaleEntry<{
  /**
   * Common food adjectives.
   */
  adjective: string[];

  /**
   * List of description patterns.
   */
  description_pattern: string[];

  /**
   * Common dish names.
   */
  dish: string[];

  /**
   * List of dish patterns.
   */
  dish_pattern: string[];

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
   * Common meat names.
   */
  meat: string[];

  /**
   * A list of common spice names.
   */
  spice: string[];

  /**
   * A list of common vegetable names.
   */
  vegetable: string[];
}>;
