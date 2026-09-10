import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random artist name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * artist(fakerCore) // 'The Beatles'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function artist(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.music.artist);
}
