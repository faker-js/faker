import type { Faker } from '../..';

/**
 * Module to generate cosmetic related entries.
 */
export class CosmeticModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(CosmeticModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random cosmetic name.
   *
   * @example
   * faker.cosmetic.cosmeticName() // 'Miooxin'
   *
   * @since 8.0.0
   */
  cosmeticName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cosmetic.name
    );
  }

  /**
   * Returns a random cosmetic brand.
   *
   * @example
   * faker.cosmetic.cosmeticBrand() // 'Collistar'
   *
   * @since 8.0.0
   */
  cosmeticBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cosmetic.brand
    );
  }

  /**
   * Returns a random cosmetic category.
   *
   * @example
   * faker.cosmetic.cosmeticCategory() // 'Face'
   *
   * @since 8.0.0
   */
  cosmeticCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cosmetic.category
    );
  }

  /**
   * Returns a random cosmetic description.
   *
   * @example
   * faker.cosmetic.cosmeticDescription() // 'Cleansing solution that thoroughly cleans the skin of the face by removing impurities and makeup residues. Delicate formula, suitable for sensitive skin and eyes. Neutral Ph product.'
   *
   * @since 8.0.0
   */
  cosmeticDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cosmetic.description
    );
  }

  /**
   * Returns a random cosmetic how to use.
   *
   * @example
   * faker.cosmetic.cosmeticHowToUse() // 'Pour the product onto a cotton pad and cleanse the face until the make-up is completely removed, then rinse.'
   *
   * @since 8.0.0
   */
  cosmeticHowToUse(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.cosmetic.howToUse
    );
  }
}
