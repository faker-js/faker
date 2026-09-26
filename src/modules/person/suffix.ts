import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random person suffix.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personSuffix(fakerCore) // 'DDS'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personSuffix(fakerCore: FakerCore): string {
  // TODO @Shinigami92 2022-03-21: Add female_suffix and male_suffix
  return helpersArrayElement(fakerCore, fakerCore.locale.person.suffix);
}
