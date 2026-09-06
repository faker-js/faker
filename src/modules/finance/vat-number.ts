import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { arrayElement } from '../helpers/array-element';
import { fromRegExp } from '../helpers/from-reg-exp';
import type { VatNumberCountryCode } from './_vat-number';
import { vatNumberCountryCodes, vatNumberFormats } from './_vat-number';

/**
 * Generates a random VAT identification number for one of the EU member states.
 *
 * The supported country codes are the EU member states, using the two-letter code each
 * country's numbers carry:
 * `AT`, `BE`, `BG`, `CY`, `CZ`, `DE`, `DK`, `EE`, `EL` (or `GR`), `ES`, `FI`, `FR`, `HR`, `HU`,
 * `IE`, `IT`, `LT`, `LU`, `LV`, `MT`, `NL`, `PL`, `PT`, `RO`, `SE`, `SI` and `SK`.
 *
 * @param fakerCore The FakerCore to use.
 * @remark Please note that this currently only generates the structure of the respective country's VAT identification.
 * But it will return random values for digits with intent such as check digits, so the result is likely to be invalid.
 *
 * @param options An options object.
 * @param options.countryCode The two-letter code of the country you want a VAT number for.
 * Greece may be given as either `GR` or `EL`.
 * Defaults to a random supported country.
 *
 * @throws {FakerError} Will throw an error if the passed country code is not supported.
 *
 * @example
 * vatNumber(fakerCore) // 'SK4318759382'
 * vatNumber(fakerCore, { countryCode: 'DE' }) // 'DE644073457'
 * vatNumber(fakerCore, { countryCode: 'NL' }) // 'NL840351580B96'
 * vatNumber(fakerCore, { countryCode: 'GR' }) // 'EL892156043'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vatNumber(
  fakerCore: FakerCore,
  options: {
    /**
     * The two-letter code of the country you want a VAT number for.
     * Greece may be given as either `GR` or `EL`.
     *
     * @default helpersArrayElement(fakerCore, vatNumberCountryCodes)
     */
    countryCode?: VatNumberCountryCode;
  } = {}
): string {
  const { countryCode = arrayElement(fakerCore, vatNumberCountryCodes) } =
    options;

  const pattern = vatNumberFormats[countryCode];

  if (pattern == null) {
    throw new FakerError(`Country code ${countryCode} not supported.`);
  }

  return fromRegExp(
    fakerCore,
    typeof pattern === 'string' ? pattern : arrayElement(fakerCore, pattern)
  );
}
