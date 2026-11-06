import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Returns a product description.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceProductDescription(fakerCore) // 'Featuring Phosphorus-enhanced technology, our Fish offers unparalleled Modern performance'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceProductDescription(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.commerce.product_description
  );
}
