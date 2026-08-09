/**
 * The VAT identification number patterns of the EU member states, keyed by the
 * country's ISO 3166-1 alpha-2 code and including the prefix the number itself
 * carries. Greece is the one country where the two differ: its numbers are
 * prefixed `EL`, so the `GR` entry lives in {@link vatNumberAliases}.
 *
 * Each pattern is written for `faker.helpers.fromRegExp()`. Only the structure
 * of a number is modelled: its length, the characters each position may hold,
 * and the literals a country mandates. Check digits, where a country's real
 * algorithm defines one, are filled with random data from the permitted
 * character set.
 *
 * Portugal is deliberately absent: its check digit is verified by common
 * validators, so a structurally-correct-but-random Portuguese number would be
 * rejected by them. The same applies to non-EU schemes such as `CH` and `AU`.
 * Those belong to a follow-up that computes real check digits.
 */
export const vatNumberFormats = {
  /** UID-Nummer. */
  AT: 'ATU[0-9]{8}',
  /**
   * BTW-nummer. Begins with 0 or 1; the 1-prefix was added when the ten-digit
   * form replaced the older nine-digit one.
   */
  BE: 'BE[01][0-9]{9}',
  /** DDS nomer. Nine digits for legal entities, ten for individuals. */
  BG: 'BG[0-9]{9,10}',
  /**
   * FPA. No first-digit restriction is modelled: the pre-2023 categories left
   * 2, 6, 7 and 8 unused, but every number issued since the 2023 migration
   * begins with 6.
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
   * NIF/CIF. The leading character encodes the legal form, so only the letters
   * actually assigned to one are generated. The control character is a digit
   * for Spanish legal entities and a letter for foreign entities, public
   * bodies and local corporations, so both are permitted here.
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
   * second `W` for the numbers issued to certain registrations.
   */
  IE: 'IE[0-9]{7}[A-W]W{0,1}',
  /** Partita IVA. */
  IT: 'IT[0-9]{11}',
  /**
   * PVM kodas. Nine digits for legal entities, where the ninth-from-last
   * position is always 1. The twelve-digit temporary form is not modelled,
   * because no length in between is issued.
   */
  LT: 'LT[0-9]{7}1[0-9]',
  /** Numero de TVA. */
  LU: 'LU[0-9]{8}',
  /** PVN numurs. */
  LV: 'LV[0-9]{11}',
  /** VAT number. */
  MT: 'MT[0-9]{8}',
  /** Btw-identificatienummer. */
  NL: 'NL[0-9]{9}B[0-9]{2}',
  /** NIP. */
  PL: 'PL[0-9]{10}',
  /** Cod de identificare fiscala. Between 2 and 10 digits, never leading zero. */
  RO: 'RO[1-9][0-9]{1,9}',
  /** Momsnummer: ten digits followed by the fixed `01` suffix. */
  SE: 'SE[0-9]{10}01',
  /** ID za DDV. */
  SI: 'SI[1-9][0-9]{7}',
  /** IC DPH. */
  SK: 'SK[0-9]{10}',
} satisfies Record<string, string>;

/**
 * ISO 3166-1 alpha-2 codes that identify a country whose VAT numbers carry a
 * different prefix, mapped to the entry in {@link vatNumberFormats} that
 * produces them.
 */
export const vatNumberAliases = {
  GR: 'EL',
} satisfies Record<string, keyof typeof vatNumberFormats>;

/**
 * The country codes for which a VAT identification number can be generated.
 */
export type VatNumberCountryCode =
  | keyof typeof vatNumberFormats
  | keyof typeof vatNumberAliases;
