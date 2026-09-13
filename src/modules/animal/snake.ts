import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random snake species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * snake(fakerCore) // 'Eyelash viper'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function snake(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.snake);
}
