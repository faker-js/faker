import { fakeDateMonth } from './month';
import { SimpleDateModule } from './simple-module';
import { fakeDateTimeZone } from './time-zone';
import { fakeDateWeekday } from './weekday';

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
    return fakeDateMonth(this.fakerCore, options);
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
    return fakeDateWeekday(this.fakerCore, options);
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
   * faker.date.timeZone() // 'Pacific/Guam'
   *
   * @since 9.0.0
   */
  timeZone(): string {
    return fakeDateTimeZone(this.fakerCore);
  }
}
