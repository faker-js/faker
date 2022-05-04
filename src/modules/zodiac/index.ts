import type { Faker } from '../..';
import { FakerError } from '../..';

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
   * @param birthdate The optional birthday of the person.
   *
   * @example
   * faker.zodiac.sign() // 'Pisces'
   * faker.zodiac.sign('01/01/1980') // 'Aquarius'
   */
  sign(birthdate?: string | Date): string {
    if (birthdate == null) {
      return this.faker.helpers.objectValue(this.faker.definitions.zodiac.sign);
    } else {
      const date =
        typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

      const month = date.getMonth() + 1;
      const day = date.getDate();

      // Get the sign based on the month and day of the month

      const sign = this.faker.definitions.zodiac.sign;

      switch (month) {
        case 1:
          return day > 20 ? sign.aquarius : sign.capricorn;
        case 2:
          return day > 19 ? sign.pisces : sign.aquarius;
        case 3:
          return day > 20 ? sign.aries : sign.pisces;
        case 4:
          return day > 20 ? sign.taurus : sign.aries;
        case 5:
          return day > 20 ? sign.gemini : sign.taurus;
        case 6:
          return day > 21 ? sign.cancer : sign.gemini;
        case 7:
          return day > 22 ? sign.leo : sign.cancer;
        case 8:
          return day > 22 ? sign.virgo : sign.leo;
        case 9:
          return day > 22 ? sign.libra : sign.virgo;
        case 10:
          return day > 22 ? sign.scorpio : sign.libra;
        case 11:
          return day > 21 ? sign.sagittarius : sign.scorpio;
        case 12:
          return day > 21 ? sign.capricorn : sign.sagittarius;
        default:
          throw new FakerError(`Invalid date: ${date.toDateString()}`);
      }
    }
  }
}
