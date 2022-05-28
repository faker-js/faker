/**
 * Checks that the given string passes the luhn algorithm.
 *
 * @param str The string to validate.
 */
export function luhnCheck(str: string): boolean {
  return luhnChecksum(str) === 0;
}

/**
 * Calculates the luhn check value for the given string.
 *
 * @param str The string to calculate the check value for.
 * May contain the `L` placeholder at the end.
 */
export function luhnCheckValue(str: string): number {
  const checksum = luhnChecksum(str.replace(/L?$/, '0'));
  return checksum === 0 ? 0 : 10 - checksum;
}

/**
 * Calculates the luhn checksum value for the given value.
 *
 * @param str The string to generate the checksum for.
 */
function luhnChecksum(str: string): number {
  str = str.replace(/[\s-]/g, '');
  let sum = 0;
  let alternate = false;
  for (let i = str.length - 1; i >= 0; i--) {
    let n = parseInt(str.substring(i, i + 1));
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10;
}
