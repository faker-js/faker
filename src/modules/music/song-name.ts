import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random song name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMusicSongName(fakerCore) // 'White Christmas'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMusicSongName(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.music.song_name);
}
