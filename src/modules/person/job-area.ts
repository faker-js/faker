import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job area.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personJobArea(fakerCore) // 'Brand'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personJobArea(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.person.job_area);
}
