import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hospital department.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalDepartment(fakerCore) // 'Emergency Department'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalDepartment(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.medical.department);
}
