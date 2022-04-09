import type { Faker } from '.';

type ColorSpace =
  | 'rgb'
  | 'rgba'
  | 'hsl'
  | 'hsla'
  | 'hwb'
  | 'cmyk'
  | 'lab'
  | 'lch'
  | 'display-p3';

/**
 * Formats the hex format of a generated color string according
 * to options specified by user.
 *
 * @param hexColor Hex color string to be formated.
 * @param options options object.
 * @param options.prefix Prefix of the generated hex color. Defaults to `0x`.
 * @param options.case Letter case of the generated hex color. Defaults to `mixed`.
 */
function applyHexFormat(
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
 * Converts an array of numbers into binary string format.
 *
 * @param values Array of values to be converted.
 */
function toBinary(values: number[]): string {
  const binary: string[] = values.map((value: number) => {
    const isFloat: boolean = Number(value) === value && value % 1 !== 0;
    if (isFloat) {
      const buffer: ArrayBuffer = new ArrayBuffer(4);
      new DataView(buffer).setFloat32(0, value);
      const bytes = new Uint8Array(buffer);
      return toBinary(Array.from(bytes)).split(' ').join('');
    }
    return (value >>> 0).toString(2).padStart(8, '0');
  });
  return binary.join(' ');
}

/**
 * Converts an array of numbers into CSS accepted format.
 *
 * @param values Array of values to be converted.
 * @param colorSpace Color space to format CSS string for. If invalid color space
 * is provided, RGB CSS will be returned.
 */
function toCSS(values: number[], colorSpace: ColorSpace): string {
  const percentages = values.map((value: number) => Math.round(value * 100));
  switch (colorSpace) {
    case 'rgb':
      return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
    case 'rgba':
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;
    case 'cmyk':
      return `cmyk(${percentages[0]}%, ${percentages[1]}%, ${percentages[2]}%, ${percentages[3]}%)`;
    case 'hsl':
      return `hsl(${values[0]}deg ${percentages[1]}% ${percentages[2]}%)`;
    case 'hsla':
      return `hsl(${values[0]}deg ${percentages[1]}% ${percentages[2]}% / ${percentages[3]})`;
    case 'hwb':
      return `hwb(${values[0]} ${percentages[1]}% ${percentages[2]}%)`;
    case 'lab':
      return `lab(${percentages[0]}% ${values[1]} ${values[2]})`;
    case 'lch':
      return `lch(${percentages[0]}% ${values[1]} ${values[2]})`;
    case 'display-p3':
      return `color(display-p3 ${values[0]} ${values[1]} ${values[2]})`;
    default:
      return toCSS(values, 'rgb');
  }
}

/**
 * Converts an array of color values to the specified color format.
 *
 * @param values Array of color values to be converted.
 * @param format Format of generated RGB color.
 * @param colorSpace Color space to format CSS string for. Defaults to `rgb`.
 */
function toColorFormat(
  values: number[],
  format: 'decimal' | 'css' | 'binary',
  colorSpace?: ColorSpace
): string | number[] {
  colorSpace = colorSpace || 'rgb';
  if (format === 'decimal') return values;

  let result: string | number[];
  switch (format) {
    case 'css':
      result = toCSS(values, colorSpace);
      break;
    case 'binary':
      result = toBinary(values);
      break;
  }
  return result;
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
   * Returns a random human readable color name.
   *
   * @example
   * faker.color.human() // 'red'
   */
  human(): string {
    return this.faker.random.arrayElement(this.faker.definitions.color.human);
  }

  /**
   * Returns a random color gamut name.
   *
   * @example
   * faker.color.colorGamut() // 'sRGB'
   */
  colorGamut(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.color.colorGamut
    );
  }

  /**
   * Returns a RGB color.
   *
   * @param options options object.
   * @param options.prefix Prefix of the generated hex color. Defaults to `0x`. Only applied when 'hex' format is used.
   * @param options.case Letter case of the generated hex color. Defaults to `mixed`. Only applied when 'hex' format is used.
   * @param options.format Format of generated RGB color. Defaults to `hex`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   * faker.color.rgb({ prefix: '#' }) // '#ffffFF'
   * faker.color.rgb({ case: 'upper' }) // '0xFFFFFF'
   * faker.color.rgb({ case: 'lower' }) // '0xffffff'
   * faker.color.rgb({ prefix: '#', case: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'decimal' }) // '[255, 255, 255]'
   * faker.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * faker.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // '[255, 255, 255, 0.4]'
   */
  rgb(options?: {
    prefix?: string;
    case?: 'upper' | 'lower' | 'mixed';
    format?: 'hex' | 'decimal' | 'css' | 'binary';
    includeAlpha?: boolean;
  }): string | number[] {
    let color: string | number[];
    let colorSpace: ColorSpace = 'rgb';
    if (!options?.format) options = { ...options, format: 'hex' };
    if (options?.format === 'hex') {
      color = this.faker.datatype.hexadecimal(options?.includeAlpha ? 8 : 6);
      color = applyHexFormat(color, options);
      return color;
    }

    color = [0, 0, 0].map(() =>
      this.faker.datatype.number({ min: 0, max: 255 })
    );
    if (options?.includeAlpha) {
      color.push(this.faker.commerce.percentage(0.01));
      colorSpace = 'rgba';
    }
    return toColorFormat(color, options.format, colorSpace);
  }

  /**
   * Returns a CMYK color.
   *
   * @param options options object.
   * @param options.format Format of generated CMYK color. Defaults to `decimal`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   */
  cmyk(options?: { format?: 'decimal' | 'css' | 'binary' }): string | number[] {
    const color: string | number[] = [0, 0, 0, 0].map(() =>
      this.faker.commerce.percentage(0.01)
    );

    return toColorFormat(color, options?.format || 'decimal', 'cmyk');
  }

  /**
   * Returns a HSL color.
   *
   * @param options options object.
   * @param options.format Format of generated HSL color. Defaults to `decimal`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   * faker.color.hsl({ format: 'decimal' }) // [300, 0.21, 0.52]
   * faker.color.hsl({ format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
   * faker.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * faker.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * faker.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
   * faker.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   */
  hsl(options?: {
    format?: 'decimal' | 'css' | 'binary';
    includeAlpha?: boolean;
  }): string | number[] {
    const hsl: number[] = [this.faker.datatype.number({ min: 0, max: 360 })];
    for (let i = 0; i < (options?.includeAlpha ? 3 : 2); i++) {
      hsl.push(this.faker.commerce.percentage(0.01));
    }
    return toColorFormat(
      hsl,
      options?.format || 'decimal',
      options?.includeAlpha ? 'hsla' : 'hsl'
    );
  }

  /**
   * Returns a HWB color.
   *
   * @param options options object.
   * @param options.format Format of generated RGB color. Defaults to `decimal`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   */
  hwb(options?: { format?: 'decimal' | 'css' | 'binary' }): string | number[] {
    const hsl: number[] = [this.faker.datatype.number({ min: 0, max: 360 })];
    for (let i = 0; i < 2; i++) {
      hsl.push(this.faker.commerce.percentage(0.01));
    }
    return toColorFormat(hsl, options?.format || 'decimal', 'hwb');
  }

  /**
   * Returns a LAB (CIELAB) color.
   *
   * @param options options object.
   * @param options.format Format of generated RGB color. Defaults to `decimal`.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
   * faker.color.lab({ format: 'css' }) // lab(29.2345% 39.3825 20.0664)
   * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
   */
  lab(options?: { format?: 'decimal' | 'css' | 'binary' }): string | number[] {
    const lab = [this.faker.commerce.percentage(0.000001)];
    for (let i = 0; i < 2; i++) {
      lab.push(
        this.faker.datatype.float({ min: -100, max: 100, precision: 0.0001 })
      );
    }
    return toColorFormat(lab, options?.format || 'decimal', 'lab');
  }

  /**
   * Returns a LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticable difference in the browser.
   *
   * @param options options object.
   * @param options.format Format of generated RGB color. Defaults to `decimal`.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   * faker.color.lch{ format: 'decimal' }) // [0.522345, 72.2, 56.2]
   * faker.color.lch{ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * faker.color.lch{ format: 'binary' }) // (8-32 bits x 3)
   */
  lch(options?: { format?: 'decimal' | 'css' | 'binary' }): string | number[] {
    const lch = [this.faker.commerce.percentage(0.000001)];
    for (let i = 0; i < 2; i++) {
      lch.push(
        this.faker.datatype.number({ min: 0, max: 230, precision: 0.1 })
      );
    }
    return toColorFormat(lch, options?.format || 'decimal', 'lch');
  }

  /**
   * Return a display-p3 color.
   *
   * @param options options object.
   * @param options.format Format of generated RGB color. Defaults to `decimal`.
   *
   * @example
   * faker.color.displayP3() // [0.93, 1, 0.82]
   * faker.color.displayP3({ format: 'decimal' }) // [0.12, 0.21, 0.31]
   * faker.color.displayP3({ format: 'css' }) // color(display-p3 0.12 1 0.23)
   * faker.color.displayP3({ format: 'binary' }) // (8-32 bits x 3)
   */
  displayP3(options?: {
    format?: 'decimal' | 'css' | 'binary';
  }): string | number[] {
    const p3 = [0, 0, 0].map(() => this.faker.commerce.percentage(0.01));
    return toColorFormat(p3, options?.format || 'decimal', 'display-p3');
  }
}
