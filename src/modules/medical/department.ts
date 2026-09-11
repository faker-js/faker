import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random hospital department.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * department(fakerCore) // 'Emergency Department'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function department(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.department);
}
