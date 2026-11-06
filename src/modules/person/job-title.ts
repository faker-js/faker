import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random job title.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonJobTitle(fakerCore) // 'Global Accounts Engineer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonJobTitle(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.person.job_title_pattern
  );
}
