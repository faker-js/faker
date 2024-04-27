import { ModuleBase } from '../../internal/module-base';

/**
 * Module to generate music related entries.
 *
 * ### Overview
 *
 * Generate random music content.
 *
 * For a random album name, use [`album()`](https://fakerjs.dev/api/music.html#album).
 *
 * For a random artist, use [`artist()`](https://fakerjs.dev/api/music.html#artist).
 *
 * For a random genre, use [`genre()`](https://fakerjs.dev/api/music.html#genre).
 *
 * For a random song name, [`song()`](https://fakerjs.dev/api/music.html#song).
 *
 * All data types may be localized.
 */
export class MusicModule extends ModuleBase {
  /**
   * Returns a random album name.
   *
   * @example
   * faker.music.album() // '1989'
   *
   * @since 9.0.0
   */
  album(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.album);
  }

  /**
   * Returns a random artist name.
   *
   * @example
   * faker.music.artist() // 'The Beatles'
   *
   * @since 9.0.0
   */
  artist(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.artist);
  }

  /**
   * Returns a random music genre.
   *
   * @example
   * faker.music.genre() // 'Reggae'
   *
   * @since 5.2.0
   */
  genre(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.genre);
  }

  /**
   * Returns a random song name.
   *
   * @example
   * faker.music.song() // 'White Christmas'
   *
   * @since 7.1.0
   */
  song(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.music.song_name
    );
  }
}
