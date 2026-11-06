import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

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
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.commerce.product_name.pattern
  );
}
