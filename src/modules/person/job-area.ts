import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job area.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonJobArea(fakerCore) // 'Brand'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonJobArea(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.job_area);
}
