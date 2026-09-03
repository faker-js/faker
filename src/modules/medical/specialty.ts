import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random medical specialty.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * specialty(fakerCore) // 'Cardiology'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function specialty(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.specialty);
}
