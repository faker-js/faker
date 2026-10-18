import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersObjectValue } from '../helpers/object-value';
import { fakeHelpersReplaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param issuer The name of the issuer (case-insensitive) or the format used to generate one.
 *
 * @example
 * fakeFinanceCreditCardNumber(fakerCore) // '4427163488662'
 * fakeFinanceCreditCardNumber(fakerCore, 'visa') // '4882664999007'
 * fakeFinanceCreditCardNumber(fakerCore, '63[7-9]#-####-####-###L') // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardNumber(
  fakerCore: FakerCore,
  issuer?: string
): string;
/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
 *
 * @example
 * fakeFinanceCreditCardNumber(fakerCore) // '4427163488662'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardNumber(
  fakerCore: FakerCore,
  options?: {
    /**
     * The name of the issuer (case-insensitive) or the format used to generate one.
     *
     * @default ''
     */
    issuer?: string;
  }
): string;
/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object, the issuer or a custom format.
 * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
 *
 * @example
 * fakeFinanceCreditCardNumber(fakerCore) // '4427163488662'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * fakeFinanceCreditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardNumber(
  fakerCore: FakerCore,
  options?:
    | string
    | {
        /**
         * The name of the issuer (case-insensitive) or the format used to generate one.
         *
         * @default ''
         */
        issuer?: string;
      }
): string;
/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object, the issuer or a custom format.
 * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one.
 *
 * @example
 * fakeFinanceCreditCardNumber(fakerCore) // '4427163488662'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * fakeFinanceCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * fakeFinanceCreditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceCreditCardNumber(
  fakerCore: FakerCore,
  options:
    | string
    | {
        /**
         * The name of the issuer (case-insensitive) or the format used to generate one.
         *
         * @default ''
         */
        issuer?: string;
      } = {}
): string {
  if (typeof options === 'string') {
    options = { issuer: options };
  }

  const { issuer = '' } = options;

  let format: string;
  const localeFormat = fakerCore.locale.finance.credit_card;
  const normalizedIssuer = issuer.toLowerCase();
  if (normalizedIssuer in localeFormat) {
    format = fakeHelpersArrayElement(fakerCore, localeFormat[normalizedIssuer]);
  } else if (issuer.includes('#')) {
    // The user chose an optional scheme
    format = issuer;
  } else {
    // Choose a random issuer
    // Credit cards are in an object structure
    const formats = fakeHelpersObjectValue(fakerCore, localeFormat); // There could be multiple formats
    format = fakeHelpersArrayElement(fakerCore, formats);
  }

  format = format.replaceAll('/', '');
  return fakeHelpersReplaceCreditCardSymbols(fakerCore, format);
}
