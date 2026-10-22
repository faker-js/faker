import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase noun that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyCatchPhraseNoun(fakerCore) // 'leverage'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyCatchPhraseNoun(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.company.noun);
}
