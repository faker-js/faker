import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random medical specialty.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalSpecialty(fakerCore) // 'Cardiology'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalSpecialty(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.medical.specialty);
}
