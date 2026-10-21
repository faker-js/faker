import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random snake species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeAnimalSnake(fakerCore) // 'Eyelash viper'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeAnimalSnake(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.animal.snake);
}
