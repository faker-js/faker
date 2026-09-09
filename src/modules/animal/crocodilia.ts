import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random crocodilian species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * crocodilia(fakerCore) // 'Philippine Crocodile'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function crocodilia(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.crocodilia);
}
