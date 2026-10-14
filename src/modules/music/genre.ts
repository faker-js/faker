import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random music genre.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeMusicGenre(fakerCore) // 'Reggae'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeMusicGenre(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.music.genre);
}
