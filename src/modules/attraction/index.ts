import type { Faker } from '../..';

/**
 * Module to generate attraction related entries.
 */
export class AttractionModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(AttractionModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random attraction name.
   *
   * @example
   * faker.attraction.attractionName() // 'Desmo Race'
   *
   * @since 8.0.0
   */
  attractionName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.name
    );
  }

  /**
   * Returns a random attraction category.
   *
   * @example
   * faker.attraction.attractionCategory() // 'Roller coaster'
   *
   * @since 8.0.0
   */
  attractionCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.category
    );
  }

  /**
   * Returns a random attraction description.
   *
   * @example
   * faker.attraction.attractionDescription() // 'Thanks to Desmo Race you will be able to accelerate, brake and then accelerate again to get the better of your friends or family. They are interactive roller coasters that will make you feel as if you were riding a Panigale V4.'
   *
   * @since 8.0.0
   */
  attractionDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.description
    );
  }

  /**
   * Returns a random attraction age.
   *
   * @example
   * faker.attraction.attractionAge() // 'Six years'
   *
   * @since 8.0.0
   */
  attractionAge(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.age
    );
  }

  /**
   * Returns a random attraction height.
   *
   * @example
   * faker.attraction.attractionHeight() // '120cm'
   *
   * @since 8.0.0
   */
  attractionHeight(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.height
    );
  }

  /**
   * Returns a random attraction intensity.
   *
   * @example
   * faker.attraction.attractionIntensity() // 'Intense'
   *
   * @since 8.0.0
   */
  attractionIntensity(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.intensity
    );
  }

  /**
   * Returns a random attraction recommended.
   *
   * @example
   * faker.attraction.attractionRecommended() // 'Teenagers & Adults'
   *
   * @since 8.0.0
   */
  attractionRecommended(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.attraction.recommended
    );
  }
}
