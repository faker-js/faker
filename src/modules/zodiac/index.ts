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
      return this.faker.helpers.arrayElement(
        this.faker.definitions.zodiac.sign
      );
    } else {
      const date =
        typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

      const month = date.getMonth() + 1;
      const day = date.getDate();

      // Get the sign based on the month and day of the month

      const sign = this.faker.definitions.zodiac.sign;

      switch (month) {
        case 1:
          return day > 20 ? sign[0] : sign[11];
        case 2:
          return day > 19 ? sign[1] : sign[0];
        case 3:
          return day > 20 ? sign[2] : sign[1];
        case 4:
          return day > 20 ? sign[3] : sign[2];
        case 5:
          return day > 20 ? sign[4] : sign[3];
        case 6:
          return day > 21 ? sign[5] : sign[4];
        case 7:
          return day > 22 ? sign[6] : sign[5];
        case 8:
          return day > 22 ? sign[7] : sign[6];
        case 9:
          return day > 22 ? sign[8] : sign[7];
        case 10:
          return day > 22 ? sign[9] : sign[8];
        case 11:
          return day > 21 ? sign[10] : sign[9];
        case 12:
          return day > 21 ? sign[11] : sign[10];
        default:
          throw new FakerError(`Invalid date: ${date.toDateString()}`);
      }
    }
  }
}
