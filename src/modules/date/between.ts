import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { toDate } from '../../internal/date';
import { int } from '../number/int';

/**
 * Generates a random date between the given boundaries.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options object.
 * @param options.from The early date boundary.
 * @param options.to The late date boundary.
 *
 * @throws {FakerError} If `from` or `to` are not provided.
 * @throws {FakerError} If `from` is after `to`.
 *
 * @example
 * between(fakerCore, { from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function between(
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
  }
): Date {
  const { from, to } = options;

  const fromMs = toDate(from, 'from').getTime();
  const toMs = toDate(to, 'to').getTime();
  if (fromMs > toMs) {
    throw new FakerError('`from` date must be before `to` date.');
  }

  return new Date(int(fakerCore, { min: fromMs, max: toMs }));
}
