import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Returns a random short biography
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personBio(fakerCore) // 'oatmeal advocate, veteran 🐠'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personBio(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(fakerCore.locale.person.bio_pattern);
}
