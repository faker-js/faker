import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random company name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * name(fakerCore) // 'Zieme, Hauck and McClure'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function name(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.company.name_pattern
  );
}
