import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random rabbit species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalRabbit(fakerCore) // 'Florida White'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalRabbit(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.rabbit);
}
