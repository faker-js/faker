import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz verb that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyBuzzVerb(fakerCore) // 'empower'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyBuzzVerb(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.company.buzz_verb);
}
