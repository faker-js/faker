import type { Faker } from '../..';

/**
 * Module to generate music related entries.
 */
export class Music {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Music.prototype)) {
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
   */
  genre(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.music.genre);
  }

  /**
   * Returns a random song name.
   *
   * @example
   * faker.music.songName() // 'White Christmas'
   */
  songName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.music.song_name
    );
  }
}
