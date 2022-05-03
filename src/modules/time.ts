import type { LiteralUnion } from './faker';
import { deprecated } from './internal/deprecated';

/**
 * Module to generate time of dates in various formats.
 *
 * @deprecated You should stop using this module, as it will be removed in the future.
 */
export class Time {
  /**
   * Returns recent time.
   *
   * @param format The format to use.
   *
   * - `'abbr'` Return a string with only the time. `Date.toLocaleTimeString`.
   * - `'date'` Return a date instance.
   * - `'wide'` Return a string with a long time. `Date.toTimeString()`.
   * - `'unix'` Returns a unix timestamp.
   *
   * Defaults to `'unix'`.
   *
   * @example
   * faker.time.recent() // 1643067231856
   * faker.time.recent('abbr') // '12:34:07 AM'
   * faker.time.recent('date') // 2022-03-01T20:35:47.402Z
   * faker.time.recent('wide') // '00:34:11 GMT+0100 (Central European Standard Time)'
   * faker.time.recent('unix') // 1643067231856
   *
   * @deprecated You should stop using this function, as it will be removed in the future. Use the native `new Date()` with one of the wanted functions directly.
   */
  recent(
    format: LiteralUnion<'abbr' | 'date' | 'wide' | 'unix'> = 'unix'
  ): string | number | Date {
    deprecated({
      deprecated: 'faker.time.recent()',
      proposed: 'native `new Date()` and call the function you want on it',
      since: 'v6.1.0',
      until: 'v7.0.0',
    });

    let date: string | number | Date = new Date();

    switch (format) {
      case 'abbr':
        date = date.toLocaleTimeString();
        break;
      case 'wide':
        date = date.toTimeString();
        break;
      case 'unix':
        date = date.getTime();
        break;
    }

    return date;
  }
}
