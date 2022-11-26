import type { Faker } from '../..';

/**
 * Module to generate tv related entries.
 */
export class TvModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(TvModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random tv name.
   *
   * @example
   * faker.tv.tvName() // 'Xiaomi Mi TV P1'
   *
   * @since 8.0.0
   */
  tvName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tv.name);
  }

  /**
   * Returns a random tv type.
   *
   * @example
   * faker.tv.tvDescription() // 'Xiaomi Mi TV P1 43 Screen size: 109.2 cm (43"), Display resolution: 3840 x 2160 pixels, HD type: 4K Ultra HD, Screen shape: Flat. Smart TV. Digital signal format: DVB-C, DVB-S2, DVB-T2. Wi-Fi, LAN ethernet connection. Product color: Black'
   *
   * @since 8.0.0
   */
  tvDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.tv.description
    );
  }

  /**
   * Returns a random tv brand.
   *
   * @example
   * faker.tv.tvBrand() // 'Xiaomi'
   *
   * @since 8.0.0
   */
  tvBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tv.brand);
  }

  /**
   * Returns a random tv category.
   *
   * @example
   * faker.tv.tvCategory() // 'Internet TV'
   *
   * @since 8.0.0
   */
  tvCategory(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tv.category);
  }

  /**
   * Returns a random tv size.
   *
   * @example
   * faker.tv.tvSize() // '43"'
   *
   * @since 8.0.0
   */
  tvSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tv.size);
  }

  /**
   * Returns a random tv color.
   *
   * @example
   * faker.tv.tvColor() // 'Black'
   *
   * @since 5.0.0
   */
  tvColor(): string {
    return this.faker.color.human();
  }
}
