import type { Casing } from '../../utils/types';

/**
 * Formats the hex format of a generated color string according
 * to options specified by user.
 *
 * @param hexColor Hex color string to be formatted.
 * @param options Options object.
 * @param options.prefix Prefix of the generated hex color.
 * @param options.casing Letter type case of the generated hex color.
 */
export function formatHexColor(
  hexColor: string,
  options: {
    prefix: string;
    casing: Casing;
  }
): string {
  const { prefix, casing } = options;

  switch (casing) {
    case 'upper': {
      hexColor = hexColor.toUpperCase();
      break;
    }

    case 'lower': {
      hexColor = hexColor.toLowerCase();
      break;
    }

    case 'mixed':
    // Do nothing
  }

  if (prefix) {
    hexColor = prefix + hexColor;
  }

  return hexColor;
}
