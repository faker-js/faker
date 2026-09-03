import { ModuleBase } from '../../internal/module-base';
import { department as commerceDepartment } from './department';
import { isbn as commerceIsbn } from './isbn';
import { price as commercePrice } from './price';
import { product as commerceProduct } from './product';
import { productAdjective as commerceProductAdjective } from './product-adjective';
import { productDescription as commerceProductDescription } from './product-description';
import { productMaterial as commerceProductMaterial } from './product-material';
import { productName as commerceProductName } from './product-name';
import { upc as commerceUpc } from './upc';

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
 *
 * To work with product identifiers, generate an ISBN via [`isbn()`](https://fakerjs.dev/api/commerce.html#isbn) or a 12‑digit UPC via [`upc()`](https://fakerjs.dev/api/commerce.html#upc).
 */
export class CommerceModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree commerce' to update the methods from their respective files.
   */

  /**
   * Returns a department inside a shop.
   *
   * @example
   * faker.commerce.department() // 'Garden'
   *
   * @since 3.0.0
   */
  department(): string {
    return commerceDepartment(this.faker.fakerCore);
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
    return commerceProductName(this.faker.fakerCore);
  }

  /**
   * Generates a price between min and max (inclusive).
   *
   * To better represent real-world prices, when `options.dec` is greater than `0`, the final decimal digit in the returned string will be generated as follows:
   *
   * - 50% of the time: `9`
   * - 30% of the time: `5`
   * - 10% of the time: `0`
   * - 10% of the time: a random digit from `0` to `9`
   *
   * @param options An options object.
   * @param options.min The minimum price. Defaults to `1`.
   * @param options.max The maximum price. Defaults to `1000`.
   * @param options.dec The number of decimal places. Defaults to `2`.
   * @param options.symbol The currency value to use. Defaults to `''`.
   *
   * @example
   * faker.commerce.price() // '828.07'
   * faker.commerce.price({ min: 100 }) // '904.19'
   * faker.commerce.price({ min: 100, max: 200 }) // '154.55'
   * faker.commerce.price({ min: 100, max: 200, dec: 0 }) // '133'
   * faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: '$' }) // '$114'
   *
   * @since 3.0.0
   */
  price(
    options: {
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
    } = {}
  ): string {
    return commercePrice(this.faker.fakerCore, options);
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
    return commerceProductAdjective(this.faker.fakerCore);
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
    return commerceProductMaterial(this.faker.fakerCore);
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
    return commerceProduct(this.faker.fakerCore);
  }

  /**
   * Returns a product description.
   *
   * @example
   * faker.commerce.productDescription() // 'Featuring Phosphorus-enhanced technology, our Fish offers unparalleled Modern performance'
   *
   * @since 5.0.0
   */
  productDescription(): string {
    return commerceProductDescription(this.faker.fakerCore);
  }

  /**
   * Returns a random [ISBN](https://en.wikipedia.org/wiki/ISBN) identifier.
   *
   * @param options The variant to return or an options object.
   * @param options.variant The variant to return. Can be either `10` (10-digit format)
   * or `13` (13-digit format). Defaults to `13`.
   * @param options.separator The separator to use in the format. Defaults to `'-'`.
   *
   * @example
   * faker.commerce.isbn() // '978-0-692-82459-7'
   * faker.commerce.isbn(10) // '1-155-36404-X'
   * faker.commerce.isbn(13) // '978-1-60808-867-6'
   * faker.commerce.isbn({ separator: ' ' }) // '978 0 452 81498 1'
   * faker.commerce.isbn({ variant: 10, separator: ' ' }) // '0 940319 49 7'
   * faker.commerce.isbn({ variant: 13, separator: ' ' }) // '978 1 6618 9122 0'
   *
   * @since 8.1.0
   */
  isbn(
    options:
      | 10
      | 13
      | {
          /**
           * The variant of the identifier to return.
           * Can be either `10` (10-digit format)
           * or `13` (13-digit format).
           *
           * @default 13
           */
          variant?: 10 | 13;

          /**
           * The separator to use in the format.
           *
           * @default '-'
           */
          separator?: string;
        } = {}
  ): string {
    return commerceIsbn(this.faker.fakerCore, options);
  }

  /**
   * Returns a valid [UPC‑A](https://en.wikipedia.org/wiki/Universal_Product_Code) (12 digits).
   *
   * When a `prefix` is provided, it is padded with random digits so that the body
   * has 11 digits. The 12th digit (check digit) is computed using the Modulo 10 algorithm.
   *
   * @param options An options object.
   * @param options.prefix Optional numeric prefix for the UPC body (0–11 digits).
   *
   * @returns A 12‑digit UPC‑A string.
   *
   * @throws {FakerError} If `prefix` contains non-digit characters or more than 11 digits.
   *
   * @example
   * faker.commerce.upc() // '036000291452'
   * faker.commerce.upc({ prefix: '01234' }) // '012345678905'
   *
   * @since 10.2.0
   */
  upc(
    options: {
      /**
       * Optional numeric prefix for the UPC body (0–11 digits).
       */
      prefix?: string;
    } = {}
  ): string {
    return commerceUpc(this.faker.fakerCore, options);
  }
}
