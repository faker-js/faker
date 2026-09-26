import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random music genre.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * musicGenre(fakerCore) // 'Reggae'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function musicGenre(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.music.genre);
}
