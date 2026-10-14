import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT abbreviation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerAbbreviation(fakerCore) // 'THX'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerAbbreviation(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.hacker.abbreviation);
}
