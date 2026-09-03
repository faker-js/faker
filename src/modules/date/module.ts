import type { Faker } from '../../faker';
import { SimpleModuleBase } from '../../internal/module-base';
import type { NumberOrRange } from '../../utils/types';
import { anytime as dateAnytime } from './anytime';
import { between as dateBetween } from './between';
import { betweens as dateBetweens } from './betweens';
import { birthdate as dateBirthdate } from './birthdate';
import { future as dateFuture } from './future';
import { month as dateMonth } from './month';
import { past as datePast } from './past';
import { recent as dateRecent } from './recent';
import { soon as dateSoon } from './soon';
import { timeZone as dateTimeZone } from './time-zone';
import { weekday as dateWeekday } from './weekday';

/**
 * Module to generate dates (without methods requiring localized data).
 */
export class SimpleDateModule extends SimpleModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree date' to update the methods from their respective files.
   */

  /**
   * Generates a random date that can be either in the past or in the future.
   *
   * @param options The optional options object.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.between(): For generating dates in a specific range.
   * @see faker.date.past(): For generating dates explicitly in the past.
   * @see faker.date.future(): For generating dates explicitly in the future.
   *
   * @example
   * faker.date.anytime() // '2022-07-31T01:33:29.567Z'
   *
   * @since 8.0.0
   */
  anytime(
    options: {
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return dateAnytime(this.faker.fakerCore, options);
  }

  /**
   * Generates a random date in the past.
   *
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the past. Either as a fixed amount of years or as a year range. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @throws {FakerError} If `years.max` is less than 0.
   * @throws {FakerError} If `years.min` is greater than or equal to `years.max`.
   *
   * @see faker.date.recent(): For generating dates in the recent past (days instead of years).
   *
   * @example
   * faker.date.past() // '2021-12-03T05:40:44.408Z'
   * faker.date.past({ years: 10 }) // '2017-10-25T21:34:19.488Z'
   * faker.date.past({ years: { min: 4, max: 7 } }) // '2022-12-12T03:43:16.434Z'
   * faker.date.past({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
   *
   * @since 8.0.0
   */
  past(
    options: {
      /**
       * The range of years the date may be in the past.
       *
       * @default 1
       */
      years?: NumberOrRange;
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return datePast(this.faker.fakerCore, options);
  }

  /**
   * Generates a random date in the future.
   *
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the future. Either as a fixed amount of years or as a year range. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @throws {FakerError} If `years.max` is less than 0.
   * @throws {FakerError} If `years.min` is greater than or equal to `years.max`.
   *
   * @see faker.date.soon(): For generating dates in the near future (days instead of years).
   *
   * @example
   * faker.date.future() // '2022-11-19T05:52:49.100Z'
   * faker.date.future({ years: 10 }) // '2030-11-23T09:38:28.710Z'
   * faker.date.future({ years: { min: 4, max: 7 } }) // '2031-05-21T05:49:21.116Z'
   * faker.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
   *
   * @since 8.0.0
   */
  future(
    options: {
      /**
       * The range of years the date may be in the future.
       *
       * @default 1
       */
      years?: NumberOrRange;
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return dateFuture(this.faker.fakerCore, options);
  }

  /**
   * Generates a random date between the given boundaries.
   *
   * @param options The options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
   *
   * @throws {FakerError} If `from` or `to` are not provided.
   * @throws {FakerError} If `from` is after `to`.
   *
   * @example
   * faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
   *
   * @since 8.0.0
   */
  between(options: {
    /**
     * The early date boundary.
     */
    from: string | Date | number;
    /**
     * The late date boundary.
     */
    to: string | Date | number;
  }): Date {
    return dateBetween(this.faker.fakerCore, options);
  }

  /**
   * Generates random dates between the given boundaries. The dates will be returned in an array sorted in chronological order.
   *
   * @param options The options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
   * @param options.count The number of dates to generate. Defaults to `3`.
   *
   * @throws {FakerError} If `from` or `to` are not provided.
   * @throws {FakerError} If `from` is after `to`.
   *
   * @example
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })
   * // [
   * //   '2022-07-02T06:00:00.000Z',
   * //   '2024-12-31T12:00:00.000Z',
   * //   '2027-07-02T18:00:00.000Z'
   * // ]
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
   * // [ '2023-05-02T16:00:00.000Z', '2026-09-01T08:00:00.000Z' ]
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: { min: 2, max: 5 }})
   * // [
   * //   2021-12-19T06:35:40.191Z,
   * //   2022-09-10T08:03:51.351Z,
   * //   2023-04-19T11:41:17.501Z
   * // ]
   *
   * @since 8.0.0
   */
  betweens(options: {
    /**
     * The early date boundary.
     */
    from: string | Date | number;
    /**
     * The late date boundary.
     */
    to: string | Date | number;
    /**
     * The number of dates to generate.
     *
     * @default 3
     */
    count?: NumberOrRange;
  }): Date[] {
    return dateBetweens(this.faker.fakerCore, options);
  }

  /**
   * Generates a random date in the recent past.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the past. Either as a fixed amount of days or as a day range. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @throws {FakerError} If `days.max` is less than 0.
   * @throws {FakerError} If `days.min` is greater than or equal to `days.max`.
   *
   * @see faker.date.past(): For generating dates further back in time (years instead of days).
   *
   * @example
   * faker.date.recent() // '2022-02-04T02:09:35.077Z'
   * faker.date.recent({ days: 10 }) // '2022-01-29T06:12:12.829Z'
   * faker.date.recent({ days: { min: 4, max: 7 } }) // '2022-02-02T17:54:01.818Z'
   * faker.date.recent({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2019-12-27T18:11:19.117Z'
   *
   * @since 8.0.0
   */
  recent(
    options: {
      /**
       * The range of days the date may be in the past.
       *
       * @default 1
       */
      days?:
        | number
        | {
            /**
             * The minimum amount of days the date should be in the past.
             *
             * @default 0
             */
            min: number;
            /**
             * The maximum amount of days the date should be in the past.
             *
             * @default 1
             */
            max: number;
          };
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return dateRecent(this.faker.fakerCore, options);
  }

  /**
   * Generates a random date in the near future.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the future. Either as a fixed amount of days or as a day range. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @throws {FakerError} If `days.max` is less than 0.
   * @throws {FakerError} If `days.min` is greater than or equal to `days.max`.
   *
   * @see faker.date.future(): For generating dates further in the future (years instead of days).
   *
   * @example
   * faker.date.soon() // '2022-02-05T09:55:39.216Z'
   * faker.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
   * faker.date.soon({ days: { min: 4, max: 7 } }) // '2022-02-09T17:54:01.818Z'
   * faker.date.soon({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-01-01T02:40:44.990Z'
   *
   * @since 8.0.0
   */
  soon(
    options: {
      /**
       * The range of days the date may be in the future.
       *
       * @default 1
       */
      days?:
        | number
        | {
            /**
             * The minimum amount of days the date should be in the future.
             *
             * @default 0
             */
            min: number;
            /**
             * The maximum amount of days the date should be in the future.
             *
             * @default 1
             */
            max: number;
          };
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return dateSoon(this.faker.fakerCore, options);
  }

  /**
   * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
   * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
   *
   * @param options The options to use to generate the birthdate.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @example
   * faker.date.birthdate() // '1977-07-10T01:37:30.719Z'
   *
   * @since 7.0.0
   */
  birthdate(options?: {
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Returns a random birthdate for a given age range.
   *
   * @param options The options to use to generate the birthdate.
   * @param options.mode `'age'` to generate a birthdate based on the age range. It is also possible to generate a birthdate based on a `'year'` range.
   * @param options.min The minimum age to generate a birthdate for.
   * @param options.max The maximum age to generate a birthdate for.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @example
   * faker.date.birthdate({ mode: 'age', min: 18, max: 65 }) // '2003-11-02T20:03:20.116Z'
   *
   * @since 7.0.0
   */
  birthdate(options: {
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
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Returns a random birthdate in the given range of years.
   *
   * @param options The options to use to generate the birthdate.
   * @param options.mode `'year'` to generate a birthdate based on the year range. It is also possible to generate a birthdate based on a `'age'` range.
   * @param options.min The minimum year to generate a birthdate in.
   * @param options.max The maximum year to generate a birthdate in.
   *
   * @example
   * faker.date.birthdate({ mode: 'year', min: 1900, max: 2000 }) // '1940-08-20T08:53:07.538Z'
   *
   * @since 7.0.0
   */
  birthdate(options: {
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
  }): Date;
  /**
   * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
   * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
   *
   * @param options The options to use to generate the birthdate.
   * @param options.mode Either `'age'` or `'year'` to generate a birthdate based on the age or year range.
   * @param options.min The minimum age or year to generate a birthdate in.
   * @param options.max The maximum age or year to generate a birthdate in.
   * @param options.refDate The date to use as reference point for the newly generated date.
   * Only used when `mode` is `'age'`.
   * Defaults to `faker.defaultRefDate()`.
   *
   * @example
   * faker.date.birthdate() // '1977-07-10T01:37:30.719Z'
   * faker.date.birthdate({ mode: 'age', min: 18, max: 65 }) // '2003-11-02T20:03:20.116Z'
   * faker.date.birthdate({ mode: 'year', min: 1900, max: 2000 }) // '1940-08-20T08:53:07.538Z'
   *
   * @since 7.0.0
   */
  birthdate(
    options?:
      | {
          /**
           * The date to use as reference point for the newly generated date.
           *
           * @default faker.defaultRefDate()
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
           * @default faker.defaultRefDate()
           */
          refDate?: string | Date | number;
        }
  ): Date;
  birthdate(
    options: {
      mode?: 'age' | 'year';
      min?: number;
      max?: number;
      refDate?: string | Date | number;
    } = {}
  ): Date {
    return dateBirthdate(this.faker.fakerCore, options);
  }
}

/**
 * Module to generate dates.
 *
 * ### Overview
 *
 * To quickly generate a date in the past, use [`recent()`](https://fakerjs.dev/api/date.html#recent) (last day) or [`past()`](https://fakerjs.dev/api/date.html#past) (last year).
 * To quickly generate a date in the future, use [`soon()`](https://fakerjs.dev/api/date.html#soon) (next day) or [`future()`](https://fakerjs.dev/api/date.html#future) (next year).
 * For a realistic birthdate for an adult, use [`birthdate()`](https://fakerjs.dev/api/date.html#birthdate).
 *
 * For more control, any of these methods can be customized with further options, or use [`between()`](https://fakerjs.dev/api/date.html#between) to generate a single date between two dates, or [`betweens()`](https://fakerjs.dev/api/date.html#betweens) for multiple dates.
 *
 * If you need to generate a date range (start-end), you can do so using either of these two methods:
 *
 * - `const start = faker.date.soon(); const end = faker.date.soon({ refDate: start });`
 * - `const [start, end] = faker.date.betweens({ from, to, count: 2 });` // does not work with tsconfig's `noUncheckedIndexedAccess: true`
 *
 * Dates can be specified as Javascript Date objects, strings or UNIX timestamps.
 * For example to generate a date between 1st January 2000 and now, use:
 * ```ts
 * faker.date.between({ from: '2000-01-01', to: Date.now() });
 * ```
 *
 * You can generate random localized month and weekday names using [`month()`](https://fakerjs.dev/api/date.html#month) and [`weekday()`](https://fakerjs.dev/api/date.html#weekday).
 *
 * These methods have additional concerns about reproducibility, see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results).
 */
export class DateModule extends SimpleDateModule {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree date' to update the methods from their respective files.
   */

  constructor(protected readonly faker: Faker) {
    super(faker);
  }

  /**
   * Returns a random name of a month.
   *
   * @param options The optional options to use.
   * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
   * @param options.context Whether to return the name of a month in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`. Defaults to `false`.
   *
   * @example
   * faker.date.month() // 'October'
   * faker.date.month({ abbreviated: true }) // 'Feb'
   * faker.date.month({ context: true }) // 'June'
   * faker.date.month({ abbreviated: true, context: true }) // 'Sep'
   *
   * @since 3.0.1
   */
  month(
    options: {
      /**
       * Whether to return an abbreviation.
       *
       * @default false
       */
      abbreviated?: boolean;
      /**
       * Whether to return the name of a month in the context of a date.
       *
       * In the default `en` locale this has no effect,
       * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
       * for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`.
       *
       * @default false
       */
      context?: boolean;
    } = {}
  ): string {
    return dateMonth(this.faker.fakerCore, options);
  }

  /**
   * Returns a random day of the week.
   *
   * @param options The optional options to use.
   * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
   * @param options.context Whether to return the day of the week in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`. Defaults to `false`.
   *
   * @example
   * faker.date.weekday() // 'Monday'
   * faker.date.weekday({ abbreviated: true }) // 'Thu'
   * faker.date.weekday({ context: true }) // 'Thursday'
   * faker.date.weekday({ abbreviated: true, context: true }) // 'Fri'
   *
   * @since 3.0.1
   */
  weekday(
    options: {
      /**
       * Whether to return an abbreviation.
       *
       * @default false
       */
      abbreviated?: boolean;
      /**
       * Whether to return the day of the week in the context of a date.
       *
       * In the default `en` locale this has no effect,
       * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
       * for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`.
       *
       * @default false
       */
      context?: boolean;
    } = {}
  ): string {
    return dateWeekday(this.faker.fakerCore, options);
  }

  /**
   * Returns a random IANA time zone name.
   *
   * The returned time zone is not tied to the current locale.
   *
   * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
   * @see faker.location.timeZone(): For generating a timezone based on the current locale.
   *
   * @example
   * faker.location.timeZone() // 'Pacific/Guam'
   *
   * @since 9.0.0
   */
  timeZone(): string {
    return dateTimeZone(this.faker.fakerCore);
  }
}
