import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to music.
 */
export type MusicDefinition = LocaleEntry<{
  /**
   * The names of some albums.
   */
  album: string[];

  /**
   * The names of some artists.
   */
  artist: string[];

  /**
   * The names of some music genres.
   */
  genre: string[];

  /**
   * The names of some songs.
   */
  song_name: string[];
}>;
