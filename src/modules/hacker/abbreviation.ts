import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT abbreviation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * abbreviation(fakerCore) // 'THX'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function abbreviation(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.hacker.abbreviation);
}
