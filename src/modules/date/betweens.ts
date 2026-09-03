import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { multiple } from '../helpers/multiple';
import { between } from './between';

/**
 * Generates random dates between the given boundaries. The dates will be returned in an array sorted in chronological order.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options object.
 * @param options.from The early date boundary.
 * @param options.to The late date boundary.
 * @param options.count The number of dates to generate. Defaults to `3`.
 *
 * @throws {FakerError} If `from` or `to` are not provided.
 * @throws {FakerError} If `from` is after `to`.
 *
 * @example
 * betweens(fakerCore, { from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })
 * // [
 * //   '2022-07-02T06:00:00.000Z',
 * //   '2024-12-31T12:00:00.000Z',
 * //   '2027-07-02T18:00:00.000Z'
 * // ]
 * betweens(fakerCore, { from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
 * // [ '2023-05-02T16:00:00.000Z', '2026-09-01T08:00:00.000Z' ]
 * betweens(fakerCore, { from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: { min: 2, max: 5 }})
 * // [
 * //   2021-12-19T06:35:40.191Z,
 * //   2022-09-10T08:03:51.351Z,
 * //   2023-04-19T11:41:17.501Z
 * // ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function betweens(
  fakerCore: FakerCore,
  options: {
    /**
     * The early date boundary.
     */
    from: string | Date | number;
    /**
     * The late date boundary.
     */
    to: string | Date | number;
    /**
     * The number of dates to generate.
     *
     * @default 3
     */
    count?: NumberOrRange;
  }
): Date[] {
  const { from, to, count = 3 } = options;
  return multiple(fakerCore, () => between(fakerCore, { from, to }), {
    count,
  }).toSorted((a, b) => a.getTime() - b.getTime());
}
