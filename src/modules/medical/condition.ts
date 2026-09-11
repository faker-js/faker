import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random, plausible medical condition name (without any diagnosis code).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * condition(fakerCore) // 'Type 2 Diabetes'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function condition(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.condition);
}
