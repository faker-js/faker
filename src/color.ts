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
   * Returns a RGB color in hex format
   *
   * @example
   * faker.color.rgb() // '#ffffff'
   */
  rgb(): string {
    return this.faker.datatype.hexadecimal(6);
  }

  /**
   * Returns a RGB color in decimal format
   *
   * @example
   * faker.color.rgbNumeric() // '[255, 255, 255]'
   */
  rgbNumeric(): number[] {
    return [0, 0, 0].map(() =>
      this.faker.datatype.number({ min: 0, max: 255 })
    );
  }

  /**
   * Return a RGBA color in hex format
   *
   * @example
   * faker.color.rgba() // '#ffffff00'
   */
  rgba(): string {
    let alpha = Math.round(this.faker.datatype.float({ min: 0, max: 1 }) * 255);
    alpha = (alpha + 0x10000).toString(16).substr(-2);
    return `${this.faker.color.rgb()}${alpha}`;
  }

  /**
   * Returns a RGBA color in decimal format
   *
   * @example
   * faker.color.rgbaNumeric() // '[255, 255, 255, 0.5]'
   */
  rgbaNumeric(): number[] {
    const result: number[] = this.faker.color.rgbNumeric();
    const alpha: number = this.faker.datatype.float({
      min: 0,
      max: 1,
      precision: 0.1,
    });
    result.push(alpha);
    return result;
  }

  /**
   * Returns a CMYK color
   *
   * @example
   * faker.color.cmyk() // [0.1, 0.2, 0.3, 0.4]
   */
  cmyk(): number[] {
    return [0, 0, 0, 0].map(() =>
      this.faker.datatype.float({ min: 0, max: 1, precision: 0.1 })
    );
  }
}
