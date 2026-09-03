import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random medical procedure.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * procedure(fakerCore) // 'Appendectomy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function procedure(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.procedure);
}
