import type { Faker } from '../..';
import type { DateEntryDefinition } from '../../definitions';
import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';

/**
 * Converts date passed as a string, number or Date to a Date object.
 * If nothing or a non parsable value is passed, then it will take the value from the given fallback.
 *
 * @param date The date to convert.
 * @param fallback The fallback date to use if the passed date is not valid.
 */
function toDate(
  date: string | Date | number | undefined,
  fallback: () => Date
): Date {
  date = new Date(date);
  if (isNaN(date.valueOf())) {
    date = fallback();
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
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the past. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.recent()
   *
   * @example
   * faker.date.past() // '2021-12-03T05:40:44.408Z'
   * faker.date.past({ years: 10 }) // '2017-10-25T21:34:19.488Z'
   * faker.date.past({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
   *
   * @since 8.0.0
   */
  past(options?: {
    /**
     * The range of years the date may be in the past.
     *
     * @default 1
     */
    years?: number;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Generates a random date in the past.
   *
   * @param years The range of years the date may be in the past. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.recent()
   *
   * @example
   * faker.date.past() // '2021-12-03T05:40:44.408Z'
   * faker.date.past(10) // '2017-10-25T21:34:19.488Z'
   * faker.date.past(10, '2020-01-01T00:00:00.000Z') // '2017-08-18T02:59:12.350Z'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.date.past({ years, refDate })` instead.
   */
  past(years?: number, refDate?: string | Date | number): Date;
  /**
   * Generates a random date in the past.
   *
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the past. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   * @param legacyRefDate Deprecated, use `options.refDate` instead.
   *
   * @see faker.date.recent()
   *
   * @example
   * faker.date.past() // '2021-12-03T05:40:44.408Z'
   * faker.date.past({ years: 10 }) // '2017-10-25T21:34:19.488Z'
   * faker.date.past({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
   *
   * @since 8.0.0
   */
  past(
    options?:
      | number
      | {
          /**
           * The range of years the date may be in the past.
           *
           * @default 1
           */
          years?: number;
          /**
           * The date to use as reference point for the newly generated date.
           *
           * @default faker.defaultRefDate()
           */
          refDate?: string | Date | number;
        },
    legacyRefDate?: string | Date | number
  ): Date;
  past(
    options:
      | number
      | {
          years?: number;
          refDate?: string | Date | number;
        } = {},
    legacyRefDate?: string | Date | number
  ): Date {
    if (typeof options === 'number') {
      deprecated({
        deprecated: 'faker.date.past(years, refDate)',
        proposed: 'faker.date.past({ years, refDate })',
        since: '8.0',
        until: '9.0',
      });
      options = { years: options };
    }

    const { years = 1, refDate = legacyRefDate } = options;

    if (years <= 0) {
      throw new FakerError('Years must be greater than 0.');
    }

    const date = toDate(refDate, this.faker.defaultRefDate);
    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000,
    };

    let past = date.getTime();
    past -= this.faker.number.int(range); // some time from now to N years ago, in milliseconds
    date.setTime(past);

    return date;
  }

  /**
   * Generates a random date in the future.
   *
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the future. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.soon()
   *
   * @example
   * faker.date.future() // '2022-11-19T05:52:49.100Z'
   * faker.date.future({ years: 10 }) // '2030-11-23T09:38:28.710Z'
   * faker.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
   *
   * @since 8.0.0
   */
  future(options?: {
    /**
     * The range of years the date may be in the future.
     *
     * @default 1
     */
    years?: number;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Generates a random date in the future.
   *
   * @param years The range of years the date may be in the future. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.soon()
   *
   * @example
   * faker.date.future() // '2022-11-19T05:52:49.100Z'
   * faker.date.future(10) // '2030-11-23T09:38:28.710Z'
   * faker.date.future(10, '2020-01-01T00:00:00.000Z') // '2020-12-13T22:45:10.252Z'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.date.future({ years, refDate })` instead.
   */
  future(years?: number, refDate?: string | Date | number): Date;
  /**
   * Generates a random date in the future.
   *
   * @param options The optional options object.
   * @param options.years The range of years the date may be in the future. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   * @param legacyRefDate Deprecated, use `options.refDate` instead.
   *
   * @see faker.date.soon()
   *
   * @example
   * faker.date.future() // '2022-11-19T05:52:49.100Z'
   * faker.date.future({ years: 10 }) // '2030-11-23T09:38:28.710Z'
   * faker.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
   *
   * @since 8.0.0
   */
  future(
    options?:
      | number
      | {
          /**
           * The range of years the date may be in the future.
           *
           * @default 1
           */
          years?: number;
          /**
           * The date to use as reference point for the newly generated date.
           *
           * @default faker.defaultRefDate()
           */
          refDate?: string | Date | number;
        },
    legacyRefDate?: string | Date | number
  ): Date;
  future(
    options:
      | number
      | {
          years?: number;
          refDate?: string | Date | number;
        } = {},
    legacyRefDate?: string | Date | number
  ): Date {
    if (typeof options === 'number') {
      deprecated({
        deprecated: 'faker.date.future(years, refDate)',
        proposed: 'faker.date.future({ years, refDate })',
        since: '8.0',
        until: '9.0',
      });
      options = { years: options };
    }

    const { years = 1, refDate = legacyRefDate } = options;

    if (years <= 0) {
      throw new FakerError('Years must be greater than 0.');
    }

    const date = toDate(refDate, this.faker.defaultRefDate);
    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.number.int(range); // some time from now to N years later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Generates a random date between the given boundaries.
   *
   * @param options The optional options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
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
  }): Date;
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
   *
   * @deprecated Use `faker.date.between({ from, to })` instead.
   */
  between(from: string | Date | number, to: string | Date | number): Date;
  /**
   * Generates a random date between the given boundaries.
   *
   * @param options The optional options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
   * @param legacyTo Deprecated, use `options.to` instead.
   *
   * @example
   * faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
   *
   * @since 8.0.0
   */
  between(
    options:
      | string
      | Date
      | number
      | {
          /**
           * The early date boundary.
           */
          from: string | Date | number;
          /**
           * The late date boundary.
           */
          to: string | Date | number;
        },
    legacyTo?: string | Date | number
  ): Date;
  between(
    options:
      | string
      | Date
      | number
      | {
          from: string | Date | number;
          to: string | Date | number;
        },
    legacyTo?: string | Date | number
  ): Date {
    if (typeof options !== 'object' || options instanceof Date) {
      deprecated({
        deprecated: 'faker.date.between(from, to)',
        proposed: 'faker.date.between({ from, to })',
        since: '8.0',
        until: '9.0',
      });
      options = { from: options, to: legacyTo };
    }

    const { from, to } = options;

    const fromMs = toDate(from, this.faker.defaultRefDate).getTime();
    const toMs = toDate(to, this.faker.defaultRefDate).getTime();
    const dateOffset = this.faker.number.int(toMs - fromMs);

    return new Date(fromMs + dateOffset);
  }

  /**
   * Generates random dates between the given boundaries.
   *
   * @param options The optional options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
   * @param options.count The number of dates to generate. Defaults to `3`.
   *
   * @example
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })
   * // [
   * //   2022-07-02T06:00:00.000Z,
   * //   2024-12-31T12:00:00.000Z,
   * //   2027-07-02T18:00:00.000Z
   * // ]
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
   * // [ 2023-05-02T16:00:00.000Z, 2026-09-01T08:00:00.000Z ]
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
    count?:
      | number
      | {
          /**
           * The minimum number of dates to generate.
           */
          min: number;
          /**
           * The maximum number of dates to generate.
           */
          max: number;
        };
  }): Date[];
  /**
   * Generates random dates between the given boundaries.
   *
   * @param from The early date boundary.
   * @param to The late date boundary.
   * @param count The number of dates to generate. Defaults to `3`.
   * @param count.min The minimum number of dates to generate.
   * @param count.max The maximum number of dates to generate.
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
   *
   * @deprecated Use `faker.date.betweens({ from, to, count })` instead.
   */
  betweens(
    from: string | Date | number,
    to: string | Date | number,
    count?: number
  ): Date[];
  /**
   * Generates random dates between the given boundaries.
   *
   * @param options The optional options object.
   * @param options.from The early date boundary.
   * @param options.to The late date boundary.
   * @param options.count The number of dates to generate. Defaults to `3`.
   * @param legacyTo Deprecated, use `options.to` instead.
   * @param legacyCount Deprecated, use `options.count` instead.
   *
   * @example
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })
   * // [
   * //   2022-07-02T06:00:00.000Z,
   * //   2024-12-31T12:00:00.000Z,
   * //   2027-07-02T18:00:00.000Z
   * // ]
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
   * // [ 2023-05-02T16:00:00.000Z, 2026-09-01T08:00:00.000Z ]
   * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: { min: 2, max: 5 }})
   * // [
   * //   2021-12-19T06:35:40.191Z,
   * //   2022-09-10T08:03:51.351Z,
   * //   2023-04-19T11:41:17.501Z
   * // ]
   *
   * @since 8.0.0
   */
  betweens(
    options:
      | string
      | Date
      | number
      | {
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
          count?:
            | number
            | {
                /**
                 * The minimum number of dates to generate.
                 */
                min: number;
                /**
                 * The maximum number of dates to generate.
                 */
                max: number;
              };
        },
    legacyTo?: string | Date | number,
    legacyCount?: number
  ): Date[];
  betweens(
    options:
      | string
      | Date
      | number
      | {
          from: string | Date | number;
          to: string | Date | number;
          count?: number | { min: number; max: number };
        },
    legacyTo?: string | Date | number,
    legacyCount: number = 3
  ): Date[] {
    if (typeof options !== 'object' || options instanceof Date) {
      deprecated({
        deprecated: 'faker.date.betweens(from, to, count)',
        proposed: 'faker.date.betweens({ from, to, count })',
        since: '8.0',
        until: '9.0',
      });
      options = { from: options, to: legacyTo, count: legacyCount };
    }

    const { from, to, count = 3 } = options;

    return this.faker.helpers
      .multiple(() => this.between({ from, to }), { count })
      .sort((a, b) => a.getTime() - b.getTime());
  }

  /**
   * Generates a random date in the recent past.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the past. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.past()
   *
   * @example
   * faker.date.recent() // '2022-02-04T02:09:35.077Z'
   * faker.date.recent({ days: 10 }) // '2022-01-29T06:12:12.829Z'
   * faker.date.recent({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2019-12-27T18:11:19.117Z'
   *
   * @since 8.0.0
   */
  recent(options?: {
    /**
     * The range of days the date may be in the past.
     *
     * @default 1
     */
    days?: number;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Generates a random date in the recent past.
   *
   * @param days The range of days the date may be in the past. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.past()
   *
   * @example
   * faker.date.recent() // '2022-02-04T02:09:35.077Z'
   * faker.date.recent(10) // '2022-01-29T06:12:12.829Z'
   * faker.date.recent(10, '2020-01-01T00:00:00.000Z') // '2019-12-27T18:11:19.117Z'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.date.recent({ days, refDate })` instead.
   */
  recent(days?: number, refDate?: string | Date | number): Date;
  /**
   * Generates a random date in the recent past.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the past. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   * @param legacyRefDate Deprecated, use `options.refDate` instead.
   *
   * @see faker.date.past()
   *
   * @example
   * faker.date.recent() // '2022-02-04T02:09:35.077Z'
   * faker.date.recent({ days: 10 }) // '2022-01-29T06:12:12.829Z'
   * faker.date.recent({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2019-12-27T18:11:19.117Z'
   *
   * @since 8.0.0
   */
  recent(
    options?:
      | number
      | {
          /**
           * The range of days the date may be in the past.
           *
           * @default 1
           */
          days?: number;
          /**
           * The date to use as reference point for the newly generated date.
           *
           * @default faker.defaultRefDate()
           */
          refDate?: string | Date | number;
        },
    legacyRefDate?: string | Date | number
  ): Date;
  recent(
    options: number | { days?: number; refDate?: string | Date | number } = {},
    legacyRefDate?: string | Date | number
  ): Date {
    if (typeof options === 'number') {
      deprecated({
        deprecated: 'faker.date.recent(days, refDate)',
        proposed: 'faker.date.recent({ days, refDate })',
        since: '8.0',
        until: '9.0',
      });
      options = { days: options };
    }

    const { days = 1, refDate = legacyRefDate } = options;

    if (days <= 0) {
      throw new FakerError('Days must be greater than 0.');
    }

    const date = toDate(refDate, this.faker.defaultRefDate);
    const range = {
      min: 1000,
      max: days * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future -= this.faker.number.int(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Generates a random date in the near future.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the future. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.future()
   *
   * @example
   * faker.date.soon() // '2022-02-05T09:55:39.216Z'
   * faker.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
   * faker.date.soon({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-01-01T02:40:44.990Z'
   *
   * @since 8.0.0
   */
  soon(options?: {
    /**
     * The range of days the date may be in the future.
     *
     * @default 1
     */
    days?: number;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default faker.defaultRefDate()
     */
    refDate?: string | Date | number;
  }): Date;
  /**
   * Generates a random date in the near future.
   *
   * @param days The range of days the date may be in the future. Defaults to `1`.
   * @param refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   *
   * @see faker.date.future()
   *
   * @example
   * faker.date.soon() // '2022-02-05T09:55:39.216Z'
   * faker.date.soon(10) // '2022-02-11T05:14:39.138Z'
   * faker.date.soon(10, '2020-01-01T00:00:00.000Z') // '2020-01-01T02:40:44.990Z'
   *
   * @since 5.0.0
   *
   * @deprecated Use `faker.date.soon({ days, refDate })` instead.
   */
  soon(days?: number, refDate?: string | Date | number): Date;
  /**
   * Generates a random date in the near future.
   *
   * @param options The optional options object.
   * @param options.days The range of days the date may be in the future. Defaults to `1`.
   * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
   * @param legacyRefDate Deprecated, use `options.refDate` instead.
   *
   * @see faker.date.future()
   *
   * @example
   * faker.date.soon() // '2022-02-05T09:55:39.216Z'
   * faker.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
   * faker.date.soon({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-01-01T02:40:44.990Z'
   *
   * @since 8.0.0
   */
  soon(
    options?:
      | number
      | {
          /**
           * The range of days the date may be in the future.
           *
           * @default 1
           */
          days?: number;
          /**
           * The date to use as reference point for the newly generated date.
           *
           * @default faker.defaultRefDate()
           */
          refDate?: string | Date | number;
        },
    legacyRefDate?: string | Date | number
  ): Date;
  soon(
    options: number | { days?: number; refDate?: string | Date | number } = {},
    legacyRefDate?: string | Date | number
  ): Date {
    if (typeof options === 'number') {
      deprecated({
        deprecated: 'faker.date.soon(days, refDate)',
        proposed: 'faker.date.soon({ days, refDate })',
        since: '8.0',
        until: '9.0',
      });
      options = { days: options };
    }

    const { days = 1, refDate = legacyRefDate } = options;

    if (days <= 0) {
      throw new FakerError('Days must be greater than 0.');
    }

    const date = toDate(refDate, this.faker.defaultRefDate);
    const range = {
      min: 1000,
      max: days * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.number.int(range); // some time from now to N days later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * Returns a random name of a month.
   *
   * @param options The optional options to use.
   * @param options.abbr Whether to return an abbreviation. Defaults to `false`.
   * @param options.context Whether to return the name of a month in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`. Defaults to `false`.
   *
   * @example
   * faker.date.month() // 'October'
   * faker.date.month({ abbr: true }) // 'Feb'
   * faker.date.month({ context: true }) // 'June'
   * faker.date.month({ abbr: true, context: true }) // 'Sep'
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
      abbr?: boolean;
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
    const { abbr = false, context = false } = options;

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
   * @param options.context Whether to return the day of the week in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`. Defaults to `false`.
   *
   * @example
   * faker.date.weekday() // 'Monday'
   * faker.date.weekday({ abbr: true }) // 'Thu'
   * faker.date.weekday({ context: true }) // 'Thursday'
   * faker.date.weekday({ abbr: true, context: true }) // 'Fri'
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
      abbr?: boolean;
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
    const { abbr = false, context = false } = options;

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
      /**
       * The minimum age or year to generate a birthdate.
       *
       * @default 18
       */
      min?: number;
      /**
       * The maximum age or year to generate a birthdate.
       *
       * @default 80
       */
      max?: number;
      /**
       * The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
       *
       * There are two modes available `'age'` and `'year'`:
       * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
       * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
       *
       * @default 'year'
       */
      mode?: 'age' | 'year';
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): Date {
    const mode = options.mode === 'age' ? 'age' : 'year';
    const refDate = toDate(options.refDate, this.faker.defaultRefDate);
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

    return new Date(this.faker.number.int({ min, max }));
  }
}
