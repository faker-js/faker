import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random symptom.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * symptom(fakerCore) // 'Shortness of Breath'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function symptom(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.symptom);
}
