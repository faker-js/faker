import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz verb that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyBuzzVerb(fakerCore) // 'empower'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyBuzzVerb(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.company.buzz_verb);
}
