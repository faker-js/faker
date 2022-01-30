import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to music.
 */
export interface MusicDefinitions {
  /**
   * The names of some music genres.
   */
  genre: Texts;
}

/**
 * Internal: A list of all keys for the LoremDefinitions.
 */
export const music = allOf<keyof MusicDefinitions>()('genre');
