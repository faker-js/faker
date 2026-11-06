import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Returns a random short biography
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonBio(fakerCore) // 'oatmeal advocate, veteran 🐠'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonBio(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.person.bio_pattern
  );
}
