import type { Faker, ZodiacDefinitions } from '../..';
import { FakerError } from '../../errors/faker-error';

/**
 * Module to generate zodiac signs for birth dates.
 */
export class Zodiac {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Zodiac.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random zodiac sign.
   *
   * @param birthdate The optional birthdate of the person.
   *
   * @example
   * faker.zodiac.sign() // 'Pisces'
   * faker.zodiac.sign('01/01/1980') // 'Aquarius'
   */
  sign(birthdate?: string | number | Date): string {
    if (birthdate == null) {
      return this.faker.helpers.objectValue(this.faker.definitions.zodiac.sign);
    } else {
      const date = new Date(birthdate);

      if (isNaN(date.getTime())) {
        throw new FakerError(`Invalid birthdate: ${birthdate.toString()}`);
      }

      const month = date.getMonth() + 1;
      const day = date.getDate();

      // Get the sign based on the month and day of the month
      const sign: keyof ZodiacDefinitions['sign'] = {
        1: () => (day > 20 ? 'aquarius' : 'capricorn'),
        2: () => (day > 19 ? 'pisces' : 'aquarius'),
        3: () => (day > 20 ? 'aries' : 'pisces'),
        4: () => (day > 20 ? 'taurus' : 'aries'),
        5: () => (day > 20 ? 'gemini' : 'taurus'),
        6: () => (day > 21 ? 'cancer' : 'gemini'),
        7: () => (day > 22 ? 'leo' : 'cancer'),
        8: () => (day > 22 ? 'virgo' : 'leo'),
        9: () => (day > 22 ? 'libra' : 'virgo'),
        10: () => (day > 22 ? 'scorpio' : 'libra'),
        11: () => (day > 21 ? 'sagittarius' : 'scorpio'),
        12: () => (day > 21 ? 'capricorn' : 'sagittarius'),
      }[month]();

      return this.faker.definitions.zodiac.sign[sign];
    }
  }
}
