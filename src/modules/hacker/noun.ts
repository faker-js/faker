import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT noun.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerNoun(fakerCore) // 'system'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerNoun(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.hacker.noun);
}
