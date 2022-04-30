import type { Faker } from '../..';

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
   * faker.date.zodiac() // 'Pisces'
   * faker.date.zodiac('01/01/1980') // 'Aquarius'
   */
  sign(birthdate?: string | Date): string {
    // If birthday is null, return a random sign
    if (!birthdate) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.zodiac.sign
      );
    } else {
      // Birthday is a string, parse it as a date string
      const date =
        typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

      // Get the month and day of the month
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;

      // Get the sign based on the month and day of the month

      switch (month) {
        case 1:
          return day > 20
            ? this.faker.definitions.zodiac.sign[0]
            : this.faker.definitions.zodiac.sign[11];
        case 2:
          return day > 19
            ? this.faker.definitions.zodiac.sign[1]
            : this.faker.definitions.zodiac.sign[0];
        case 3:
          return day > 20
            ? this.faker.definitions.zodiac.sign[2]
            : this.faker.definitions.zodiac.sign[1];
        case 4:
          return day > 20
            ? this.faker.definitions.zodiac.sign[3]
            : this.faker.definitions.zodiac.sign[2];
        case 5:
          return day > 20
            ? this.faker.definitions.zodiac.sign[4]
            : this.faker.definitions.zodiac.sign[3];
        case 6:
          return day > 21
            ? this.faker.definitions.zodiac.sign[5]
            : this.faker.definitions.zodiac.sign[4];
        case 7:
          return day > 22
            ? this.faker.definitions.zodiac.sign[6]
            : this.faker.definitions.zodiac.sign[5];
        case 8:
          return day > 22
            ? this.faker.definitions.zodiac.sign[7]
            : this.faker.definitions.zodiac.sign[6];
        case 9:
          return day > 22
            ? this.faker.definitions.zodiac.sign[8]
            : this.faker.definitions.zodiac.sign[7];
        case 10:
          return day > 22
            ? this.faker.definitions.zodiac.sign[9]
            : this.faker.definitions.zodiac.sign[8];
        case 11:
          return day > 21
            ? this.faker.definitions.zodiac.sign[10]
            : this.faker.definitions.zodiac.sign[9];
        case 12:
          return day > 21
            ? this.faker.definitions.zodiac.sign[11]
            : this.faker.definitions.zodiac.sign[10];
        default:
          throw new Error(`Invalid date: ${date.toLocaleDateString()}`);
      }
    }
  }
}
