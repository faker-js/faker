import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { numeric } from '../string/numeric';

/**
 * Generates a random building number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * buildingNumber(fakerCore) // '379'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function buildingNumber(fakerCore: FakerCore): string {
  return arrayElement(
    fakerCore,
    fakerCore.locale.location.building_number
  ).replaceAll(/#+/g, (m) =>
    numeric(fakerCore, {
      length: m.length,
      allowLeadingZeros: false,
    })
  );
}
