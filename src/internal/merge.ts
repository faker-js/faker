/**
 * Merges and sorts the given arrays.
 *
 * @template T The type of the elements in the arrays.
 *
 * @internal
 *
 * @param args The arrays to merge.
 */
export function mergeArrays<T>(...args: T[][]): T[] {
  return Array.from(new Set(args.flat())).sort();
}
