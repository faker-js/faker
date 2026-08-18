import type { FakerCore } from '../../core';
import { alpha } from '../string/alpha';
import { alphanumeric } from '../string/alphanumeric';
import { numeric } from '../string/numeric';

// NHTSA 49 CFR § 565.15(c), Tables III and IV define the transliteration
// values and position weights used here:
// https://www.govinfo.gov/content/pkg/CFR-2024-title49-vol6/pdf/CFR-2024-title49-vol6-sec565-15.pdf
const vinWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const vinTransliteration: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
};

/**
 * Calculates a Vehicle Identification Number (VIN) check digit.
 *
 * @internal
 *
 * @param vin The VIN to calculate the check digit for.
 */
export function vinCheckDigit(vin: string): string {
  let checksum = 0;
  for (const [index, character] of [...vin].entries()) {
    const value = vinTransliteration[character] ?? Number(character);
    checksum += value * vinWeights[index];
  }

  return checksum % 11 === 10 ? 'X' : String(checksum % 11);
}

/**
 * Returns a vehicle identification number (VIN).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vin(fakerCore) // 'YV1MH682762184654'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vin(fakerCore: FakerCore): string {
  const exclude = ['o', 'i', 'q', 'O', 'I', 'Q'];
  const vin = `${alphanumeric(fakerCore, {
    length: 10,
    casing: 'upper',
    exclude,
  })}${alpha(fakerCore, {
    length: 1,
    casing: 'upper',
    exclude,
  })}${alphanumeric(fakerCore, {
    length: 1,
    casing: 'upper',
    exclude,
  })}${numeric(fakerCore, { length: 5, allowLeadingZeros: true })}`;

  return `${vin.slice(0, 8)}${vinCheckDigit(vin)}${vin.slice(9)}`;
}
