import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random job area.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * jobArea(fakerCore) // 'Brand'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function jobArea(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.job_area);
}
