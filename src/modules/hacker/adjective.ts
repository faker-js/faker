import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT adjective.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hackerAdjective(fakerCore) // 'cross-platform'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hackerAdjective(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.hacker.adjective);
}
