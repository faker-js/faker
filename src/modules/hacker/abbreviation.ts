import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT abbreviation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hackerAbbreviation(fakerCore) // 'THX'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hackerAbbreviation(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.hacker.abbreviation);
}
