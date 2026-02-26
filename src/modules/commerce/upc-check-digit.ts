import { FakerError } from '../../errors/faker-error';

/**
 * Calculates the check digit for a UPC‑A using the Modulo 10 algorithm.
 *
 * @param digits The first 11 digits (UPC body) as a numeric string.
 *
 * @returns The check digit (0–9).
 *
 * @throws {FakerError} If `digits` is not exactly 11 numeric characters.
 *
 * @see upc
 *
 * @since 10.2.0
 */
export function calculateUPCCheckDigit(digits: string): number {
  if (!/^\d{11}$/.test(digits)) {
    throw new FakerError(
      'calculateUPCCheckDigit expects exactly 11 numeric digits'
    );
  }

  let sum = 0;
  let idx = 0;
  for (const digit of digits) {
    const n = Number.parseInt(digit, 10);
    sum += n * (idx % 2 === 0 ? 3 : 1);
    idx++;
  }

  return (10 - (sum % 10)) % 10;
}
