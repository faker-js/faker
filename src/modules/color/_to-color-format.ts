import type { ColorFormat } from './_types';
import type { CssFunctionType } from './css-supported-function';
import type { CssSpaceType } from './css-supported-space';

/**
 * Converts an array of color values to the specified color format.
 *
 * @param values Array of color values to be converted.
 * @param format Format of generated RGB color.
 * @param cssFunction CSS function to be generated for the color. Defaults to `'rgb'`.
 * @param space Color space to format CSS color function with. Defaults to `'sRGB'`.
 */
export function toColorFormat(
  values: number[],
  format: ColorFormat,
  cssFunction: CssFunctionType = 'rgb',
  space: CssSpaceType = 'sRGB'
): string | number[] {
  switch (format) {
    case 'css': {
      return toCSS(values, cssFunction, space);
    }

    case 'binary': {
      return toBinary(values);
    }

    case 'decimal': {
      return values;
    }
  }
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
      return toBinary([...bytes]).replaceAll(' ', '');
    }

    return (value >>> 0).toString(2).padStart(8, '0');
  });
  return binary.join(' ');
}

/**
 * Converts the given value to a percentage (`round(value * 100)`).
 *
 * @param value The value to convert to a percentage.
 */
function toPercentage(value: number): number {
  return Math.round(value * 100);
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
  cssFunction: CssFunctionType = 'rgb',
  space: CssSpaceType = 'sRGB'
): string {
  switch (cssFunction) {
    case 'rgba': {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;
    }

    case 'color': {
      return `color(${space} ${values[0]} ${values[1]} ${values[2]})`;
    }

    case 'cmyk': {
      return `cmyk(${toPercentage(values[0])}%, ${toPercentage(
        values[1]
      )}%, ${toPercentage(values[2])}%, ${toPercentage(values[3])}%)`;
    }

    case 'hsl': {
      return `hsl(${values[0]}deg ${toPercentage(values[1])}% ${toPercentage(
        values[2]
      )}%)`;
    }

    case 'hsla': {
      return `hsl(${values[0]}deg ${toPercentage(values[1])}% ${toPercentage(
        values[2]
      )}% / ${values[3]})`;
    }

    case 'hwb': {
      return `hwb(${values[0]} ${toPercentage(values[1])}% ${toPercentage(
        values[2]
      )}%)`;
    }

    case 'lab': {
      return `lab(${toPercentage(values[0])}% ${values[1]} ${values[2]})`;
    }

    case 'lch': {
      return `lch(${toPercentage(values[0])}% ${values[1]} ${values[2]})`;
    }

    case 'rgb': {
      return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
    }
  }
}
