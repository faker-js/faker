import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random IANA time zone name.
 *
 * The returned time zone is not tied to the current locale.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
 * @see fakeLocationTimeZone(fakerCore): For generating a timezone based on the current locale.
 *
 * @example
 * fakeDateTimeZone(fakerCore) // 'Pacific/Guam'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDateTimeZone(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.date.time_zone);
}
