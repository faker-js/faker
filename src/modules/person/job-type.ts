import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random job type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * jobType(fakerCore) // 'Assistant'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function jobType(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.job_type);
}
