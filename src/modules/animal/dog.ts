import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random dog breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * dog(fakerCore) // 'Irish Water Spaniel'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function dog(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.dog);
}
