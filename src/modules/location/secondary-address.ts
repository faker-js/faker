import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { stringNumeric } from '../string/numeric';

/**
 * Generates a random localized secondary address. This refers to a specific location at a given address
 * such as an apartment or room number.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationSecondaryAddress(fakerCore) // 'Apt. 861'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationSecondaryAddress(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers
    .fake(fakerCore.locale.location.secondary_address)
    .replaceAll(/#+/g, (m) =>
      stringNumeric(fakerCore, {
        length: m.length,
        allowLeadingZeros: false,
      })
    );
}
