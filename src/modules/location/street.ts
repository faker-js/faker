import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random localized street name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationStreet(fakerCore) // 'Schroeder Isle'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationStreet(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.location.street_pattern
  );
}
