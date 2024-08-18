// https://en.wikipedia.org/wiki/Postal_codes_in_Canada
// The basic format is A1A 1A1
// First letter is province/territory-specific
// Other letters do not allow D, F, I, O, Q, U
const suffix = '[0-9][ABCEGHJ-NPRSTVW-Z] [0-9][ABCEGHJ-NPRSTVW-Z][0-9]';

export default {
  AB: `{{helpers.fromRegExp(T${suffix})}}`, // Alberta
  BC: `{{helpers.fromRegExp(V${suffix})}}`, // British Columbia
  MB: `{{helpers.fromRegExp(R${suffix})}}`, // Manitoba
  NB: `{{helpers.fromRegExp(E${suffix})}}`, // New Brunswick
  NL: `{{helpers.fromRegExp(A${suffix})}}`, // Newfoundland and Labrador
  NS: `{{helpers.fromRegExp(B${suffix})}}`, // Nova Scotia
  NT: `{{helpers.fromRegExp(X${suffix})}}`, // Northwest Territories
  NU: `{{helpers.fromRegExp(X${suffix})}}`, // Nunavut
  ON: `{{helpers.fromRegExp([KLMNP]${suffix})}}`, // Ontario
  PE: `{{helpers.fromRegExp(C${suffix})}}`, // Prince Edward Island
  QC: `{{helpers.fromRegExp([GHJ]${suffix})}}`, // Quebec
  SK: `{{helpers.fromRegExp(S${suffix})}}`, // Saskatchewan
  YT: `{{helpers.fromRegExp(Y${suffix})}}`, // Yukon
};
