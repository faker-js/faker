import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT verb.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerVerb(fakerCore) // 'copy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerVerb(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.hacker.verb);
}
