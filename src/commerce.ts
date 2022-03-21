import type { Faker } from '.';

/**
 * Module to generate commerce and product related entries.
 */
export class Commerce {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Commerce.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a human readable color name.
   *
   * @example
   * faker.commerce.color() // 'red'
   */
  color(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.color
    );
  }

  /**
   * Returns a department inside a shop.
   *
   * @example
   * faker.commerce.department() // 'Garden'
   */
  department(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.department
    );
  }

  /**
   * Generates a random descriptive product name.
   *
   * @example
   * faker.commerce.productName() // 'Incredible Soft Gloves'
   */
  productName(): string {
    return (
      this.faker.commerce.productAdjective() +
      ' ' +
      this.faker.commerce.productMaterial() +
      ' ' +
      this.faker.commerce.product()
    );
  }

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
   */
  price(
    min: number = 1,
    max: number = 1000,
    dec: number = 2,
    symbol: string = ''
  ): string {
    if (min < 0 || max < 0) {
      return `${symbol}${0.0}`;
    }

    const randValue = this.faker.datatype.number({ max: max, min: min });

    return (
      symbol +
      (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(
        dec
      )
    );
  }

  // TODO @Shinigami92 2022-01-12: unimplemented member functions

  /*
    categories (num) {
        var categories = [];

        do {
            var category = this.faker.random.arrayElement(this.faker.definitions.commerce.department);
            if(categories.indexOf(category) === -1) {
                categories.push(category);
            }
        } while(categories.length < num);

        return categories;
    };

    */
  /*
    mergeCategories (categories) {
        var separator = this.faker.definitions.separator || " &";
        // TODO: find undefined here
        categories = categories || this.faker.definitions.commerce.categories;
        var commaSeparated = categories.slice(0, -1).join(', ');

        return [commaSeparated, categories[categories.length - 1]].join(separator + " ");
    };
    */

  /**
   * Returns an adjective describing a product.
   *
   * @example
   * faker.commerce.productAdjective() // 'Handcrafted'
   */
  productAdjective(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.adjective
    );
  }

  /**
   * Returns a material of a product.
   *
   * @example
   * faker.commerce.productMaterial() // 'Rubber'
   */
  productMaterial(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.material
    );
  }

  /**
   * Returns a short product name.
   *
   * @example
   * faker.commerce.product() // 'Computer'
   */
  product(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.product
    );
  }

  /**
   * Returns a product description.
   *
   * @example
   * faker.commerce.productDescription() // 'Andy shoes are designed to keeping...'
   */
  productDescription(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_description
    );
  }
}
