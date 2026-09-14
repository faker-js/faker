import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random blood type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bloodType(fakerCore) // 'O+'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bloodType(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.blood_type);
}
