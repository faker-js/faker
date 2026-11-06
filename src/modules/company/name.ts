import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random company name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyName(fakerCore) // 'Zieme, Hauck and McClure'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyName(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.company.name_pattern
  );
}
