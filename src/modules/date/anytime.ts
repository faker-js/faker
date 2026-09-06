import type { FakerCore } from '../../core';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { between } from './between';

/**
 * Generates a random date that can be either in the past or in the future.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @see between(fakerCore): For generating dates in a specific range.
 * @see past(fakerCore): For generating dates explicitly in the past.
 * @see future(fakerCore): For generating dates explicitly in the future.
 *
 * @example
 * anytime(fakerCore) // '2022-07-31T01:33:29.567Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function anytime(
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

  return between(fakerCore, {
    from: time - 1000 * 60 * 60 * 24 * 365,
    to: time + 1000 * 60 * 60 * 24 * 365,
  });
}
