import type { FakerCore } from '../core';

/**
 * Sets the `refDate` source to use if no `refDate` date is passed to the date methods.
 *
 * @param fakerCore The FakerCore instance to use.
 * @param dateOrSource The function or the static value used to generate the `refDate` date instance.
 * The function must return a new valid `Date` instance for every call.
 * Defaults to `() => new Date()`.
 *
 * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
 * @see faker.seed(): For generating reproducible values.
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
 */
export function setDefaultRefDate(
  fakerCore: FakerCore,
  dateOrSource: string | Date | number | (() => Date) = () => new Date()
): void {
  if (typeof dateOrSource === 'function') {
    fakerCore.config.defaultRefDate = dateOrSource;
  } else {
    fakerCore.config.defaultRefDate = () => new Date(dateOrSource);
  }
}
