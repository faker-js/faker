import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random zodiac sign.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * zodiacSign(fakerCore) // 'Pisces'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function zodiacSign(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.western_zodiac_sign);
}
