import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT adjective.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerAdjective(fakerCore) // 'cross-platform'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerAdjective(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.hacker.adjective);
}
