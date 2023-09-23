/**
 * Checks that the given string passes the luhn algorithm.
 *
 * @param string The string to validate.
 */
export function luhnCheck(string: string): boolean {
  return luhnChecksum(string) === 0;
}

/**
 * Calculates the luhn check value for the given string.
 *
 * @param string The string to calculate the check value for.
 * May contain the `L` placeholder at the end.
 */
export function luhnCheckValue(string: string): number {
  const checksum = luhnChecksum(string.replace(/L?$/, '0'));
  return checksum === 0 ? 0 : 10 - checksum;
}

/**
 * Calculates the luhn checksum value for the given value.
 *
 * @param string The string to generate the checksum for.
 */
function luhnChecksum(string: string): number {
  string = string.replace(/[\s-]/g, '');
  let sum = 0;
  let alternate = false;
  for (let index = string.length - 1; index >= 0; index--) {
    let n = Number.parseInt(string.substring(index, index + 1));
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
