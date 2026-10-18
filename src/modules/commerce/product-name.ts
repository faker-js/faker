import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random descriptive product name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceProductName(fakerCore) // 'Incredible Soft Gloves'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceProductName(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.commerce.product_name.pattern
  );
}
