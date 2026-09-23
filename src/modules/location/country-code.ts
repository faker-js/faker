import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The code to return or an options object.
 * @param options.variant The variant to return. Can be one of:
 *
 * - `'alpha-2'` (two-letter code)
 * - `'alpha-3'` (three-letter code)
 * - `'numeric'` (numeric code)
 *
 * Defaults to `'alpha-2'`.
 *
 * @example
 * countryCode(fakerCore) // 'SJ'
 * countryCode(fakerCore, 'alpha-2') // 'GA'
 * countryCode(fakerCore, 'alpha-3') // 'TJK'
 * countryCode(fakerCore, 'numeric') // '528'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function countryCode(
  fakerCore: FakerCore,
  options:
    | 'alpha-2'
    | 'alpha-3'
    | 'numeric'
    | {
        /**
         * The code to return.
         * Can be either `'alpha-2'` (two-letter code),
         * `'alpha-3'` (three-letter code)
         * or `'numeric'` (numeric code).
         *
         * @default 'alpha-2'
         */
        variant?: 'alpha-2' | 'alpha-3' | 'numeric';
      } = {}
): string {
  if (typeof options === 'string') {
    options = { variant: options };
  }

  const { variant = 'alpha-2' } = options;
  const key = (() => {
    switch (variant) {
      case 'numeric': {
        return 'numeric';
      }

      case 'alpha-3': {
        return 'alpha3';
      }

      case 'alpha-2': {
        return 'alpha2';
      }
    }
  })();

  return arrayElement(fakerCore, fakerCore.locale.location.country_code)[key];
}
