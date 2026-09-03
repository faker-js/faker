import { ModuleBase } from '../../internal/module-base';
import type { Casing } from '../../utils/types';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';
import { cmyk as colorCmyk } from './cmyk';
import { colorByCSSColorSpace as colorColorByCSSColorSpace } from './color-by-csscolor-space';
import type { CssFunctionType } from './css-supported-function';
import { cssSupportedFunction as colorCssSupportedFunction } from './css-supported-function';
import type { CssSpaceType } from './css-supported-space';
import { cssSupportedSpace as colorCssSupportedSpace } from './css-supported-space';
import { hsl as colorHsl } from './hsl';
import { human as colorHuman } from './human';
import { hwb as colorHwb } from './hwb';
import { lab as colorLab } from './lab';
import { lch as colorLch } from './lch';
import { rgb as colorRgb } from './rgb';
import { space as colorSpace } from './space';

/**
 * Module to generate colors.
 *
 * ### Overview
 *
 * For a human-readable color like `'red'`, use [`human()`](https://fakerjs.dev/api/color.html#human).
 *
 * For a hex color like `#ff0000` used in HTML/CSS, use [`rgb()`](https://fakerjs.dev/api/color.html#rgb). There are also methods for other color formats such as [`hsl()`](https://fakerjs.dev/api/color.html#hsl), [`cmyk()`](https://fakerjs.dev/api/color.html#cmyk), [`hwb()`](https://fakerjs.dev/api/color.html#hwb), [`lab()`](https://fakerjs.dev/api/color.html#lab), and [`lch()`](https://fakerjs.dev/api/color.html#lch).
 */
export class ColorModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree color' to update the methods from their respective files.
   */

  /**
   * Returns a random human-readable color name.
   *
   * @example
   * faker.color.human() // 'red'
   *
   * @since 7.0.0
   */
  human(): string {
    return colorHuman(this.faker.fakerCore);
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
    return colorSpace(this.faker.fakerCore);
  }

  /**
   * Returns a random CSS-supported color function name.
   *
   * @example
   * faker.color.cssSupportedFunction() // 'rgb'
   *
   * @since 7.0.0
   */
  cssSupportedFunction(): CssFunctionType {
    return colorCssSupportedFunction(this.faker.fakerCore);
  }

  /**
   * Returns a random CSS-supported color space name.
   *
   * @example
   * faker.color.cssSupportedSpace() // 'display-p3'
   *
   * @since 7.0.0
   */
  cssSupportedSpace(): CssSpaceType {
    return colorCssSupportedSpace(this.faker.fakerCore);
  }

  /**
   * Returns an RGB color.
   *
   * @example
   * faker.color.rgb() // '#8be4ab'
   *
   * @since 7.0.0
   */
  rgb(): string;
  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.prefix Prefix of the generated hex color. Only applied when 'hex' format is used. Defaults to `'#'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
   * @param options.format Format of generated RGB color. Defaults to `hex`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '#0d7f26'
   * faker.color.rgb({ prefix: '0x' }) // '0x9ddc8b'
   * faker.color.rgb({ casing: 'upper' }) // '#B8A51E'
   * faker.color.rgb({ casing: 'lower' }) // '#b12f8b'
   * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#eb0c16'
   * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#bb9d17'
   * faker.color.rgb({ format: 'css' }) // 'rgb(216, 17, 192)'
   * faker.color.rgb({ format: 'binary' }) // '00110010 00001000 01110110'
   * faker.color.rgb({ includeAlpha: true }) // '#f96efb5e'
   * faker.color.rgb({ format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
   *
   * @since 7.0.0
   */
  rgb(options?: {
    /**
     * Prefix of the generated hex color. Only applied when 'hex' format is used.
     *
     * @default '#'
     */
    prefix?: string;
    /**
     * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default 'lower'
     */
    casing?: Casing;
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
     */
    format?: 'hex' | StringColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
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
   * faker.color.rgb() // '0x8be4ab'
   * faker.color.rgb({ format: 'decimal' }) // [64, 192,174]
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
   *
   * @since 7.0.0
   */
  rgb(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
     */
    format?: NumberColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }): number[];
  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'#'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '#0d7f26'
   * faker.color.rgb({ prefix: '0x' }) // '0x9ddc8b'
   * faker.color.rgb({ casing: 'upper' }) // '#B8A51E'
   * faker.color.rgb({ casing: 'lower' }) // '#b12f8b'
   * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#eb0c16'
   * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#bb9d17'
   * faker.color.rgb({ format: 'decimal' }) // [64, 192,174]
   * faker.color.rgb({ format: 'css' }) // 'rgb(216, 17, 192)'
   * faker.color.rgb({ format: 'binary' }) // '00110010 00001000 01110110'
   * faker.color.rgb({ includeAlpha: true }) // '#f96efb5e'
   * faker.color.rgb({ format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
   *
   * @since 7.0.0
   */
  rgb(options?: {
    /**
     * Prefix of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default '#'
     */
    prefix?: string;
    /**
     * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default 'lower'
     */
    casing?: Casing;
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
     */
    format?: 'hex' | ColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }): string | number[];
  rgb(
    options: {
      prefix?: string;
      casing?: Casing;
      format?: 'hex' | ColorFormat;
      includeAlpha?: boolean;
    } = {}
  ): string | number[] {
    return colorRgb(this.faker.fakerCore, options);
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
   * faker.color.cmyk({ format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   *
   * @since 7.0.0
   */
  cmyk(options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }): string;
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
  cmyk(options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }): number[];
  /**
   * Returns a CMYK color.
   *
   * @param options Options object.
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   *
   * @since 7.0.0
   */
  cmyk(options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }): string | number[];
  cmyk(options: { format?: ColorFormat } = {}): string | number[] {
    return colorCmyk(this.faker.fakerCore, options);
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
  hsl(options?: {
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }): string;
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
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
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
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }): string | number[];
  hsl(
    options: {
      format?: ColorFormat;
      includeAlpha?: boolean;
    } = {}
  ): string | number[] {
    return colorHsl(this.faker.fakerCore, options);
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
   * faker.color.hwb({ format: 'css' }) // 'hwb(354 72% 41%)'
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }): string;
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
  hwb(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }): number[];
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // 'hwb(354 72% 41%)'
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }): string | number[];
  /**
   * Returns an HWB color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // 'hwb(354 72% 41%)'
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  hwb(
    options: {
      /**
       * Format of generated RGB color.
       *
       * @default 'decimal'
       */
      format?: ColorFormat;
    } = {}
  ): string | number[] {
    return colorHwb(this.faker.fakerCore, options);
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
   * faker.color.lab({ format: 'css' }) // 'lab(29.2345% 39.3825 20.0664)'
   * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lab(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }): string;
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
  lab(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }): number[];
  /**
   * Returns a LAB (CIELAB) color.
   *
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lab() // [0.832133, -80.3245, 100.1234]
   * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
   * faker.color.lab({ format: 'css' }) // 'lab(29.2345% 39.3825 20.0664)'
   * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lab(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }): string | number[];
  lab(options: { format?: ColorFormat } = {}): string | number[] {
    return colorLab(this.faker.fakerCore, options);
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
   * faker.color.lch({ format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
   * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lch(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }): string;
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
  lch(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }): number[];
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
   * faker.color.lch({ format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
   * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
   */
  lch(options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }): string | number[];
  lch(options: { format?: ColorFormat } = {}): string | number[] {
    return colorLch(this.faker.fakerCore, options);
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
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
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
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
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
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
  }): string | number[];
  colorByCSSColorSpace(
    options: {
      format?: ColorFormat;
      space?: CssSpaceType;
    } = {}
  ): string | number[] {
    return colorColorByCSSColorSpace(this.faker.fakerCore, options);
  }
}
