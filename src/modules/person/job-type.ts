import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random job type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * personJobType(fakerCore) // 'Assistant'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personJobType(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.person.job_type);
}
