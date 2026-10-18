import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random sex.
 *
 * Output of this method is localised, so it should not be used to fill the parameter `sex`
 * available in some other modules for example `fakePersonFirstName(fakerCore)`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see fakePersonGender(fakerCore): For generating a gender related value.
 * @see fakePersonSexType(fakerCore): For generating a sex value to be used as a parameter.
 *
 * @example
 * fakePersonSex(fakerCore) // 'female'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonSex(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.sex);
}
