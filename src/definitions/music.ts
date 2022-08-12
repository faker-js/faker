import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to music.
 */
export type MusicDefinitions = LocaleEntry<{
  /**
   * The names of some music genres.
   */
  genre: string[];

  /**
   * The names of some songs.
   */
  song_name: string[];
}>;
