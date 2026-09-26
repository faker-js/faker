import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random, plausible medical condition name (without any diagnosis code).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * medicalCondition(fakerCore) // 'Type 2 Diabetes'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function medicalCondition(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.medical.condition);
}
