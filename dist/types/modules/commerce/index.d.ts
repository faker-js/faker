import type { Faker } from '../../faker';
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
export declare class CommerceModule {
    private readonly faker;
    constructor(faker: Faker);
    /**
     * Returns a department inside a shop.
     *
     * @example
     * faker.commerce.department() // 'Garden'
     *
     * @since 3.0.0
     */
    department(): string;
    /**
     * Generates a random descriptive product name.
     *
     * @example
     * faker.commerce.productName() // 'Incredible Soft Gloves'
     *
     * @since 3.0.0
     */
    productName(): string;
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
    price(options?: number | {
        min?: number;
        max?: number;
        dec?: number;
        symbol?: string;
    }, legacyMax?: number, legacyDec?: number, legacySymbol?: string): string;
    /**
     * Returns an adjective describing a product.
     *
     * @example
     * faker.commerce.productAdjective() // 'Handcrafted'
     *
     * @since 3.0.0
     */
    productAdjective(): string;
    /**
     * Returns a material of a product.
     *
     * @example
     * faker.commerce.productMaterial() // 'Rubber'
     *
     * @since 3.0.0
     */
    productMaterial(): string;
    /**
     * Returns a short product name.
     *
     * @example
     * faker.commerce.product() // 'Computer'
     *
     * @since 3.0.0
     */
    product(): string;
    /**
     * Returns a product description.
     *
     * @example
     * faker.commerce.productDescription() // 'Andy shoes are designed to keeping...'
     *
     * @since 5.0.0
     */
    productDescription(): string;
}
