import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz noun that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyBuzzNoun(fakerCore) // 'paradigms'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyBuzzNoun(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.company.buzz_noun);
}
