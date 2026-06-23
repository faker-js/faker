import type { FakerCore } from '../core';

const DEFAULT_REF_DATE_SOURCE: () => Date = () => new Date();

/**
 * Gets a new reference date used to generate relative dates.
 *
 * If `fakerCore.config.defaultRefDate` is defined, it will be used to get the default reference date. Otherwise, the current date will be used.
 *
 * @param fakerCore The FakerCore instance to get it from.
 *
 * @returns The newly created default reference date.
 *
 * @example
 * // Default
 * fakerCore.randomizer.seed(1234); // Keep `past()` offset consistent for example runs
 * // setDefaultRefDate(fakerCore);
 * past(fakerCore); // Changes based on the current date/time
 * @example
 * // Fixed
 * fakerCore.randomizer.seed(1234);
 * setDefaultRefDate(fakerCore, new Date('2020-01-01'));
 * past(fakerCore); // Reproducible '2019-07-03T08:27:58.118Z'
 * @example
 * // Tick on use
 * let clock = new Date("2020-01-01").getTime();
 * setDefaultRefDate(fakerCore, () => {
 *   clock += 1000; // +1s
 *   return new Date(clock);
 * });
 *
 * getDefaultRefDate(fakerCore) // 2020-01-01T00:00:01Z
 * getDefaultRefDate(fakerCore) // 2020-01-01T00:00:02Z
 *
 * @since 10.5.0
 *
 * @experimental
 */
export function getDefaultRefDate(fakerCore: FakerCore): Date {
  return (fakerCore.config.defaultRefDate ?? DEFAULT_REF_DATE_SOURCE)();
}
