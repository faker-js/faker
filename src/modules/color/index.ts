import type { Faker } from '../../faker';

/**
 * Color space names supported by CSS.
 */
export const CSS_SPACES = [
  'sRGB',
  'display-p3',
  'rec2020',
  'a98-rgb',
  'prophoto-rgb',
  'rec2020',
] as const;

/**
 * Functions supported by CSS to produce color.
 */
export const CSS_FUNCTIONS = [
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'cmyk',
  'lab',
  'lch',
  'color',
] as const;

export type CSSFunction = typeof CSS_FUNCTIONS[number];
export type CSSSpace = typeof CSS_SPACES[number];
export type StringColorFormat = 'css' | 'binary';
export type NumberColorFormat = 'decimal';
export type ColorFormat = StringColorFormat | NumberColorFormat;
export type Casing = 'lower' | 'upper' | 'mixed';

/**
 * Formats the hex format of a generated color string according
 * to options specified by user.
 *
 * @param hexColor Hex color string to be formatted.
 * @param options Options object.
 * @param options.prefix Prefix of the generated hex color. Defaults to `'0x'`.
 * @param options.casing Letter type case of the generated hex color. Defaults to `'mixed'`.
 */
function formatHexColor(
  hexColor: string,
  options?: {
    prefix?: string;
    casing?: Casing;
  }
): string {
  switch (options?.casing) {
    case 'upper':
      hexColor = hexColor.toUpperCase();
      break;
    case 'lower':
      hexColor = hexColor.toLowerCase();
      break;
  }
  if (options?.prefix) {
    hexColor = options.prefix + hexColor;
  }
  return hexColor;
}

/**
 * Converts an array of numbers into binary string format.
 *
 * @param values Array of values to be converted.
 */
function toBinary(values: number[]): string {
  const binary: string[] = values.map((value) => {
    const isFloat = value % 1 !== 0;
    if (isFloat) {
      const buffer = new ArrayBuffer(4);
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
 * @param cssFunction CSS function to be generated for the color. Defaults to `'rgb'`.
 * @param space Color space to format CSS color function with. Defaults to `'sRGB'`.
 */
function toCSS(
  values: number[],
  cssFunction: CSSFunction = 'rgb',
  space: CSSSpace = 'sRGB'
): string {
  const percentage = (value: number) => Math.round(value * 100);
  switch (cssFunction) {
    case 'rgba':
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;
    case 'color':
      return `color(${space} ${values[0]} ${values[1]} ${values[2]})`;
    case 'cmyk':
      return `cmyk(${percentage(values[0])}%, ${percentage(
        values[1]
      )}%, ${percentage(values[2])}%, ${percentage(values[3])}%)`;
    case 'hsl':
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2]
      )}%)`;
    case 'hsla':
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2]
      )}% / ${percentage(values[3])})`;
    case 'hwb':
      return `hwb(${values[0]} ${percentage(values[1])}% ${percentage(
        values[2]
      )}%)`;
    case 'lab':
      return `lab(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case 'lch':
      return `lch(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case 'rgb':
    default:
      return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
  }
}

/**
 * Converts an array of color values to the specified color format.
 *
 * @param values Array of color values to be converted.
 * @param format Format of generated RGB color.
 * @param cssFunction CSS function to be generated for the color. Defaults to `'rgb'`.
 * @param space Color space to format CSS color function with. Defaults to `'sRGB'`.
 */
function toColorFormat(
  values: number[],
  format: ColorFormat,
  cssFunction: CSSFunction = 'rgb',
  space: CSSSpace = 'sRGB'
): string | number[] {
  switch (format) {
    case 'css':
      return toCSS(values, cssFunction, space);
    case 'binary':
      return toBinary(values);
    default:
      return values;
  }
}

/**
 * Module to generate colors.
 */
export class ColorModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ColorModule.prototype)) {
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
   *
   * @since 7.0.0
   */
  human(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.color.human);
  }

  /**
   * Returns a random color space name from the worldwide accepted color spaces.
   * Source: https://en.wikipedia.org/wiki/List_of_color_spaces_and_their_uses
   *
   * @example
   * faker.color.space() // 'sRGB'
   *
   * @since 7.0.0
   */
  space(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.color.space);
  }

  /**
   * Returns a random css supported color function name.
   *
   * @example
   * faker.color.cssSupportedFunction() // 'rgb'
   *
   * @since 7.0.0
   */
  cssSupportedFunction(): string {
    return this.faker.helpers.arrayElement(CSS_FUNCTIONS);
  }

  /**
   * Returns a random css supported color space name.
   *
   * @example
   * faker.color.cssSupportedSpace() // 'display-p3'
   *
   * @since 7.0.0
   */
  cssSupportedSpace(): string {
    return this.faker.helpers.arrayElement(CSS_SPACES);
  }

  /**
   * Returns an RGB color.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   *
   * @since 7.0.0
   */
  rgb(): string;
  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.prefix Prefix of the generated hex color. Only applied when 'hex' format is used. Defaults to `'0x'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'mixed'`.
   * @param options.format Format of generated RGB color. Defaults to `hex`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   * faker.color.rgb({ prefix: '#' }) // '#ffffFF'
   * faker.color.rgb({ casing: 'upper' }) // '0xFFFFFF'
   * faker.color.rgb({ casing: 'lower' }) // '0xffffff'
   * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * faker.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   *
   * @since 7.0.0
   */
  rgb(options?: {
    prefix?: string;
    casing?: Casing;
    format?: 'hex' | StringColorFormat;
    includeAlpha?: boolean;
  }): string;
  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   * faker.color.rgb({ format: 'decimal' }) // [255, 255, 255]
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [255, 255, 255, 0.4]
   *
   * @since 7.0.0
   */
  rgb(options?: {
    format?: NumberColorFormat;
    includeAlpha?: boolean;
  }): number[];
  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'0x'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'mixed'`.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   * faker.color.rgb({ prefix: '#' }) // '#ffffFF'
   * faker.color.rgb({ casing: 'upper' }) // '0xFFFFFF'
   * faker.color.rgb({ casing: 'lower' }) // '0xffffff'
   * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'decimal' }) // [255, 255, 255]
   * faker.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * faker.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [255, 255, 255, 0.4]
   *
   * @since 7.0.0
   */
  rgb(options?: {
    prefix?: string;
    casing?: Casing;
    format?: 'hex' | ColorFormat;
    includeAlpha?: boolean;
  }): string | number[];
  rgb(options?: {
    prefix?: string;
    casing?: Casing;
    format?: 'hex' | ColorFormat;
    includeAlpha?: boolean;
  }): string | number[] {
    const {
      format = 'hex',
      includeAlpha = false,
      prefix = '#',
      casing = 'lower',
    } = options || {};
    options = { format, includeAlpha, prefix, casing };
    let color: string | number[];
    let cssFunction: CSSFunction = 'rgb';
    if (format === 'hex') {
      color = this.faker.string.hexadecimal({
        length: includeAlpha ? 8 : 6,
        prefix: '',
      });
      color = formatHexColor(color, options);
      return color;
    }
    color = Array.from({ length: 3 }).map(() => this.faker.number.int(255));
    if (includeAlpha) {
      color.push(this.faker.number.float({ max: 1, precision: 0.01 }));
      cssFunction = 'rgba';
    }
    return toColorFormat(color, format, cssFunction);
  }

  /**
   * Returns a CMYK color.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   *
   * @since 7.0.0
   */
  cmyk(): number[];
  /**
   * Returns a CMYK color.
   *
   * @param options Options object.
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   *
   * @since 7.0.0
   */
  cmyk(options?: { format?: StringColorFormat }): string;
  /**
   * Returns a CMYK color.
   *
   * @param options Options object.
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
   *
   * @since 7.0.0
   */
  cmyk(options?: { format?: NumberColorFormat }): number[];
  /**
   * Returns a CMYK color.
   *
   * @param options Options object.
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   *
   * @since 7.0.0
   */
  cmyk(options?: { format?: ColorFormat }): string | number[];
  cmyk(options?: { format?: ColorFormat }): string | number[] {
    const color: string | number[] = Array.from({ length: 4 }).map(() =>
      this.faker.number.float({ max: 1, precision: 0.01 })
    );
    return toColorFormat(color, options?.format || 'decimal', 'cmyk');
  }

  /**
   * Returns an HSL color.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   *
   * @since 7.0.0
   */
  hsl(): number[];
  /**
   * Returns an HSL color.
   *
   * @param options Options object.
   * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   * faker.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * faker.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * faker.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
   * faker.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   *
   * @since 7.0.0
   */
  hsl(options?: { format?: StringColorFormat; includeAlpha?: boolean }): string;
  /**
   * Returns an HSL color.
   *
   * @param options Options object.
   * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   * faker.color.hsl({ format: 'decimal' }) // [300, 0.21, 0.52]
   * faker.color.hsl({ format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
   *
   * @since 7.0.0
   */
  hsl(options?: {
    format?: NumberColorFormat;
    includeAlpha?: boolean;
  }): number[];
  /**
   * Returns an HSL color.
   *
   * @param options Options object.
   * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
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
   *
   * @since 7.0.0
   */
  hsl(options?: {
    format?: ColorFormat;
    includeAlpha?: boolean;
  }): string | number[];
  hsl(options?: {
    format?: ColorFormat;
    includeAlpha?: boolean;
  }): string | number[] {
    const hsl: number[] = [this.faker.number.int(360)];
    for (let i = 0; i < (options?.includeAlpha ? 3 : 2); i++) {
      hsl.push(this.faker.number.float({ max: 1, precision: 0.01 }));
    }
    return toColorFormat(
      hsl,
      options?.format || 'decimal',
      options?.includeAlpha ? 'hsla' : 'hsl'
    );
  }

  /**
   * Returns an HWB color.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   *
   * @since 7.0.0
   */
  hwb(): number[];
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(options?: { format?: StringColorFormat }): string;
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   *
   * @since 7.0.0
   */
  hwb(options?: { format?: NumberColorFormat }): number[];
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(options?: { format?: ColorFormat }): string | number[];
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(options?: { format?: ColorFormat }): string | number[] {
    const hsl: number[] = [this.faker.number.int(360)];
    for (let i = 0; i < 2; i++) {
      hsl.push(this.faker.number.float({ max: 1, precision: 0.01 }));
    }
    return toColorFormat(hsl, options?.format || 'decimal', 'hwb');
  }

  /**
   * Returns a LAB (CIELAB) color.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   *
   * @since 7.0.0
   */
  lab(): number[];
  /**
   * Returns a LAB (CIELAB) color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   * faker.color.lab({ format: 'css' }) // lab(29.2345% 39.3825 20.0664)
   * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lab(options?: { format?: StringColorFormat }): string;
  /**
   * Returns a LAB (CIELAB) color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
   *
   * @since 7.0.0
   */
  lab(options?: { format?: NumberColorFormat }): number[];
  /**
   * Returns a LAB (CIELAB) color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
   * faker.color.lab({ format: 'css' }) // lab(29.2345% 39.3825 20.0664)
   * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lab(options?: { format?: ColorFormat }): string | number[];
  lab(options?: { format?: ColorFormat }): string | number[] {
    const lab = [this.faker.number.float({ max: 1, precision: 0.000001 })];
    for (let i = 0; i < 2; i++) {
      lab.push(
        this.faker.number.float({ min: -100, max: 100, precision: 0.0001 })
      );
    }
    return toColorFormat(lab, options?.format || 'decimal', 'lab');
  }

  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   *
   * @since 7.0.0
   */
  lch(): number[];
  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lch(options?: { format?: StringColorFormat }): string;
  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
   *
   * @since 7.0.0
   */
  lch(options?: { format?: NumberColorFormat }): number[];
  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lch(options?: { format?: ColorFormat }): string | number[];
  lch(options?: { format?: ColorFormat }): string | number[] {
    const lch = [this.faker.number.float({ max: 1, precision: 0.000001 })];
    for (let i = 0; i < 2; i++) {
      lch.push(this.faker.number.float({ max: 230, precision: 0.1 }));
    }
    return toColorFormat(lch, options?.format || 'decimal', 'lch');
  }

  /**
   * Returns a random color based on CSS color space specified.
   *
   * @example
   * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
   *
   * @since 7.0.0
   */
  colorByCSSColorSpace(): number[];
  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
   * faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * faker.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  colorByCSSColorSpace(options?: {
    format?: StringColorFormat;
    space?: CSSSpace;
  }): string;
  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
   * faker.color.colorByCSSColorSpace({ format: 'decimal' }) // [0.12, 0.21, 0.31]
   *
   * @since 7.0.0
   */
  colorByCSSColorSpace(options?: {
    format?: NumberColorFormat;
    space?: CSSSpace;
  }): number[];
  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
   * faker.color.colorByCSSColorSpace({ format: 'decimal' }) // [0.12, 0.21, 0.31]
   * faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * faker.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  colorByCSSColorSpace(options?: {
    format?: ColorFormat;
    space?: CSSSpace;
  }): string | number[];
  colorByCSSColorSpace(options?: {
    format?: ColorFormat;
    space?: CSSSpace;
  }): string | number[] {
    if (options?.format === 'css' && !options?.space) {
      options = { ...options, space: 'sRGB' };
    }
    const color = Array.from({ length: 3 }).map(() =>
      this.faker.number.float({ max: 1, precision: 0.0001 })
    );
    return toColorFormat(
      color,
      options?.format || 'decimal',
      'color',
      options?.space
    );
  }
}
