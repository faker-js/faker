import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT adjective.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * adjective(fakerCore) // 'cross-platform'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function adjective(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.hacker.adjective);
}
