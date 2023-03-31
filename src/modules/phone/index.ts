import type { Faker } from '../..';

/**
 * Module to generate phone-related data.
 *
 * ### Overview
 *
 * For a phone number, use [`number()`](https://next.fakerjs.dev/api/phone.html#number). Many locales provide country-specific formats.
 */
export class PhoneModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      PhoneModule.prototype
    ) as Array<keyof PhoneModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number. Defaults to a random phone number format.
   *
   * @example
   * faker.phone.number() // '961-770-7727'
   * faker.phone.number('501-###-###') // '501-039-841'
   * faker.phone.number('+48 91 ### ## ##') // '+48 91 463 61 70'
   *
   * @since 7.3.0
   */
  number(format?: string): string {
    format =
      format ??
      this.faker.helpers.arrayElement(
        this.faker.definitions.phone_number.formats
      );
    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  /**
   * Generates IMEI number.
   *
   * @example
   * faker.phone.imei() // '13-850175-913761-7'
   *
   * @since 6.2.0
   */
  imei(): string {
    return this.faker.helpers.replaceCreditCardSymbols(
      '##-######-######-L',
      '#'
    );
  }
}
