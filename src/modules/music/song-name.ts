import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random song name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * musicSongName(fakerCore) // 'White Christmas'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function musicSongName(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.music.song_name);
}
