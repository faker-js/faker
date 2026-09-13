import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random IANA time zone relevant to this locale.
 *
 * The returned time zone is tied to the current locale.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
 * @see dateTimeZone(fakerCore): For generating a random time zone from all available time zones.
 *
 * @example
 * locationTimeZone(fakerCore) // 'Pacific/Guam'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationTimeZone(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.location.time_zone);
}
