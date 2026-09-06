import type { FakerCore } from '../../core';
import { legacyReplaceSymbolWithNumber } from '../helpers/_legacy-replace-symbol-with-number';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random phone number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object
 * @param options.style Style of the phone number. Defaults to `'human'`.
 *
 * @see stringNumeric(fakerCore): For generating a random string of numbers.
 * @see helpersFromRegExp(fakerCore): For generating a phone number matching a regular expression.
 *
 * @example
 * number(fakerCore) // '961-770-7727'
 * number(fakerCore, { style: 'human' }) // '555.770.7727 x1234'
 * number(fakerCore, { style: 'national' }) // '(961) 770-7727'
 * number(fakerCore, { style: 'international' }) // '+15551234567'
 * fakerEN_GB.phone.number({ style: 'mobile' }) // '07123456789'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function number(
  fakerCore: FakerCore,
  options: {
    /**
     * Style of the generated phone number:
     * - `'human'`: (default) A human-input phone number, e.g. `555-770-7727` or `555.770.7727 x1234`
     * - `'national'`: A phone number in a standardized national format, e.g. `(555) 123-4567`.
     * - `'international'`: A phone number in the E.123 international format, e.g. `+15551234567`
     * - `'mobile'`: In selected locales, provides a number used for mobile phones, e.g. `07123456789` in en_GB.
     *
     * @default 'human'
     */
    style?: 'human' | 'national' | 'international' | 'mobile';
  } = {}
): string {
  const { style = 'human' } = options;
  const formats = fakerCore.locale.phone_number.format;

  const definitions = formats[style];
  if (!definitions) {
    throw new Error(`No definitions for ${style} in this locale`);
  }

  const format = arrayElement(fakerCore, definitions);
  return legacyReplaceSymbolWithNumber(fakerCore, format);
}
