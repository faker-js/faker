import type { Faker } from '../..';
import type { DateEntryDefinition } from '../../definitions';
import { FakerError } from '../../errors/faker-error';

/**
 * Converts date passed as a string, number or Date to a Date object.
 * If nothing or a non parseable value is passed, takes current date.
 *
 * @param date Date
 */
function toDate(date?: string | Date | number): Date {
  date = new Date(date);
  if (isNaN(date.valueOf())) {
    date = new Date();
  }

  return date;
}

/**
 * Module to generate dates.
 */
export class DateModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(DateModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random date in the past.
   *
   * @param years The range of years the date may be in the past. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @see faker.date.recent()
   *
   * @example
   * faker.date.past() // '2021-12-03T05:40:44.408Z'
   * faker.date.past(10) // '2017-10-25T21:34:19.488Z'
   * faker.date.past(10, '2020-01-01T00:00:00.000Z') // '2017-08-18T02:59:12.350Z'
   *
   * @since 2.0.1
   */
  past(years?: number, refDate?: string | Date | number): Date {
    if (years <= 0) {
      throw new FakerError('Years must be greater than 0.');
    }

    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (years ?? 1) * 365 * 24 * 3600 * 1000,
    };

    let past = date.getTime();
    past -= this.faker.datatype.number(range); // some time from now to N years ago, in milliseconds
    date.setTime(past);

    return date;
  }

  /**
   * Generates a random date in the future.
   *
   * @param years The range of years the date may be in the future. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @see faker.date.soon()
   *
   * @example
   * faker.date.future() // '2022-11-19T05:52:49.100Z'
   * faker.date.future(10) // '2030-11-23T09:38:28.710Z'
   * faker.date.future(10, '2020-01-01T00:00:00.000Z') // '2020-12-13T22:45:10.252Z'
   *
   * @since 2.0.1
   */
  future(years?: number, refDate?: string | Date | number): Date {
    if (years <= 0) {
      throw new FakerError('Years must be greater than 0.');
    }

    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (years ?? 1) * 365 * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.datatype.number(range); // some time from now to N years later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Generates a random date between the given boundaries.
   *
   * @param from The early date boundary.
   * @param to The late date boundary.
   *
   * @example
   * faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z') // '2026-05-16T02:22:53.002Z'
   *
   * @since 2.0.1
   */
  between(from: string | Date | number, to: string | Date | number): Date {
    const fromMs = toDate(from).getTime();
    const toMs = toDate(to).getTime();
    const dateOffset = this.faker.datatype.number(toMs - fromMs);

    return new Date(fromMs + dateOffset);
  }

  /**
   * Generates n random dates between the given boundaries.
   *
   * @param from The early date boundary.
   * @param to The late date boundary.
   * @param num The number of dates to generate. Defaults to `3`.
   *
   * @example
   * faker.date.betweens('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z')
   * // [
   * //   2022-07-02T06:00:00.000Z,
   * //   2024-12-31T12:00:00.000Z,
   * //   2027-07-02T18:00:00.000Z
   * // ]
   * faker.date.betweens('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z', 2)
   * // [ 2023-05-02T16:00:00.000Z, 2026-09-01T08:00:00.000Z ]
   *
   * @since 5.4.0
   */
  betweens(
    from: string | Date | number,
    to: string | Date | number,
    num: number = 3
  ): Date[] {
    const dates: Date[] = [];

    while (dates.length < num) {
      dates.push(this.between(from, to));
    }

    return dates.sort((a, b) => a.getTime() - b.getTime());
  }

  /**
   * Generates a random date in the recent past.
   *
   * @param days The range of days the date may be in the past. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @see faker.date.past()
   *
   * @example
   * faker.date.recent() // '2022-02-04T02:09:35.077Z'
   * faker.date.recent(10) // '2022-01-29T06:12:12.829Z'
   * faker.date.recent(10, '2020-01-01T00:00:00.000Z') // '2019-12-27T18:11:19.117Z'
   *
   * @since 2.0.1
   */
  recent(days?: number, refDate?: string | Date | number): Date {
    if (days <= 0) {
      throw new FakerError('Days must be greater than 0.');
    }

    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (days ?? 1) * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future -= this.faker.datatype.number(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Generates a random date in the near future.
   *
   * @param days The range of days the date may be in the future. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @see faker.date.future()
   *
   * @example
   * faker.date.soon() // '2022-02-05T09:55:39.216Z'
   * faker.date.soon(10) // '2022-02-11T05:14:39.138Z'
   * faker.date.soon(10, '2020-01-01T00:00:00.000Z') // '2020-01-01T02:40:44.990Z'
   *
   * @since 5.0.0
   */
  soon(days?: number, refDate?: string | Date | number): Date {
    if (days <= 0) {
      throw new FakerError('Days must be greater than 0.');
    }

    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (days ?? 1) * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.datatype.number(range); // some time from now to N days later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Returns a random name of a month.
   *
   * @param options The optional options to use.
   * @param options.abbr Whether to return an abbreviation. Defaults to `false`.
   * @param options.context Whether to return the name of a month in a context. Defaults to `false`.
   *
   * @example
   * faker.date.month() // 'October'
   * faker.date.month({ abbr: true }) // 'Feb'
   * faker.date.month({ context: true }) // 'June'
   * faker.date.month({ abbr: true, context: true }) // 'Sep'
   *
   * @since 3.0.1
   */
  month(options?: { abbr?: boolean; context?: boolean }): string {
    const abbr = options?.abbr ?? false;
    const context = options?.context ?? false;

    const source = this.faker.definitions.date.month;
    let type: keyof DateEntryDefinition;
    if (abbr) {
      if (context && source['abbr_context'] != null) {
        type = 'abbr_context';
      } else {
        type = 'abbr';
      }
    } else if (context && source['wide_context'] != null) {
      type = 'wide_context';
    } else {
      type = 'wide';
    }

    return this.faker.helpers.arrayElement(source[type]);
  }

  /**
   * Returns a random day of the week.
   *
   * @param options The optional options to use.
   * @param options.abbr Whether to return an abbreviation. Defaults to `false`.
   * @param options.context Whether to return the day of the week in a context. Defaults to `false`.
   *
   * @example
   * faker.date.weekday() // 'Monday'
   * faker.date.weekday({ abbr: true }) // 'Thu'
   * faker.date.weekday({ context: true }) // 'Thursday'
   * faker.date.weekday({ abbr: true, context: true }) // 'Fri'
   *
   * @since 3.0.1
   */
  weekday(options?: { abbr?: boolean; context?: boolean }): string {
    const abbr = options?.abbr ?? false;
    const context = options?.context ?? false;

    const source = this.faker.definitions.date.weekday;
    let type: keyof DateEntryDefinition;
    if (abbr) {
      if (context && source['abbr_context'] != null) {
        type = 'abbr_context';
      } else {
        type = 'abbr';
      }
    } else if (context && source['wide_context'] != null) {
      type = 'wide_context';
    } else {
      type = 'wide';
    }

    return this.faker.helpers.arrayElement(source[type]);
  }

  /**
   * Returns a random birthdate.
   *
   * @param options The options to use to generate the birthdate. If no options are set, an age between 18 and 80 (inclusive) is generated.
   * @param options.min The minimum age or year to generate a birthdate.
   * @param options.max The maximum age or year to generate a birthdate.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `now`.
   * @param options.mode The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
   *
   * There are two modes available `'age'` and `'year'`:
   * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
   * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
   *
   * Defaults to `year`.
   *
   * @example
   * faker.date.birthdate() // 1977-07-10T01:37:30.719Z
   * faker.date.birthdate({ min: 18, max: 65, mode: 'age' }) // 2003-11-02T20:03:20.116Z
   * faker.date.birthdate({ min: 1900, max: 2000, mode: 'year' }) // 1940-08-20T08:53:07.538Z
   *
   * @since 7.0.0
   */
  birthdate(
    options: {
      min?: number;
      max?: number;
      mode?: 'age' | 'year';
      refDate?: string | Date | number;
    } = {}
  ): Date {
    const mode = options.mode === 'age' ? 'age' : 'year';
    const refDate = toDate(options.refDate);
    const refYear = refDate.getUTCFullYear();

    // If no min or max is specified, generate a random date between (now - 80) years and (now - 18) years respectively
    // So that people can still be considered as adults in most cases

    // Convert to epoch timestamps
    let min: number;
    let max: number;
    if (mode === 'age') {
      min = new Date(refDate).setUTCFullYear(refYear - (options.max ?? 80) - 1);
      max = new Date(refDate).setUTCFullYear(refYear - (options.min ?? 18));
    } else {
      // Avoid generating dates the first and last date of the year
      // to avoid running into other years depending on the timezone.
      min = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(
        options.min ?? refYear - 80
      );
      max = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(
        options.max ?? refYear - 18
      );
    }

    if (max < min) {
      throw new FakerError(`Max ${max} should be larger then min ${min}.`);
    }

    return new Date(this.faker.datatype.number({ min, max }));
  }
}
