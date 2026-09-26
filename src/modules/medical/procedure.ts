import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random medical procedure.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * medicalProcedure(fakerCore) // 'Appendectomy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function medicalProcedure(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.medical.procedure);
}
