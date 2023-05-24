import type { Faker } from '../../faker';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate commerce and product related entries.
 *
 * ### Overview
 *
 * For a long product name like `'Incredible Soft Gloves'`, use [`productName()`](https://fakerjs.dev/api/commerce.html#productname). The product names are generated from a list of adjectives, materials, and products, which can each be accessed separately using [`productAdjective()`](https://fakerjs.dev/api/commerce.html#productadjective), [`productMaterial()`](https://fakerjs.dev/api/commerce.html#productmaterial), and [`product()`](https://fakerjs.dev/api/commerce.html#product). You can also create a description using [`productDescription()`](https://fakerjs.dev/api/commerce.html#productdescription).
 *
 * For a department in a shop or product category, use [`department()`](https://fakerjs.dev/api/commerce.html#department).
 *
 * You can also create a price using [`price()`](https://fakerjs.dev/api/commerce.html#price).
 */
export class CommerceModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      CommerceModule.prototype
    ) as Array<keyof CommerceModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a department inside a shop.
   *
   * @example
   * faker.commerce.department() // 'Garden'
   *
   * @since 3.0.0
   */
  department(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.commerce.department
    );
  }

  /**
   * Generates a random descriptive product name.
   *
   * @example
   * faker.commerce.productName() // 'Incredible Soft Gloves'
   *
   * @since 3.0.0
   */
  productName(): string {
    return `${this.productAdjective()} ${this.productMaterial()} ${this.product()}`;
  }

  /**
   * Generates a price between min and max (inclusive).
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.min The minimum price. Defaults to `1`.
   * @param options.max The maximum price. Defaults to `1000`.
   * @param options.dec The number of decimal places. Defaults to `2`.
   * @param options.symbol The currency value to use. Defaults to `''`.
   *
   * @example
   * faker.commerce.price() // 828.00
   * faker.commerce.price({ min: 100 }) // 904.00
   * faker.commerce.price({ min: 100, max: 200 }) // 154.00
   * faker.commerce.price({ min: 100, max: 200, dec: 0 }) // 133
   * faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' }) // $114
   *
   * @since 3.0.0
   */
  price(options?: {
    /**
     * The minimum price.
     *
     * @default 1
     */
    min?: number;
    /**
     * The maximum price.
     *
     * @default 1000
     */
    max?: number;
    /**
     * The number of decimal places.
     *
     * @default 2
     */
    dec?: number;
    /**
     * The currency value to use.
     *
     * @default ''
     */
    symbol?: string;
  }): string;
  /**
   * Generates a price between min and max (inclusive).
   *
   * @param min The minimum price. Defaults to `1`.
   * @param max The maximum price. Defaults to `1000`.
   * @param dec The number of decimal places. Defaults to `2`.
   * @param symbol The currency value to use. Defaults to `''`.
   *
   * @example
   * faker.commerce.price() // 828.00
   * faker.commerce.price(100) // 904.00
   * faker.commerce.price(100, 200) // 154.00
   * faker.commerce.price(100, 200, 0) // 133
   * faker.commerce.price(100, 200, 0, '$') // $114
   *
   * @since 3.0.0
   *
   * @deprecated Use `faker.commerce.price({ min, max, dec, symbol })` instead.
   */
  price(min?: number, max?: number, dec?: number, symbol?: string): string;
  /**
   * Generates a price between min and max (inclusive).
   *
   * @param options The minimum price or on options object. Defaults to `{}`.
   * @param options.min The minimum price. Defaults to `1`.
   * @param options.max The maximum price. Defaults to `1000`.
   * @param options.dec The number of decimal places. Defaults to `2`.
   * @param options.symbol The currency value to use. Defaults to `''`.
   * @param legacyMax The maximum price. This argument is deprecated. Defaults to `1000`.
   * @param legacyDec The number of decimal places. This argument is deprecated. Defaults to `2`.
   * @param legacySymbol The currency value to use. This argument is deprecated. Defaults to `''`.
   *
   * @example
   * faker.commerce.price() // 828.00
   * faker.commerce.price({ min: 100 }) // 904.00
   * faker.commerce.price({ min: 100, max: 200 }) // 154.00
   * faker.commerce.price({ min: 100, max: 200, dec: 0 }) // 133
   * faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' }) // $114
   *
   * @since 3.0.0
   */
  price(
    options?:
      | number
      | {
          /**
           * The minimum price.
           *
           * @default 1
           */
          min?: number;
          /**
           * The maximum price.
           *
           * @default 1000
           */
          max?: number;
          /**
           * The number of decimal places.
           *
           * @default 2
           */
          dec?: number;
          /**
           * The currency value to use.
           *
           * @default ''
           */
          symbol?: string;
        },
    legacyMax?: number,
    legacyDec?: number,
    legacySymbol?: string
  ): string;
  /**
   * Generates a price between min and max (inclusive).
   *
   * @param options The minimum price or on options object. Defaults to `{}`.
   * @param options.min The minimum price. Defaults to `1`.
   * @param options.max The maximum price. Defaults to `1000`.
   * @param options.dec The number of decimal places. Defaults to `2`.
   * @param options.symbol The currency value to use. Defaults to `''`.
   * @param legacyMax The maximum price. This argument is deprecated. Defaults to `1000`.
   * @param legacyDec The number of decimal places. This argument is deprecated. Defaults to `2`.
   * @param legacySymbol The currency value to use. This argument is deprecated. Defaults to `''`.
   *
   * @example
   * faker.commerce.price() // 828.00
   * faker.commerce.price({ min: 100 }) // 904.00
   * faker.commerce.price({ min: 100, max: 200 }) // 154.00
   * faker.commerce.price({ min: 100, max: 200, dec: 0 }) // 133
   * faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' }) // $114
   *
   * @since 3.0.0
   */
  price(
    options:
      | number
      | {
          min?: number;
          max?: number;
          dec?: number;
          symbol?: string;
        } = {},
    legacyMax: number = 1000,
    legacyDec: number = 2,
    legacySymbol: string = ''
  ): string {
    if (typeof options === 'number') {
      deprecated({
        deprecated: 'faker.commerce.price(min, max, dec, symbol)',
        proposed: 'faker.commerce.price({ min, max, dec, symbol })',
        since: '8.0',
        until: '9.0',
      });
      options = {
        min: options,
        dec: legacyDec,
        max: legacyMax,
        symbol: legacySymbol,
      };
    }

    const { dec = 2, max = 1000, min = 1, symbol = '' } = options;

    if (min < 0 || max < 0) {
      return `${symbol}${0.0}`;
    }

    // TODO @Shinigami92 2022-11-24: https://github.com/faker-js/faker/issues/350
    const randValue = this.faker.number.int({ min, max });

    return symbol + randValue.toFixed(dec);
  }

  /**
   * Returns an adjective describing a product.
   *
   * @example
   * faker.commerce.productAdjective() // 'Handcrafted'
   *
   * @since 3.0.0
   */
  productAdjective(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.commerce.product_name.adjective
    );
  }

  /**
   * Returns a material of a product.
   *
   * @example
   * faker.commerce.productMaterial() // 'Rubber'
   *
   * @since 3.0.0
   */
  productMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.commerce.product_name.material
    );
  }

  /**
   * Returns a short product name.
   *
   * @example
   * faker.commerce.product() // 'Computer'
   *
   * @since 3.0.0
   */
  product(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.commerce.product_name.product
    );
  }

  /**
   * Returns a product description.
   *
   * @example
   * faker.commerce.productDescription() // 'Andy shoes are designed to keeping...'
   *
   * @since 5.0.0
   */
  productDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.commerce.product_description
    );
  }
}
