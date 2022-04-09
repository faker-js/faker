import type { Faker } from '.';

/**
 * Formats the hex format of a generated color string according
 * to options specified by user.
 *
 * @param hexColor Hex color string to be formated.
 * @param options options object.
 * @param options.prefix Prefix of the generated hex color. Defaults to `0x`.
 * @param options.case Letter case of the generated hex color. Defaults to `mixed`.
 */
function applyHexFormatting(
  hexColor: string,
  options?: {
    prefix?: string;
    case?: 'upper' | 'lower' | 'mixed';
  }
): string {
  if (options?.prefix) hexColor = hexColor.replace('0x', options.prefix);
  switch (options?.case) {
    case 'upper':
      hexColor = hexColor.toUpperCase();
      break;
    case 'lower':
      hexColor = hexColor.toLowerCase();
      break;
  }
  return hexColor;
}

/**
 * Module to generate colors.
 */
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
   * Returns a RGB color in hex format.
   *
   * @param options options object.
   * @param options.prefix Prefix of the generated hex color. Defaults to `0x`.
   * @param options.case Letter case of the generated hex color. Defaults to `mixed`.
   *
   * @example
   * faker.color.rgbHex() // '0xffffFF'
   * faker.color.rgbHex({ prefix: '#' }) // '#ffffFF'
   * faker.color.rgbHex({ case: 'upper' }) // '0xFFFFFF'
   * faker.color.rgbHex({ case: 'lower' }) // '0xffffff'
   * faker.color.rgbHex({ prefix: '#', case: 'lower' }) // '#ffffff'
   */
  rgbHex(options?: {
    prefix?: string;
    case?: 'upper' | 'lower' | 'mixed';
  }): string {
    let color = this.faker.datatype.hexadecimal(6);
    if (options) color = applyHexFormatting(color, options);
    return color;
  }

  /**
   * Returns a RGB color in decimal format.
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
   * Return a RGBA color in hex format.
   *
   * @param options options object.
   * @param options.prefix Prefix of the generated hex color. Defaults to `0x`.
   * @param options.case Letter case of the generated hex color. Defaults to `mixed`.
   *
   * @example
   * faker.color.rgbaHex() // '0xffffFF00'
   * faker.color.rgbaHex({ prefix: '#' }) // '#ffffFF00'
   * faker.color.rgbaHex({ case: 'upper' }) // '0xFFFFFF00'
   * faker.color.rgbaHex({ case: 'lower' }) // '0xffffff00'
   * faker.color.rgbaHex({ prefix: '#', case: 'lower' }) // '#ffffff00'
   */
  rgbaHex(options?: {
    prefix?: string;
    case?: 'upper' | 'lower' | 'mixed';
  }): string {
    let color = this.faker.datatype.hexadecimal(8);
    if (options) color = applyHexFormatting(color, options);
    return color;
  }

  /**
   * Returns a RGBA color in decimal format.
   *
   * @example
   * faker.color.rgbaNumeric() // '[255, 255, 255, 0.54]'
   */
  rgbaNumeric(): number[] {
    const rgba: number[] = this.faker.color.rgbNumeric();
    rgba.push(this.faker.commerce.percentage(0.01));
    return rgba;
  }

  /**
   * Returns a CMYK color.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   */
  cmyk(): number[] {
    return [0, 0, 0, 0].map(() => this.faker.commerce.percentage(0.01));
  }

  /**
   * Returns a HSL color.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   */
  hsl(): number[] {
    const hsl: number[] = [this.faker.datatype.number({ min: 0, max: 360 })];
    for (let i = 0; i < 2; i++) {
      hsl.push(this.faker.commerce.percentage(0.01));
    }
    return hsl;
  }

  /**
   * Returns a HSLA color.
   *
   * @example
   * faker.color.hsla() // [201, 0.21, 0.31, 0.11]
   */
  hsla(): number[] {
    const hsla: number[] = this.faker.color.hsl();
    hsla.push(this.faker.commerce.percentage(0.01));
    return hsla;
  }

  /**
   * Returns a HWB color.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   */
  hwb(): number[] {
    return this.hsl();
  }

  /**
   * Returns a LAB (CIELAB) color.
   *
   * @example
   * faker.color.lab() // [0.8, -80, 100]
   */
  lab(): number[] {
    const lab = [this.faker.commerce.percentage(0.01)];
    for (let i = 0; i < 2; i++) {
      lab.push(this.faker.datatype.number({ min: -100, max: 100 }));
    }
    return lab;
  }

  /**
   * Returns a LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticable difference in the browser.
   *
   * @example
   * faker.color.lch() // [0.8, 230, 50]
   */
  lch(): number[] {
    const lch = [this.faker.commerce.percentage(0.01)];
    for (let i = 0; i < 2; i++) {
      lch.push(this.faker.datatype.number({ min: 0, max: 230 }));
    }
    return lch;
  }

  /**
   * Return a display-p3 color.
   *
   * @example
   * faker.color.displayP3() // [0.93, 1, 0.82]
   */
  displayP3(): number[] {
    return [0, 0, 0].map(() => this.faker.commerce.percentage(0.01));
  }
}
