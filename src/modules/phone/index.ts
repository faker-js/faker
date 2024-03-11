import { ModuleBase } from '../../internal/module-base';
import { legacyReplaceSymbolWithNumber } from '../helpers';

/**
 * Module to generate phone-related data.
 *
 * ### Overview
 *
 * For a phone number, use [`number()`](https://fakerjs.dev/api/phone.html#number). Many locales provide country-specific formats.
 */
export class PhoneModule extends ModuleBase {
  /**
   * Generates a random phone number.
   *
   * @see faker.string.numeric(): For generating a random string of numbers.
   * @see faker.helpers.fromRegExp(): For generating a phone number matching a regular expression.
   *
   * @example
   * faker.phone.number() // '961-770-7727'
   *
   * @since 7.3.0
   */
  number(): string {
    const format = this.faker.helpers.arrayElement(
      this.faker.definitions.phone_number.formats
    );
    return legacyReplaceSymbolWithNumber(this.faker, format);
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
