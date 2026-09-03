import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase noun that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * catchPhraseNoun(fakerCore) // 'leverage'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function catchPhraseNoun(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.company.noun);
}
