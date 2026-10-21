import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

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
  return new Faker(fakerCore).helpers.fake(fakerCore.locale.person.bio_pattern);
}
