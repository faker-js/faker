import type { Faker } from '.';

/**
 * Module to generate phone numbers.
 */
export class Phone {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Phone.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number. Defaults to `faker.phone.phoneFormats()`.
   *
   * @example
   * faker.phone.number() // '961-770-7727'
   * faker.phone.number('501-###-###') // '501-039-841'
   * faker.phone.number('+48 91 ### ## ##') // '+48 91 463 61 70'
   */
  
  number(format?: string): string {
    return this.faker.helpers.replaceSymbolWithNumber(
      format || this.formats()
    );
  }

  /**
   * Returns phone number in a format of the given index from `faker.definitions.phone_number.formats`.
   *
   * @param phoneFormatsArrayIndex Index in the `faker.definitions.phone_number.formats` array. Defaults to `0`.
   *
   * @example
   * faker.phone.phoneNumberFormat() // '943-627-0355'
   * faker.phone.phoneNumberFormat(3) // '282.652.3201'
   */
  // FIXME @Shinigami 2022-01-14: this is strange passing in an array index
  // TODO @pkuczynski 2022-02-01: discuss removing this method as it tightly couples with localisation
  phoneNumberFormat(phoneFormatsArrayIndex = 0): string {
    return this.faker.helpers.replaceSymbolWithNumber(
      this.faker.definitions.phone_number.formats[phoneFormatsArrayIndex]
    );
  }

  /**
   * Returns a random phone number format.
   *
   * @example
   * faker.phone.formats() // '!##.!##.####'
   */
   formats(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.phone_number.formats
    );
  }
}
