import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random gender.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see fakePersonSex(fakerCore): For generating a binary-gender value.
 *
 * @example
 * fakePersonGender(fakerCore) // 'Trans*Man'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonGender(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.gender);
}
