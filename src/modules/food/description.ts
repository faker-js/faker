import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random dish description.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFoodDescription(fakerCore) // 'An exquisite ostrich roast, infused with the essence of longan, slow-roasted to bring out its natural flavors and served with a side of creamy red cabbage'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFoodDescription(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.food.description_pattern
  );
}
