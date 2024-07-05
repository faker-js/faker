export const reducedBase32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32 - Excludes I, L, O, and U which may be confused with numbers

/**
 * Encodes a Date into 10 characters base32 string.
 * @param date the Date to encode
 */
export const encodeDate = (date: Date): string => {
  let now = date.getTime();

  let mod;
  let len = 10;
  let str = '';
  for (; len > 0; len--) {
    mod = now % reducedBase32.length;
    str = reducedBase32.charAt(mod) + str;
    now = (now - mod) / reducedBase32.length;
  }

  return str;
};
