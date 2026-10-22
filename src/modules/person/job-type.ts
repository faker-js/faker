import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakePersonJobType(fakerCore) // 'Assistant'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonJobType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.person.job_type);
}
