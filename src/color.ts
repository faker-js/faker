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
    return this.faker.datatype.hexadecimal(8);
  }

  /**
   * Returns a RGBA color in decimal format
   *
   * @example
   * faker.color.rgbaNumeric() // '[255, 255, 255, 0.54]'
   */
  rgbaNumeric(): number[] {
    const rgba: number[] = this.faker.color.rgbNumeric();
    rgba.push(this.getPercentage());
    return rgba;
  }

  /**
   * Returns a CMYK color
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   */
  cmyk(): number[] {
    return [0, 0, 0, 0].map(() => this.getPercentage());
  }

  /**
   * Returns a HSL color
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   */
  hsl(): number[] {
    const hsl: number[] = [this.faker.datatype.number({ min: 0, max: 360 })];
    for (let i = 0; i < 2; i++) {
      hsl.push(this.getPercentage());
    }
    return hsl;
  }

  /**
   * Returns a HSLA color
   *
   * @example
   * faker.color.hsla() // [201, 0.21, 0.31, 0.11]
   */
  hsla(): number[] {
    const hsla: number[] = this.faker.color.hsl();
    hsla.push(this.getPercentage());
    return hsla;
  }

  /**
   * Return a percentage value in decimal format betwene 0 and 1
   * with percision of two decimal place
   *
   * @example
   * this.getPercentage() // 0.36
   */
  private getPercentage(): number {
    return this.faker.datatype.float({ min: 0, max: 1, precision: 0.01 });
  }
}
