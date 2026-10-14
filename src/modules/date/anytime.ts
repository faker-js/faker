import type { FakerCore } from '../../core';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { fakeDateBetween } from './between';

/**
 * Generates a random date that can be either in the past or in the future.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @see fakeDateBetween(fakerCore): For generating dates in a specific range.
 * @see fakeDatePast(fakerCore): For generating dates explicitly in the past.
 * @see fakeDateFuture(fakerCore): For generating dates explicitly in the future.
 *
 * @example
 * fakeDateAnytime(fakerCore) // '2022-07-31T01:33:29.567Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDateAnytime(
  fakerCore: FakerCore,
  options: {
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): Date {
  const { refDate = getDefaultRefDate(fakerCore) } = options;
  const time = toDate(refDate).getTime();

  return fakeDateBetween(fakerCore, {
    from: time - 1000 * 60 * 60 * 24 * 365,
    to: time + 1000 * 60 * 60 * 24 * 365,
  });
}
