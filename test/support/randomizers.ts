import type { Randomizer } from '../../src';
import { MERSENNE_MAX_VALUE } from './mersenne-values';

/**
 * Creates a randomizer that always returns a fixed value.
 *
 * @param value The fixed value that the randomizer will always return.
 *
 * @returns A randomizer that always returns the specified fixed value.
 */
export function createFixedValueRandomizer(value: number): Randomizer {
  return Object.freeze({
    next: () => value,
    seed: () => {},
  });
}

/**
 * A randomizer that always returns the minimum possible value (0).
 */
export const RANDOMIZER_MIN_VALUE = createFixedValueRandomizer(0);

/**
 * A randomizer that always returns the maximum possible value (`MERSENNE_MAX_VALUE` aka `1 - Number.EPSILON / 2`).
 */
export const RANDOMIZER_MAX_VALUE =
  createFixedValueRandomizer(MERSENNE_MAX_VALUE);
