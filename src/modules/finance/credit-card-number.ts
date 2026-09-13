import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersObjectValue } from '../helpers/object-value';
import { helpersReplaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param issuer The name of the issuer (case-insensitive) or the format used to generate one.
 *
 * @example
 * financeCreditCardNumber(fakerCore) // '4427163488662'
 * financeCreditCardNumber(fakerCore, 'visa') // '4882664999007'
 * financeCreditCardNumber(fakerCore, '63[7-9]#-####-####-###L') // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardNumber(fakerCore: FakerCore, issuer?: string): string;
/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
 *
 * @example
 * financeCreditCardNumber(fakerCore) // '4427163488662'
 * financeCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * financeCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardNumber(
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
 * financeCreditCardNumber(fakerCore) // '4427163488662'
 * financeCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * financeCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * financeCreditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardNumber(
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
 * financeCreditCardNumber(fakerCore) // '4427163488662'
 * financeCreditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * financeCreditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * financeCreditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeCreditCardNumber(
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
    format = helpersArrayElement(fakerCore, localeFormat[normalizedIssuer]);
  } else if (issuer.includes('#')) {
    // The user chose an optional scheme
    format = issuer;
  } else {
    // Choose a random issuer
    // Credit cards are in an object structure
    const formats = helpersObjectValue(fakerCore, localeFormat); // There could be multiple formats
    format = helpersArrayElement(fakerCore, formats);
  }

  format = format.replaceAll('/', '');
  return helpersReplaceCreditCardSymbols(fakerCore, format);
}
