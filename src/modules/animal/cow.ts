import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random cow species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalCow(fakerCore) // 'Brava'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalCow(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.cow);
}
