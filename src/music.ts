import type { Faker } from '.';

export class Music {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Music.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    // TODO @Shinigami92 2022-01-12: We should find a better strategy as assigning this property to a function
    // @ts-expect-error
    this.genre.schema = {
      description: 'Generates a genre.',
      sampleResults: ['Rock', 'Metal', 'Pop'],
    };
  }

  /**
   * genre
   *
   * @method faker.music.genre
   */
  genre(): string {
    return this.faker.random.arrayElement(this.faker.definitions.music.genre);
  }
}
