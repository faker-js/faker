import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random album name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMusicAlbum(fakerCore) // '1989'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMusicAlbum(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.music.album);
}
