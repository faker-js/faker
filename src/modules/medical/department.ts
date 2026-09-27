import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hospital department.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * medicalDepartment(fakerCore) // 'Emergency Department'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function medicalDepartment(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.medical.department);
}
