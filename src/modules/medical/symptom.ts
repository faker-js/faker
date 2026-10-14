import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random symptom.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalSymptom(fakerCore) // 'Shortness of Breath'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalSymptom(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.medical.symptom);
}
