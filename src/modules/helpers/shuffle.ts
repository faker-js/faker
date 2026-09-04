import type { FakerCore } from '../../core';
import { int } from '../number/int';

/**
 * Takes an array and randomizes it in place then returns it.
 *
 * @template T The type of the elements to shuffle.
 *
 * @param fakerCore The FakerCore to use.
 * @param list The array to shuffle.
 * @param options The options to use when shuffling.
 * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
 *
 * @example
 * shuffle(fakerCore, ['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function shuffle<const T>(
  fakerCore: FakerCore,
  list: T[],
  options: {
    /**
     * Whether to shuffle the array in place or return a new array.
     *
     * @default false
     */
    inplace: true;
  }
): T[];
/**
 * Returns a randomized version of the array.
 *
 * @template T The type of the elements to shuffle.
 *
 * @param fakerCore The FakerCore to use.
 * @param list The array to shuffle.
 * @param options The options to use when shuffling.
 * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
 *
 * @example
 * shuffle(fakerCore, ['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
 * shuffle(fakerCore, ['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
// @ts-expect-error TS2394 -- Implementation cannot fullfil the readonly array part, since it needs to comply with the inplace version of the function.
export function shuffle<const T>(
  fakerCore: FakerCore,
  list: ReadonlyArray<T>,
  options?: {
    /**
     * Whether to shuffle the array in place or return a new array.
     *
     * @default false
     */
    inplace?: false;
  }
): T[];
/**
 * Returns a randomized version of the array.
 *
 * @template T The type of the elements to shuffle.
 *
 * @param fakerCore The FakerCore to use.
 * @param list The array to shuffle.
 * @param options The options to use when shuffling.
 * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
 *
 * @example
 * shuffle(fakerCore, ['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
 * shuffle(fakerCore, ['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
 * shuffle(fakerCore, ['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function shuffle<const T>(
  fakerCore: FakerCore,
  list: T[],
  options?: {
    /**
     * Whether to shuffle the array in place or return a new array.
     *
     * @default false
     */
    inplace?: boolean;
  }
): T[];
export function shuffle<const T>(
  fakerCore: FakerCore,
  list: T[],
  options: { inplace?: boolean } = {}
): T[] {
  const { inplace = false } = options;

  if (!inplace) {
    list = [...list];
  }

  for (let i = list.length - 1; i > 0; --i) {
    const j = int(fakerCore, i);
    [list[i], list[j]] = [list[j], list[i]];
  }

  return list;
}
