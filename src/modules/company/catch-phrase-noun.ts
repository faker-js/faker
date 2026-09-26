import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase noun that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyCatchPhraseNoun(fakerCore) // 'leverage'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyCatchPhraseNoun(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.company.noun);
}
