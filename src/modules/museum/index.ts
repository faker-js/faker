import type { Faker } from '../..';

/**
 * Module to generate museum related entries.
 */
export class MuseumModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MuseumModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random museum name.
   *
   * @example
   * faker.museum.museumName() // 'British Museum'
   *
   * @since 8.0.0
   */
  museumName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.museum.name);
  }

  /**
   * Returns a random museum category.
   *
   * @example
   * faker.museum.museumCategory() // 'Art'
   *
   * @since 8.0.0
   */
  museumCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.museum.category
    );
  }
}
