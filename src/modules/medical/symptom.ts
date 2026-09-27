import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random symptom.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * medicalSymptom(fakerCore) // 'Shortness of Breath'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function medicalSymptom(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.medical.symptom);
}
