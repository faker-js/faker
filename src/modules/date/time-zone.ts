import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random IANA time zone name.
 *
 * The returned time zone is not tied to the current locale.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
 * @see locationTimeZone(fakerCore): For generating a timezone based on the current locale.
 *
 * @example
 * locationTimeZone(fakerCore) // 'Pacific/Guam'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function timeZone(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.date.time_zone);
}
