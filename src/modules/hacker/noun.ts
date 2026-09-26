import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT noun.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hackerNoun(fakerCore) // 'system'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hackerNoun(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.hacker.noun);
}
