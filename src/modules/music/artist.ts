import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random artist name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * musicArtist(fakerCore) // 'The Beatles'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function musicArtist(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.music.artist);
}
