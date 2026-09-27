import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random gender.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see personSex(fakerCore): For generating a binary-gender value.
 *
 * @example
 * personGender(fakerCore) // 'Trans*Man'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personGender(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.person.gender);
}
