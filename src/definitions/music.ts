import { allOf } from './utils';

/**
 * The possible definitions related to music.
 */
export interface MusicDefinitions {
  /**
   * The names of some music genres.
   */
  genre: string[];
}

/**
 * Internal: A list of all keys for the MusicDefinitions.
 */
export const MUSIC = allOf<keyof MusicDefinitions>()('genre');
