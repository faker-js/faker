import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random sex.
 *
 * Output of this method is localised, so it should not be used to fill the parameter `sex`
 * available in some other modules for example `firstName(fakerCore)`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see gender(fakerCore): For generating a gender related value.
 * @see sexType(fakerCore): For generating a sex value to be used as a parameter.
 *
 * @example
 * sex(fakerCore) // 'female'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function sex(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.sex);
}
