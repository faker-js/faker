import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random cow species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * cow(fakerCore) // 'Brava'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cow(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.cow);
}
