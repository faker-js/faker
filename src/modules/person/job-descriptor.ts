import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job descriptor.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personJobDescriptor(fakerCore) // 'Customer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personJobDescriptor(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.person.job_descriptor);
}
