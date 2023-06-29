import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate phone-related data.
 *
 * ### Overview
 *
 * For a phone number, use [`number()`](https://fakerjs.dev/api/phone.html#number). Many locales provide country-specific formats.
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
   * @example
   * faker.phone.number() // '961-770-7727'
   *
   * @since 7.3.0
   */
  number(): string;
  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number.
   *
   * @example
   * faker.phone.number('501-###-###') // '501-039-841'
   * faker.phone.number('+48 91 ### ## ##') // '+48 91 463 61 70'
   *
   * @since 7.3.0
   *
   * @deprecated Use `faker.phone.number()` without an argument instead.
   */
  number(format: string): string;
  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number. Defaults to a random phone number format.
   *
   * @example
   * faker.phone.number() // '961-770-7727'
   *
   * @since 7.3.0
   */
  number(format?: string): string;
  number(format?: string): string {
    if(format != null) {
      deprecated({
        deprecated: 'faker.phone.number(format)',
        proposed: 'faker.phone.number()',
        since: '8.1',
        until: '9.0',
      });
    }

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
