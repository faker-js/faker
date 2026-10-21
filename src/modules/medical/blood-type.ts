import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random blood type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalBloodType(fakerCore) // 'O+'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalBloodType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.medical.blood_type
  );
}
