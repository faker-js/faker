import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random descriptive product name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * productName(fakerCore) // 'Incredible Soft Gloves'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function productName(fakerCore: FakerCore): string {
  const patterns = fakerCore.locale.commerce.product_name.pattern;
  return new Faker(fakerCore).helpers.fake(patterns);
}
