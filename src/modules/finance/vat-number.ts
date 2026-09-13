import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersFromRegExp } from '../helpers/from-reg-exp';

/**
 * The VAT identification number patterns of the EU member states, keyed by
 * ISO 3166-1 alpha-2 code, plus `EL`: the prefix Greek numbers carry in place
 * of `GR`.
 *
 * Each pattern is written for `faker.helpers.helpersFromRegExp()`.
 * Currently, all values are generated randomly, so parts with intent such as check digits will likely produce invalid values.
 *
 * @internal
 */
export const vatNumberFormats = {
  /** UID-Nummer. */
  AT: 'ATU[0-9]{8}',
  /**
   * BTW-nummer. Begins with 0 or 1: the 2005 ten-digit form zero-padded the
   * older nine-digit numbers, and the 1 series was opened later, once the 0
   * series neared exhaustion.
   */
  BE: 'BE[01][0-9]{9}',
  /** DDS nomer. Nine digits for legal entities, ten for individuals. */
  BG: 'BG[0-9]{9,10}',
  /**
   * FPA. Numbers begin 0, 1, 3, 4, 5 or 9 under the legacy categories, or 6
   * under the format introduced in March 2023; 2, 7 and 8 are not issued.
   */
  CY: 'CY[0134569][0-9]{7}[A-Z]',
  /** DIC. */
  CZ: 'CZ[0-9]{8,10}',
  /** Umsatzsteuer-Identifikationsnummer. */
  DE: 'DE[0-9]{9}',
  /** CVR-nummer. */
  DK: 'DK[0-9]{8}',
  /** KMKR number. */
  EE: 'EE[0-9]{9}',
  /** AFM. */
  EL: 'EL[0-9]{9}',
  /**
   * NIF/CIF for entities. The leading character encodes the legal form, which
   * constrains the control character: A, B, E and H always take a digit,
   * C, D, F, G, J, U and V may take either, and foreign entities, public
   * bodies, local corporations and religious congregations (N, P, Q, R, S, W)
   * always take a letter. The two branches are separate patterns because one
   * character class would pair the positions freely and emit combinations that
   * are never issued; the may-take-either letters are generated with a digit,
   * which under-generates rather than over-generates. The natural-person forms
   * are out of scope.
   */
  ES: ['ES[ABCDEFGHJUV][0-9]{7}[0-9]', 'ES[NPQRSW][0-9]{7}[A-J]'],
  /** ALV-numero. */
  FI: 'FI[0-9]{8}',
  /**
   * Numero de TVA intracommunautaire: a two-character key followed by the
   * nine-digit SIREN. The letters I and O are not used in the key.
   */
  FR: 'FR[0-9ABCDEFGHJKLMNPQRSTUVWXYZ]{2}[0-9]{9}',
  /** AFM. Same as `EL`. */
  GR: 'EL[0-9]{9}',
  /** PDV ID. */
  HR: 'HR[0-9]{11}',
  /** Kozossegi adoszam. */
  HU: 'HU[0-9]{8}',
  /**
   * VAT number: seven digits and a check letter, optionally followed by a
   * `W` — the legacy marker for a married woman registered on her husband's
   * number. The 2013 form, whose second letter runs A to I rather than being
   * `W`, is not modelled, nor is the older form that carries a symbol.
   */
  IE: 'IE[0-9]{7}[A-W]W{0,1}',
  /** Partita IVA. */
  IT: 'IT[0-9]{11}',
  /**
   * PVM kodas. Nine digits for legal entities, where the eighth is always 1
   * and the ninth is a check digit. The twelve-digit form for temporarily
   * registered taxpayers is rare and not modelled — note it could not simply
   * widen this pattern to `[0-9]{9,12}`, since the lengths in between are
   * never issued.
   */
  LT: 'LT[0-9]{7}1[0-9]',
  /** Numero de TVA. */
  LU: 'LU[0-9]{8}',
  /** PVN numurs. */
  LV: 'LV[0-9]{11}',
  /** VAT number. */
  MT: 'MT[0-9]{8}',
  /**
   * Btw-identificatienummer. The two digits after the `B` are a company index
   * running from 01 to 99, so `B00` is never issued — which takes two patterns
   * to express, since a plain digit pair would include it.
   */
  NL: ['NL[0-9]{9}B0[1-9]', 'NL[0-9]{9}B[1-9][0-9]'],
  /** NIP. */
  PL: 'PL[0-9]{10}',
  /** Numero de identificacao fiscal. No taxpayer range begins with zero. */
  PT: 'PT[1-9][0-9]{8}',
  /** Cod de identificare fiscala. Between 2 and 10 digits, never leading zero. */
  RO: 'RO[1-9][0-9]{1,9}',
  /**
   * Momsnummer: the ten-digit organisationsnummer followed by a two-digit
   * establishment number. Only `01` is generated — it is the value for all but
   * a handful of multi-establishment registrations.
   */
  SE: 'SE[0-9]{10}01',
  /** ID za DDV. Eight digits, never a leading zero. */
  SI: 'SI[1-9][0-9]{7}',
  /** IC DPH. */
  SK: 'SK[0-9]{10}',
} as const satisfies Record<string, string | ReadonlyArray<string>>;

/**
 * The codes to draw from, minus `GR`, which would give Greece double weight.
 *
 * @internal
 */
export const vatNumberCountryCodes = Object.keys(vatNumberFormats).filter(
  (code) => code !== 'GR'
) as VatNumberCountryCode[];

/**
 * The country codes for which a VAT identification number can be generated.
 */
export type VatNumberCountryCode = keyof typeof vatNumberFormats;

/**
 * Generates a random VAT identification number for one of the EU member states.
 *
 * The supported country codes are the EU member states, using the two-letter code each
 * country's numbers carry:
 * `AT`, `BE`, `BG`, `CY`, `CZ`, `DE`, `DK`, `EE`, `EL` (or `GR`), `ES`, `FI`, `FR`, `HR`, `HU`,
 * `IE`, `IT`, `LT`, `LU`, `LV`, `MT`, `NL`, `PL`, `PT`, `RO`, `SE`, `SI` and `SK`.
 *
 * @remark Please note that this currently only generates the structure of the respective country's VAT identification.
 * But it will return random values for digits with intent such as check digits, so the result is likely to be invalid.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.countryCode The two-letter code of the country you want a VAT number for.
 * Greece may be given as either `GR` or `EL`.
 * Defaults to a random supported country.
 *
 * @throws {FakerError} Will throw an error if the passed country code is not supported.
 *
 * @example
 * financeVatNumber(fakerCore) // 'SK4318759382'
 * financeVatNumber(fakerCore, { countryCode: 'DE' }) // 'DE644073457'
 * financeVatNumber(fakerCore, { countryCode: 'NL' }) // 'NL840351580B96'
 * financeVatNumber(fakerCore, { countryCode: 'GR' }) // 'EL892156043'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeVatNumber(
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
  const {
    countryCode = helpersArrayElement(fakerCore, vatNumberCountryCodes),
  } = options;

  const pattern = vatNumberFormats[countryCode];

  if (pattern == null) {
    throw new FakerError(`Country code ${countryCode} not supported.`);
  }

  return helpersFromRegExp(
    fakerCore,
    typeof pattern === 'string'
      ? pattern
      : helpersArrayElement(fakerCore, pattern)
  );
}
