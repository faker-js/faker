import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import type { NumberOrRange } from '../../utils/types';
import { between } from './between';

/**
 * Generates a random date in the past.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.years The range of years the date may be in the past. Either as a fixed amount of years or as a year range. Defaults to `1`.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @throws {FakerError} If `years.max` is less than 0.
 * @throws {FakerError} If `years.min` is greater than or equal to `years.max`.
 *
 * @see recent(fakerCore): For generating dates in the recent past (days instead of years).
 *
 * @example
 * past(fakerCore) // '2021-12-03T05:40:44.408Z'
 * past(fakerCore, { years: 10 }) // '2017-10-25T21:34:19.488Z'
 * past(fakerCore, { years: { min: 4, max: 7 } }) // '2022-12-12T03:43:16.434Z'
 * past(fakerCore, { years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function past(
  fakerCore: FakerCore,
  options: {
    /**
     * The range of years the date may be in the past.
     *
     * @default 1
     */
    years?: NumberOrRange;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): Date {
  const { refDate = getDefaultRefDate(fakerCore) } = options;
  let { years = 1 } = options;
  if (typeof years === 'number') {
    years = { min: 0, max: years };
  }

  if (years.max <= 0) {
    throw new FakerError('Years must be greater than 0.');
  }

  if (years.min >= years.max) {
    throw new FakerError(
      'The maximum amount of years must be greater than the minimum amount of years.'
    );
  }

  const time = toDate(refDate);
  const from = new Date(time);
  from.setUTCFullYear(from.getUTCFullYear() - years.max);
  const to = new Date(time);
  to.setUTCFullYear(to.getUTCFullYear() - years.min);

  return between(fakerCore, {
    from,
    to: to.getTime() - 1000,
  });
}
