import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { stringNumeric } from '../string/numeric';

/**
 * Generates a random building number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationBuildingNumber(fakerCore) // '379'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationBuildingNumber(fakerCore: FakerCore): string {
  return helpersArrayElement(
    fakerCore,
    fakerCore.locale.location.building_number
  ).replaceAll(/#+/g, (m) =>
    stringNumeric(fakerCore, {
      length: m.length,
      allowLeadingZeros: false,
    })
  );
}
