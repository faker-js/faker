import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random job descriptor.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * jobDescriptor(fakerCore) // 'Customer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function jobDescriptor(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.person.job_descriptor);
}
