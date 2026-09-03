import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random person suffix.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * suffix(fakerCore) // 'DDS'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function suffix(fakerCore: FakerCore): string {
  // TODO @Shinigami92 2022-03-21: Add female_suffix and male_suffix
  return arrayElement(fakerCore, fakerCore.locale.person.suffix);
}
