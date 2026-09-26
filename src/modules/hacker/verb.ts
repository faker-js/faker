import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT verb.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hackerVerb(fakerCore) // 'copy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hackerVerb(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.hacker.verb);
}
