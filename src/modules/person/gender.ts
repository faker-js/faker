import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random gender.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see sex(fakerCore): For generating a binary-gender value.
 *
 * @example
 * gender(fakerCore) // 'Trans*Man'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function gender(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.gender);
}
