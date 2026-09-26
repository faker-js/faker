import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random localized county, or other equivalent second-level administrative entity for the locale's country such as a district or department.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationCounty(fakerCoreEN_GB) // 'Cambridgeshire'
 * locationCounty(fakerCoreEN_US) // 'Monroe County'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationCounty(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.location.county);
}
