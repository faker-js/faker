/**
 * Groups the values by the key function.
 *
 * @internal
 *
 * @param values The values to group.
 * @param keyFunction The function to get the key from the value.
 */
export function groupBy<T>(
  values: ReadonlyArray<T>,
  keyFunction: (key: T) => string | number
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const value of values) {
    const key = keyFunction(value);
    if (result[key] === undefined) {
      result[key] = [];
    }

    result[key].push(value);
  }

  return result;
}
