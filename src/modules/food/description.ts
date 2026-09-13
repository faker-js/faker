import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random dish description.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * foodDescription(fakerCore) // 'An exquisite ostrich roast, infused with the essence of longan, slow-roasted to bring out its natural flavors and served with a side of creamy red cabbage'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function foodDescription(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.food.description_pattern
  );
}
