import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { fakeHelpersRangeToNumber } from './range-to-number';

/**
 * Validates weights before sampling, without consuming random values.
 *
 * @internal
 *
 * @param array The weighted entries to validate.
 * @param method The public method name used in errors.
 *
 * @throws {FakerError} If a weight is not finite and positive.
 */
export function validateWeights(
  array: ReadonlyArray<{ weight: number }>,
  method: string
): void {
  if (array.some(({ weight }) => !Number.isFinite(weight) || weight <= 0)) {
    throw new FakerError(`${method} expects finite, positive weights.`);
  }
}

/**
 * Resolves a validated sample count, treating non-positive counts as empty.
 *
 * @internal
 *
 * @param fakerCore The FakerCore to use.
 * @param count The number or range of entries to sample.
 *
 * @throws {FakerError} If count or its bounds are not safe integers, or the range is reversed.
 */
export function resolveWeightedCount(
  fakerCore: FakerCore,
  count: NumberOrRange
): number {
  const bounds = typeof count === 'number' ? [count] : [count.min, count.max];
  if (bounds.some((bound) => !Number.isSafeInteger(bound))) {
    throw new FakerError('count and its bounds must be safe integers.');
  }
  return Math.max(0, fakeHelpersRangeToNumber(fakerCore, count));
}
