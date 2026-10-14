import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random artist name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMusicArtist(fakerCore) // 'The Beatles'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMusicArtist(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.music.artist);
}
