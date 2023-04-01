import type { Faker } from '../..';

/**
 * Module to generate music related entries.
 *
 * ### Overview
 *
 * Generate a random music genre with [`genre()`](https://next.fakerjs.dev/api/music.html#genre) or song name with [`songName()`](https://next.fakerjs.dev/api/music.html#songname). Both may be localized.
 */
export class MusicModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      MusicModule.prototype
    ) as Array<keyof MusicModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
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
   * faker.music.songName() // 'White Christmas'
   *
   * @since 7.1.0
   */
  songName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.music.song_name
    );
  }
}
