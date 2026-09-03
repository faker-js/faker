import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random job title.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * jobTitle(fakerCore) // 'Global Accounts Engineer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function jobTitle(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.person.job_title_pattern
  );
}
