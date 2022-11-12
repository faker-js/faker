import type { Faker } from '../..';

/**
 * Module to generate videogame related entries.
 */
export class VideogameModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(VideogameModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random videogame name.
   *
   * @example
   * faker.videogame.videogameName() // 'Call of Duty: Modern Warfare II'
   *
   * @since 8.0.0
   */
  videogameName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.name
    );
  }

  /**
   * Returns a random videogame name.
   *
   * @example
   * faker.videogame.videogameDescription() // 'Call of Duty: Modern Warfare II drops players into an unprecedented global conflict that features the return of the iconic operators of Task Force 141. Modern Warfare® II will launch with a globe-trotting single-player campaign, immersive multiplayer combat, and an evolved special ops game mode featuring tactical co-op gameplay'
   *
   * @since 8.0.0
   */
  videogameDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.description
    );
  }

  /**
   * Returns a random videogame brand.
   *
   * @example
   * faker.videogame.videogameBrand() // 'Activision'
   *
   * @since 8.0.0
   */
  videogameBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.brand
    );
  }

  /**
   * Returns a random videogame publisher.
   *
   * @example
   * faker.videogame.videogamePublisher() // 'Activision'
   *
   * @since 8.0.0
   */
  videogamePublisher(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.publisher
    );
  }

  /**
   * Returns a random videogame developer.
   *
   * @example
   * faker.videogame.videogameDeveloper() // 'Activision'
   *
   * @since 8.0.0
   */
  videogameDeveloper(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.developer
    );
  }

  /**
   * Returns a random videogame age rating.
   *
   * @example
   * faker.videogame.videogameAgeRating() // '18+'
   *
   * @since 8.0.0
   */
  videogameAgeRating(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.ageRating
    );
  }

  /**
   * Returns a random videogame genre.
   *
   * @example
   * faker.videogame.videogameGenre() // 'Action'
   *
   * @since 8.0.0
   */
  videogameGenre(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.genre
    );
  }

  /**
   * Returns a random videogame platform.
   *
   * @example
   * faker.videogame.videogamePlatform() // 'Playstation 5'
   *
   * @since 8.0.0
   */
  videogamePlatform(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.platform
    );
  }

  /**
   * Returns a random videogame condition.
   *
   * @example
   * faker.videogame.videogameCondition() // 'New'
   *
   * @since 8.0.0
   */
  videogameCondition(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.videogame.condition
    );
  }
}
