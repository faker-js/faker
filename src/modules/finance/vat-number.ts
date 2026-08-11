/**
 * The VAT identification number patterns of the EU member states, keyed by the
 * two-letter code the numbers themselves carry — the ISO 3166-1 alpha-2 code
 * everywhere except Greece, whose numbers use `EL` rather than `GR`. `GR` is
 * still accepted as input, through {@link vatNumberCountryCodeAliases}.
 *
 * Each pattern is written for `faker.helpers.fromRegExp()`. Only the structure
 * of a number is modelled: its length, the characters each position may hold,
 * and the literals a country mandates. Check digits, where a country's real
 * algorithm defines one, are filled with random data from the permitted
 * character set, so a validator that recomputes them will reject some of what
 * is generated here.
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
   * FPA. No first-digit restriction is modelled: the older category digits
   * are only loosely documented, and every number issued since the 2023
   * migration begins with 6 regardless.
   */
  CY: 'CY[0-9]{8}[A-Z]',
  /** DIC. */
  CZ: 'CZ[0-9]{8,10}',
  /** Umsatzsteuer-Identifikationsnummer. */
  DE: 'DE[0-9]{9}',
  /** CVR-nummer. */
  DK: 'DK[0-9]{8}',
  /** KMKR number. */
  EE: 'EE[0-9]{9}',
  /** AFM. Greek numbers use the `EL` prefix rather than the `GR` ISO code. */
  EL: 'EL[0-9]{9}',
  /**
   * NIF/CIF for entities. The leading character encodes the legal form, so
   * only the letters actually assigned to one are generated. The control
   * character is a digit for Spanish legal entities and a letter for foreign
   * entities, public bodies and local corporations; both are permitted here,
   * drawn independently of the leading letter, which real numbers are not.
   * The natural-person forms are out of scope.
   */
  ES: 'ES[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9ABCDEFGHIJ]',
  /** ALV-numero. */
  FI: 'FI[0-9]{8}',
  /**
   * Numero de TVA intracommunautaire: a two-character key followed by the
   * nine-digit SIREN. The letters I and O are not used in the key.
   */
  FR: 'FR[0-9ABCDEFGHJKLMNPQRSTUVWXYZ]{2}[0-9]{9}',
  /** PDV ID. */
  HR: 'HR[0-9]{11}',
  /** Kozossegi adoszam. */
  HU: 'HU[0-9]{8}',
  /**
   * VAT number: seven digits and a check letter, optionally followed by a
   * `W` — the legacy marker for a married woman registered on her husband's
   * number. The other real forms (seven digits and two letters, or six digits
   * and two symbols) are not modelled.
   */
  IE: 'IE[0-9]{7}[A-W]W{0,1}',
  /** Partita IVA. */
  IT: 'IT[0-9]{11}',
  /**
   * PVM kodas. Nine digits for legal entities, where the eighth is always 1
   * and the ninth is a check digit. The twelve-digit form for temporarily
   * registered taxpayers is not modelled; it cannot be folded in as
   * `[0-9]{9,12}`, because the intermediate lengths are never issued.
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
   * running from 01, so the `B00` this can emit is not itself issued.
   */
  NL: 'NL[0-9]{9}B[0-9]{2}',
  /** NIP. */
  PL: 'PL[0-9]{10}',
  /** Numero de identificacao fiscal. */
  PT: 'PT[0-9]{9}',
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
} as const satisfies Record<string, string>;

/**
 * ISO 3166-1 alpha-2 codes that are accepted as input but are not themselves a
 * key above, because the country's numbers carry a different prefix. Kept out
 * of {@link vatNumberFormats} so that a call without a country code draws
 * uniformly across countries rather than twice as often for Greece.
 */
export const vatNumberCountryCodeAliases = {
  GR: 'EL',
} as const satisfies Record<string, keyof typeof vatNumberFormats>;

/**
 * The country codes for which a VAT identification number can be generated.
 */
export type VatNumberCountryCode =
  | keyof typeof vatNumberFormats
  | keyof typeof vatNumberCountryCodeAliases;
