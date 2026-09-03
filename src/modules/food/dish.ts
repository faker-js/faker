import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { boolean } from '../datatype/boolean';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random dish name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * dish(fakerCore) // 'Tagine-Rubbed Venison Salad'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function dish(fakerCore: FakerCore): string {
  // A 50/50 mix of specific dishes and dish_patterns
  if (boolean(fakerCore)) {
    return toTitleCase(
      new Faker(fakerCore).helpers.fake(fakerCore.locale.food.dish_pattern)
    );
  }

  return toTitleCase(arrayElement(fakerCore, fakerCore.locale.food.dish));
}
