import type { Faker } from '.';

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
   * color
   *
   * @method faker.commerce.color
   */
  color(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.color
    );
  }

  /**
   * department
   *
   * @method faker.commerce.department
   */
  department(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.department
    );
  }

  /**
   * productName
   *
   * @method faker.commerce.productName
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
   * price
   *
   * @method faker.commerce.price
   * @param min
   * @param max
   * @param dec
   * @param symbol
   */
  price(
    min: number = 1,
    max: number = 1000,
    dec: number = 2,
    symbol: string = ''
  ): string {
    if (min < 0 || max < 0) {
      return symbol + 0.0;
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
   * productAdjective
   *
   * @method faker.commerce.productAdjective
   */
  productAdjective(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.adjective
    );
  }

  /**
   * productMaterial
   *
   * @method faker.commerce.productMaterial
   */
  productMaterial(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.material
    );
  }

  /**
   * product
   *
   * @method faker.commerce.product
   */
  product(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_name.product
    );
  }

  /**
   * productDescription
   *
   * @method faker.commerce.productDescription
   */
  productDescription(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.commerce.product_description
    );
  }
}
