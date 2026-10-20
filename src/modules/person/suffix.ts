import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random person suffix.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonSuffix(fakerCore) // 'DDS'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonSuffix(fakerCore: FakerCore): string {
  // TODO @Shinigami92 2022-03-21: Add female_suffix and male_suffix
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.suffix);
}
