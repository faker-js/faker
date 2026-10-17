import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random, plausible medical condition name (without any diagnosis code).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMedicalCondition(fakerCore) // 'Type 2 Diabetes'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMedicalCondition(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.medical.condition);
}
