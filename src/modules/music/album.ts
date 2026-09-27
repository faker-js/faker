import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random album name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * musicAlbum(fakerCore) // '1989'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function musicAlbum(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.music.album);
}
