/**
 * Module to generate time of dates in various formats.
 */
export class Time {
  /**
   * Returns recent time.
   *
   * @param format 'abbr' || 'wide' || 'unix' (default)
   *
   * @example
   * faker.time.recent() // 1643067231856
   * faker.time.recent('abbr') // '12:34:07 AM'
   * faker.time.recent('wide') // '00:34:11 GMT+0100 (Central European Standard Time)'
   * faker.time.recent('unix') // 1643067231856
   */
  recent(format: 'abbr' | 'wide' | 'unix' = 'unix'): string | number {
    // TODO @Shinigami92 2022-01-11: This is not non-deterministic
    // https://github.com/faker-js/faker/pull/74/files#r781579842
    let date: string | number | Date = new Date();

    const formats = ['abbr','wide','unix'];
    
    if (!formats.includes(format)) {
      throw new Error("Unexpected value " + format + " is given");
    }

    switch (format) {
      case 'abbr':
        date = date.toLocaleTimeString();
        break;
      case 'wide':
        date = date.toTimeString();
        break;
      case 'unix':
      default:
        date = date.getTime();
        break;
    }

    return date;
  }
}
