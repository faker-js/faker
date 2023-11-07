/**
 * Groups the values by the key function.
 *
 * @internal
 *
 * @param values The values to group.
 * @param keyFunction The function to get the key from the value.
 */
export function groupBy<TValue>(
  values: ReadonlyArray<TValue>,
  keyFunction: (value: TValue) => string | number
): Record<string, TValue[]> {
  const result: Record<string, TValue[]> = {};

  for (const value of values) {
    const key = keyFunction(value);
    if (result[key] === undefined) {
      result[key] = [];
    }

    result[key].push(value);
  }

  return result;
}
