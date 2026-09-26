import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { datatypeBoolean } from '../datatype/boolean';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Converts the given string to title case.
 *
 * @param text The text to convert.
 */
function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates a random dish name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodDish(fakerCore) // 'Tagine-Rubbed Venison Salad'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodDish(fakerCore: FakerCore): string {
  // A 50/50 mix of specific dishes and dish_patterns
  if (datatypeBoolean(fakerCore)) {
    return toTitleCase(
      new Faker(fakerCore).helpers.fake(fakerCore.locale.food.dish_pattern)
    );
  }

  return toTitleCase(
    helpersArrayElement(fakerCore, fakerCore.locale.food.dish)
  );
}
