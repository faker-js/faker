import type { Faker } from '.';
import type { DateEntryDefinition } from './definitions';

/**
 * Converts date passed as a string or Date to a Date object. If nothing passed, takes current date.
 *
 * @param date
 */
function toDate(date?: string | Date): Date {
  if (date != null) {
    return new Date(date instanceof Date ? date : Date.parse(date));
  }

  return new Date();
}

/**
 * Converts date passed as a string or Date to milliseconds. If nothing passed, takes current date.
 *
 * @param date
 */
function toMilliseconds(date?: string | Date): number {
  if (date != null) {
    return date instanceof Date ? date.getTime() : Date.parse(date);
  }

  return new Date().getTime();
}

/**
 * Module to generate dates.
 */
export class _Date {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(_Date.prototype)) {
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
   */
  past(years?: number, refDate?: string | Date): Date {
    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
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
   */
  future(years?: number, refDate?: string | Date): Date {
    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
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
   */
  between(from: string | Date, to: string | Date): Date {
    const fromMs = toMilliseconds(from);
    const toMs = toMilliseconds(to);
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
   */
  betweens(from: string | Date, to: string | Date, num?: number): Date[] {
    if (typeof num === 'undefined') {
      num = 3;
    }

    const dates: Date[] = [];

    for (let i = 0; i < num; i++) {
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
   */
  recent(days?: number, refDate?: string | Date): Date {
    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
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
   */
  soon(days?: number, refDate?: string | Date): Date {
    const date = toDate(refDate);
    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
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
   */
  month(options?: { abbr?: boolean; context?: boolean }): string {
    const abbr = options?.abbr ?? false;
    const context = options?.context ?? false;

    const source = this.faker.definitions.date.month;
    let type: keyof DateEntryDefinition;
    if (abbr) {
      if (context && typeof source['abbr_context'] !== 'undefined') {
        type = 'abbr_context';
      } else {
        type = 'abbr';
      }
    } else if (context && typeof source['wide_context'] !== 'undefined') {
      type = 'wide_context';
    } else {
      type = 'wide';
    }

    return this.faker.random.arrayElement(source[type]);
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
   */
  weekday(options?: { abbr?: boolean; context?: boolean }): string {
    const abbr = options?.abbr ?? false;
    const context = options?.context ?? false;

    const source = this.faker.definitions.date.weekday;
    let type: keyof DateEntryDefinition;
    if (abbr) {
      if (context && typeof source['abbr_context'] !== 'undefined') {
        type = 'abbr_context';
      } else {
        type = 'abbr';
      }
    } else if (context && typeof source['wide_context'] !== 'undefined') {
      type = 'wide_context';
    } else {
      type = 'wide';
    }

    return this.faker.random.arrayElement(source[type]);
  }
}
