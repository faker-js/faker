import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import type { NumberOrRange } from '../../utils/types';
import { between } from './between';

/**
 * Generates a random date in the future.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.years The range of years the date may be in the future. Either as a fixed amount of years or as a year range. Defaults to `1`.
 * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @throws {FakerError} If `years.max` is less than 0.
 * @throws {FakerError} If `years.min` is greater than or equal to `years.max`.
 *
 * @see soon(fakerCore): For generating dates in the near future (days instead of years).
 *
 * @example
 * future(fakerCore) // '2022-11-19T05:52:49.100Z'
 * future(fakerCore, { years: 10 }) // '2030-11-23T09:38:28.710Z'
 * future(fakerCore, { years: { min: 4, max: 7 } }) // '2031-05-21T05:49:21.116Z'
 * future(fakerCore, { years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function future(
  fakerCore: FakerCore,
  options: {
    /**
     * The range of years the date may be in the future.
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
  from.setUTCFullYear(from.getUTCFullYear() + years.min);
  const to = new Date(time);
  to.setUTCFullYear(to.getUTCFullYear() + years.max);

  return between(fakerCore, {
    from: from.getTime() + 1000,
    to,
  });
}
