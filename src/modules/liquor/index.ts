import type { Faker } from '../..';

/**
 * Module to generate liquor related entries.
 */
export class LiquorModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(LiquorModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random liquor name.
   *
   * @example
   * faker.liquor.liquorName() // 'Gordon's London Dry Gin Bottle 750ml'
   *
   * @since 8.0.0
   */
  liquorName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.liquor.name);
  }

  /**
   * Returns a random liquor brand.
   *
   * @example
   * faker.liquor.liquorBrand() // 'Gordon's'
   *
   * @since 8.0.0
   */
  liquorBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.liquor.brand);
  }

  /**
   * Returns a random liquor category.
   *
   * @example
   * faker.liquor.liquorCategory() // 'Gin'
   *
   * @since 8.0.0
   */
  liquorCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.liquor.category
    );
  }

  /**
   * Returns a random liquor description.
   *
   * @example
   * faker.liquor.liquorDescription() // 'Gordon's Gin is the world's best-selling gin. It has received four Royal Warrants as well as a flurry of international gin prizes. Since their inception, they have been exporting gin all over the world earning the title of the World's Favourite Gin.'
   *
   * @since 8.0.0
   */
  liquorDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.liquor.description
    );
  }

  /**
   * Returns a random liquor origin.
   *
   * @example
   * faker.liquor.liquorOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  liquorOrigin(): string {
    return this.faker.location.country();
  }

  /**
   * Returns a random liquor alcoholic content.
   *
   * @example
   * faker.liquor.liquorAlcoholicContent() // '10'
   *
   * @since 8.0.0
   */
  liquorAlcoholicContent(): number {
    return this.faker.datatype.number({ min: 10, max: 65 });
  }

  /**
   * Returns a random liquor bottle size.
   *
   * @example
   * faker.liquor.liquorSize() // '75 cl'
   *
   * @since 8.0.0
   */
  liquorSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.liquor.size);
  }
}
