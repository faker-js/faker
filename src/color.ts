import type { Faker } from '.';

export class Color {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Color.prototype)) {
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
   * faker.color.human() // 'red'
   */
  human(): string {
    return this.faker.random.arrayElement(this.faker.definitions.color.human);
  }

  /**
   * Returns a RGB color hex
   *
   * @example
   * faker.color.rgb() // '#ffffff'
   */
  rgb(): string {
    return this.faker.datatype.hexaDecimal(6);
  }

  /**
   * Returns a RGB color in decimal format
   *
   * @example
   * faker.color.rgb_numeric() // '[255, 255, 255]'
   */
  rgb_numeric(): number[] {
    return new Array(3).map(() =>
      this.faker.datatype.number({ min: 0, max: 255 })
    );
  }
}
