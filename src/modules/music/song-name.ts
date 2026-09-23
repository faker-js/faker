import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random song name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * songName(fakerCore) // 'White Christmas'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function songName(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.music.song_name);
}
