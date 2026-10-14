import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job descriptor.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonJobDescriptor(fakerCore) // 'Customer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonJobDescriptor(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.job_descriptor);
}
