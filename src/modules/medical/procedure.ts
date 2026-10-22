import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random medical procedure.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalProcedure(fakerCore) // 'Appendectomy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalProcedure(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.medical.procedure);
}
