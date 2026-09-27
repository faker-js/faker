import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random snake species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalSnake(fakerCore) // 'Eyelash viper'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalSnake(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.snake);
}
