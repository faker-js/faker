import type { LiteralUnion } from './faker';

/**
 * Module to generate time of dates in various formats.
 *
 * @deprecated Just use the native Date object.
 */
export class Time {
  /**
   * Returns recent time.
   *
   * @param format The format to use. Defaults to `'unix'`.
   *
   * - `'abbr'` Return a string with only the time. `Date.toLocaleTimeString`.
   * - `'date'` Return a date instance.
   * - `'wide'` Return a string with a long time. `Date.toTimeString()`.
   * - `'unix'` Returns a unix timestamp.
   *
   * @example
   * faker.time.recent() // 1643067231856
   * faker.time.recent('abbr') // '12:34:07 AM'
   * faker.time.recent('date') // 2022-03-01T20:35:47.402Z
   * faker.time.recent('wide') // '00:34:11 GMT+0100 (Central European Standard Time)'
   * faker.time.recent('unix') // 1643067231856
   *
   * @deprecated Just use `new Date()` and call the function you want on it.
   */
  recent(
    format: LiteralUnion<'abbr' | 'date' | 'wide' | 'unix'> = 'unix'
  ): string | number | Date {
    console.warn(
      `Deprecation Warning: faker.time.recent() is deprecated. Just use \`new Date()\` and call the function you want on it.
  abbr => toLocaleTimeString()
  wide => toTimeString()
  unix => getTime()
`
    );

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
