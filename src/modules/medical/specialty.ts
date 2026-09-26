import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random medical specialty.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * medicalSpecialty(fakerCore) // 'Cardiology'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function medicalSpecialty(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.medical.specialty);
}
