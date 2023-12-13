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
  number(): string;

  /**
   * Generates a random phone number.
   *
   * @param options Options object
   * @param options.style Style of the phone number. Defaults to 'human'
   *
   * @see faker.string.numeric(): For generating a random string of numbers.
   * @see faker.helpers.fromRegExp(): For generating a phone number matching a regular expression.
   *
   * @example
   * faker.phone.number() // '961-770-7727'
   *
   * @since 7.3.0
   */
  number(options: { style: 'human' | 'national' | 'raw' }): string;
  number(options?: {
    /**
     * Style of the generated phone number:
     * - `'human'`: (default) A human-input phone number, e.g. 555-770-7727 or 555.770.7727 x1234
     * - `'national'`: A phone number in a standardized national format, e.g. (555) 123-4567.
     * - `'raw'`: A phone number in the raw format, e.g. +15551234567
     *
     * @default 'human'
     */
    style: 'human' | 'national' | 'raw';
  }): string {
    const { style } = options ?? { style: 'human' };
    const styleDefinitions = {
      human: this.faker.definitions.phone_number.human,
      national: this.faker.definitions.phone_number.national,
      raw: this.faker.definitions.phone_number.raw,
    };

    const definitions = styleDefinitions[style] || styleDefinitions.human;
    const format = this.faker.helpers.arrayElement(definitions);
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
