import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT verb.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * verb(fakerCore) // 'copy'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function verb(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.hacker.verb);
}
