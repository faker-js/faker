import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random localized county, or other equivalent second-level administrative entity for the locale's country such as a district or department.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationCounty(fakerCoreEN_GB) // 'Cambridgeshire'
 * fakeLocationCounty(fakerCoreEN_US) // 'Monroe County'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationCounty(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.location.county);
}
