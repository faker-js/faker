import type { Faker } from '../..';

/**
 * Module to generate parfum related entries.
 */
export class ParfumModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ParfumModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random parfum brand.
   *
   * @example
   * faker.parfum.parfumBrand() // 'Paco Rabanne'
   *
   * @since 8.0.0
   */
  parfumBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.parfum.brand);
  }

  /**
   * Returns a random parfum model.
   *
   * @example
   * faker.parfum.parfumModel() // '1 Milion'
   *
   * @since 8.0.0
   */
  parfumModel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.parfum.model);
  }

  /**
   * Returns a random parfum category.
   *
   * @example
   * faker.parfum.parfumCategory() // 'Eau de toilette '
   *
   * @since 8.0.0
   */
  parfumCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.parfum.category
    );
  }

  /**
   * Returns a random parfum capacity.
   *
   * @example
   * faker.parfum.parfumCapacity() // '51 ml'
   *
   * @since 8.0.0
   */
  parfumCapacity(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.parfum.capacity
    );
  }

  /**
   * Returns a random parfum size.
   *
   * @example
   * faker.parfum.parfumSize() // 'Standard'
   *
   * @since 8.0.0
   */
  parfumSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.parfum.size);
  }

  /**
   * Returns a random parfum description.
   *
   * @example
   * faker.parfum.parfumDescription() // 'The powerful freshness of Sauvage reveals new sensual and mysterious facets, strongly confirming the signature of a virtuous composition.'
   *
   * @since 8.0.0
   */
  parfumDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.parfum.description
    );
  }

  /**
   * Returns a random parfum composition.
   *
   * @example
   * faker.parfum.parfumComposition() // 'ALCOHOL DENAT. (SD ALCOHOL 39-C), PARFUM (FRAGRANCE), AQUA (WATER), LIMONENE, LINALOOL, COUMARIN, ALPHA-ISOMETYL IONONE, CITRAL, CITRONELLOL, GERANIOL, CINNAMAL, EUGENOL. vol. 70%'
   *
   * @since 8.0.0
   */
  parfumComposition(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.parfum.composition
    );
  }

  /**
   * Returns a random parfum gender.
   *
   * @example
   * faker.parfum.parfumGender() // 'Man'
   *
   * @since 8.0.0
   */
  parfumGender(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.parfum.gender
    );
  }
}
