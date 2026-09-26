import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random zodiac sign.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personZodiacSign(fakerCore) // 'Pisces'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personZodiacSign(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.person.western_zodiac_sign);
}
