import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { numeric } from '../string/numeric';
import { calculateUPCCheckDigit } from './_upc-check-digit';

/**
 * Returns a valid [UPC‑A](https://en.wikipedia.org/wiki/Universal_Product_Code) (12 digits).
 *
 * When a `prefix` is provided, it is padded with random digits so that the body
 * has 11 digits. The 12th digit (check digit) is computed using the Modulo 10 algorithm.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.prefix Optional numeric prefix for the UPC body (0–11 digits).
 *
 * @returns A 12‑digit UPC‑A string.
 *
 * @throws {FakerError} If `prefix` contains non-digit characters or more than 11 digits.
 *
 * @example
 * upc(fakerCore) // '036000291452'
 * upc(fakerCore, { prefix: '01234' }) // '012345678905'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function upc(
  fakerCore: FakerCore,
  options: {
    /**
     * Optional numeric prefix for the UPC body (0–11 digits).
     */
    prefix?: string;
  } = {}
): string {
  const { prefix = '' } = options;
  if (prefix && /\D/.test(prefix)) {
    throw new FakerError('Prefix must contain only numeric digits');
  }

  if (prefix.length > 11) {
    throw new FakerError('Prefix must be at most 11 numeric digits');
  }

  const remaining = 11 - prefix.length;
  const rand = numeric(fakerCore, {
    length: remaining,
    allowLeadingZeros: true,
  });

  const body = `${prefix}${rand}`; // 11 digits
  const check = calculateUPCCheckDigit(body);
  return `${body}${check}`; // 12-digit UPC-A
}
