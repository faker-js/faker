import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { between } from './between';

/**
 * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
 * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use to generate the birthdate.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * birthdate(fakerCore) // '1977-07-10T01:37:30.719Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function birthdate(
  fakerCore: FakerCore,
  options?: {
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  }
): Date;
/**
 * Returns a random birthdate for a given age range.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use to generate the birthdate.
 * @param options.mode `'age'` to generate a birthdate based on the age range. It is also possible to generate a birthdate based on a `'year'` range.
 * @param options.min The minimum age to generate a birthdate for.
 * @param options.max The maximum age to generate a birthdate for.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * birthdate(fakerCore, { mode: 'age', min: 18, max: 65 }) // '2003-11-02T20:03:20.116Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function birthdate(
  fakerCore: FakerCore,
  options: {
    /**
     * `'age'` to generate a birthdate based on the age range.
     * It is also possible to generate a birthdate based on a `'year'` range.
     */
    mode: 'age';
    /**
     * The minimum age to generate a birthdate for.
     */
    min: number;
    /**
     * The maximum age to generate a birthdate for.
     */
    max: number;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  }
): Date;
/**
 * Returns a random birthdate in the given range of years.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use to generate the birthdate.
 * @param options.mode `'year'` to generate a birthdate based on the year range. It is also possible to generate a birthdate based on a `'age'` range.
 * @param options.min The minimum year to generate a birthdate in.
 * @param options.max The maximum year to generate a birthdate in.
 *
 * @example
 * birthdate(fakerCore, { mode: 'year', min: 1900, max: 2000 }) // '1940-08-20T08:53:07.538Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function birthdate(
  fakerCore: FakerCore,
  options: {
    /**
     * `'year'` to generate a birthdate based on the year range.
     * It is also possible to generate a birthdate based on an `'age'` range.
     */
    mode: 'year';
    /**
     * The minimum year to generate a birthdate in.
     */
    min: number;
    /**
     * The maximum year to generate a birthdate in.
     */
    max: number;
  }
): Date;
/**
 * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
 * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use to generate the birthdate.
 * @param options.mode Either `'age'` or `'year'` to generate a birthdate based on the age or year range.
 * @param options.min The minimum age or year to generate a birthdate in.
 * @param options.max The maximum age or year to generate a birthdate in.
 * @param options.refDate The date to use as reference point for the newly generated date.
 * Only used when `mode` is `'age'`.
 * Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @example
 * birthdate(fakerCore) // '1977-07-10T01:37:30.719Z'
 * birthdate(fakerCore, { mode: 'age', min: 18, max: 65 }) // '2003-11-02T20:03:20.116Z'
 * birthdate(fakerCore, { mode: 'year', min: 1900, max: 2000 }) // '1940-08-20T08:53:07.538Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function birthdate(
  fakerCore: FakerCore,
  options?:
    | {
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default getDefaultRefDate(fakerCore)
         */
        refDate?: string | Date | number;
      }
    | {
        /**
         * Either `'age'` or `'year'` to generate a birthdate based on the age or year range.
         */
        mode: 'age' | 'year';
        /**
         * The minimum age/year to generate a birthdate for/in.
         */
        min: number;
        /**
         * The maximum age/year to generate a birthdate for/in.
         */
        max: number;
        /**
         * The date to use as reference point for the newly generated date.
         * Only used when `mode` is `'age'`.
         *
         * @default getDefaultRefDate(fakerCore)
         */
        refDate?: string | Date | number;
      }
): Date;

export function birthdate(
  fakerCore: FakerCore,
  options: {
    mode?: 'age' | 'year';
    min?: number;
    max?: number;
    refDate?: string | Date | number;
  } = {}
): Date {
  const {
    mode = 'age',
    min = 18,
    max = 80,
    refDate: rawRefDate = getDefaultRefDate(fakerCore),
  } = options;

  const refDate = toDate(rawRefDate);
  const refYear = refDate.getUTCFullYear();

  switch (mode) {
    case 'age': {
      // Add one day to the `from` date to avoid generating the same date as the reference date.
      const oneDay = 24 * 60 * 60 * 1000;
      const from = new Date(refDate).setUTCFullYear(refYear - max - 1) + oneDay;
      const to = new Date(refDate).setUTCFullYear(refYear - min);

      if (from > to) {
        throw new FakerError(
          `Max age ${max} should be greater than or equal to min age ${min}.`
        );
      }

      return between(fakerCore, { from, to });
    }

    case 'year': {
      // Avoid generating dates on the first and last date of the year
      // to avoid running into other years depending on the timezone.
      const from = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(min);
      const to = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(max);

      if (from > to) {
        throw new FakerError(
          `Max year ${max} should be greater than or equal to min year ${min}.`
        );
      }

      return between(fakerCore, { from, to });
    }
  }
}
