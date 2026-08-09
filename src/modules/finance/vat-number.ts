export interface VatNumberFormat {
  /**
   * The ISO 3166-1 alpha-2 country code, which is also emitted as the literal
   * two-letter prefix of the generated value.
   *
   * Note that this is the *VAT* country code, which differs from the ISO code
   * for Greece: VAT numbers are prefixed `EL`, not `GR`.
   */
  country: string;

  /**
   * The template for the characters following the country prefix, in the format
   * used by `faker.helpers.replaceSymbols()`:
   *
   * - `#` is replaced by a random digit,
   * - `?` is replaced by a random uppercase letter,
   * - `*` is replaced by a random digit or uppercase letter,
   * - any other character is emitted verbatim (e.g. the Dutch `B`).
   */
  format: string;

  /**
   * The national name of the identifier, for documentation purposes.
   */
  name: string;
}

/**
 * The VAT identification number formats of the EU member states.
 *
 * Only the structure of each number is modelled: lengths, character classes and
 * the literal characters that a given country mandates. Check digits, where a
 * country's real algorithm defines one, are filled with random data.
 *
 * Portugal is deliberately absent: its check digit is verified by common
 * validators, so a structurally-correct-but-random Portuguese number would be
 * rejected by them. The same applies to non-EU schemes such as `CH` and `AU`.
 * Those belong to a follow-up that computes real check digits.
 */
const vatNumberFormats: VatNumberFormat[] = [
  { country: 'AT', format: 'U########', name: 'UID-Nummer' },
  { country: 'BE', format: '0#########', name: 'BTW-nummer' },
  { country: 'BG', format: '#########', name: 'DDS nomer' },
  { country: 'CY', format: '########?', name: 'FPA' },
  { country: 'CZ', format: '########', name: 'DIC' },
  {
    country: 'DE',
    format: '#########',
    name: 'Umsatzsteuer-Identifikationsnummer',
  },
  { country: 'DK', format: '########', name: 'CVR-nummer' },
  { country: 'EE', format: '#########', name: 'KMKR number' },
  { country: 'EL', format: '#########', name: 'AFM' },
  { country: 'ES', format: '?#######?', name: 'NIF/CIF' },
  { country: 'FI', format: '########', name: 'ALV-numero' },
  {
    country: 'FR',
    format: '**#########',
    name: 'Numero de TVA intracommunautaire',
  },
  { country: 'HR', format: '###########', name: 'PDV ID' },
  { country: 'HU', format: '########', name: 'Kozossegi adoszam' },
  { country: 'IE', format: '#######?', name: 'VAT number' },
  { country: 'IT', format: '###########', name: 'Partita IVA' },
  { country: 'LT', format: '#########', name: 'PVM kodas' },
  { country: 'LU', format: '########', name: 'Numero de TVA' },
  { country: 'LV', format: '###########', name: 'PVN numurs' },
  { country: 'MT', format: '########', name: 'VAT number' },
  { country: 'NL', format: '#########B##', name: 'Btw-identificatienummer' },
  { country: 'PL', format: '##########', name: 'NIP' },
  { country: 'RO', format: '########', name: 'Cod de identificare fiscala' },
  { country: 'SE', format: '############', name: 'Momsnummer' },
  { country: 'SI', format: '########', name: 'ID za DDV' },
  { country: 'SK', format: '##########', name: 'IC DPH' },
];

export default vatNumberFormats;
