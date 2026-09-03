import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { between } from './between';

/**
 * Generates a random date in the recent past.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.days The range of days the date may be in the past. Either as a fixed amount of days or as a day range. Defaults to `1`.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @throws {FakerError} If `days.max` is less than 0.
 * @throws {FakerError} If `days.min` is greater than or equal to `days.max`.
 *
 * @see past(fakerCore): For generating dates further back in time (years instead of days).
 *
 * @example
 * recent(fakerCore) // '2022-02-04T02:09:35.077Z'
 * recent(fakerCore, { days: 10 }) // '2022-01-29T06:12:12.829Z'
 * recent(fakerCore, { days: { min: 4, max: 7 } }) // '2022-02-02T17:54:01.818Z'
 * recent(fakerCore, { days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2019-12-27T18:11:19.117Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function recent(
  fakerCore: FakerCore,
  options: {
    /**
     * The range of days the date may be in the past.
     *
     * @default 1
     */
    days?:
      | number
      | {
          /**
           * The minimum amount of days the date should be in the past.
           *
           * @default 0
           */
          min: number;
          /**
           * The maximum amount of days the date should be in the past.
           *
           * @default 1
           */
          max: number;
        };
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

  const time = toDate(refDate);
  const from = new Date(time);
  from.setUTCDate(from.getUTCDate() - days.max);
  const to = new Date(time);
  to.setUTCDate(to.getUTCDate() - days.min);

  return between(fakerCore, {
    from,
    to: to.getTime() - 1000,
  });
}
