import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random zodiac sign.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonZodiacSign(fakerCore) // 'Pisces'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonZodiacSign(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.person.western_zodiac_sign
  );
}
