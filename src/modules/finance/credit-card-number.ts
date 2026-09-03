import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { objectValue } from '../helpers/object-value';
import { replaceCreditCardSymbols } from '../helpers/replace-credit-card-symbols';

/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param issuer The name of the issuer (case-insensitive) or the format used to generate one.
 *
 * @example
 * creditCardNumber(fakerCore) // '4427163488662'
 * creditCardNumber(fakerCore, 'visa') // '4882664999007'
 * creditCardNumber(fakerCore, '63[7-9]#-####-####-###L') // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardNumber(fakerCore: FakerCore, issuer?: string): string;
/**
 * Generates a random credit card number.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
 *
 * @example
 * creditCardNumber(fakerCore) // '4427163488662'
 * creditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * creditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardNumber(
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
 * creditCardNumber(fakerCore) // '4427163488662'
 * creditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * creditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * creditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardNumber(
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
 * creditCardNumber(fakerCore) // '4427163488662'
 * creditCardNumber(fakerCore, { issuer: 'visa' }) // '4882664999007'
 * creditCardNumber(fakerCore, { issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
 * creditCardNumber(fakerCore, 'visa') // '1226423499765'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function creditCardNumber(
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
    format = arrayElement(fakerCore, localeFormat[normalizedIssuer]);
  } else if (issuer.includes('#')) {
    // The user chose an optional scheme
    format = issuer;
  } else {
    // Choose a random issuer
    // Credit cards are in an object structure
    const formats = objectValue(fakerCore, localeFormat); // There could be multiple formats
    format = arrayElement(fakerCore, formats);
  }

  format = format.replaceAll('/', '');
  return replaceCreditCardSymbols(fakerCore, format);
}
