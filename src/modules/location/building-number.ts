import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeStringNumeric } from '../string/numeric';

/**
 * Generates a random building number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationBuildingNumber(fakerCore) // '379'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationBuildingNumber(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.location.building_number
  ).replaceAll(/#+/g, (m) =>
    fakeStringNumeric(fakerCore, {
      length: m.length,
      allowLeadingZeros: false,
    })
  );
}
