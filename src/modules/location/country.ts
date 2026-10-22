import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random country name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationCountry(fakerCore) // 'Greece'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationCountry(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.location.country);
}
