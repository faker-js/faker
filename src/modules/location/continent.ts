import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random continent name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationContinent(fakerCore) // 'Asia'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationContinent(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.location.continent
  );
}
