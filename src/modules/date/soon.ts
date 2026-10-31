import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import type { NumberOrRange } from '../../utils/types';
import { fakeDateBetween } from './between';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Generates a random date in the near future.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.days The range of days the date may be in the future. Either as a fixed amount of days or as a day range. Defaults to `1`.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @throws {FakerError} If `days.max` is less than 0.
 * @throws {FakerError} If `days.min` is greater than or equal to `days.max`.
 *
 * @see fakeDateFuture(fakerCore): For generating dates further in the future (years instead of days).
 *
 * @example
 * fakeDateSoon(fakerCore) // '2022-02-05T09:55:39.216Z'
 * fakeDateSoon(fakerCore, { days: 10 }) // '2022-02-11T05:14:39.138Z'
 * fakeDateSoon(fakerCore, { days: { min: 4, max: 7 } }) // '2022-02-09T17:54:01.818Z'
 * fakeDateSoon(fakerCore, { days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-01-01T02:40:44.990Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDateSoon(
  fakerCore: FakerCore,
  options: {
    /**
     * The range of days the date may be in the future.
     *
     * @default 1
     */
    days?: NumberOrRange;
    /**
     * The date to use as reference point for the newly generated date.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): Date {
  const { refDate = getDefaultRefDate(fakerCore) } = options;
  let { days = 1 } = options;
  if (typeof days === 'number') {
    days = { min: 0, max: days };
  }

  if (days.max <= 0) {
    throw new FakerError('Days must be greater than 0.');
  }

  if (days.min >= days.max) {
    throw new FakerError(
      'The maximum amount of days must be greater than the minimum amount of days.'
    );
  }

  // Use milliseconds instead of setUTCDate, which drops fractional days.
  const time = toDate(refDate).getTime();
  const from = time + days.min * MS_PER_DAY;
  const to = time + days.max * MS_PER_DAY;

  return fakeDateBetween(fakerCore, {
    from: from + 1000,
    to,
  });
}
