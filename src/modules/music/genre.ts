import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random music genre.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * genre(fakerCore) // 'Reggae'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function genre(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.music.genre);
}
