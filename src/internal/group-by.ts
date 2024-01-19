/**
 * Groups the values by the key function.
 *
 * @internal
 *
 * @param values The values to group.
 * @param keyMapper The function to get the key from the value.
 */
export function groupBy<TValue>(
  values: ReadonlyArray<TValue>,
  keyMapper: (value: TValue) => string | number
): Record<string, TValue[]>;
/**
 * Groups the values by the key function and maps the values.
 *
 * @internal
 *
 * @param values The values to group.
 * @param keyMapper The function to get the key from the value.
 * @param valueMapper The function to get the value from the value.
 */
export function groupBy<TOriginalValue, TMappedValue>(
  values: ReadonlyArray<TOriginalValue>,
  keyMapper: (value: TOriginalValue) => string | number,
  valueMapper: (value: TOriginalValue) => TMappedValue
): Record<string, TMappedValue[]>;
/**
 * Groups the values by the key function and maps the values.
 *
 * @internal
 *
 * @param values The values to group.
 * @param keyMapper The function to get the key from the value.
 * @param valueMapper The function to map the value.
 */
export function groupBy<TOriginalValue, TMappedValue>(
  values: ReadonlyArray<TOriginalValue>,
  keyMapper: (value: TOriginalValue) => string | number,
  valueMapper: (value: TOriginalValue) => TMappedValue = (value) =>
    value as unknown as TMappedValue
): Record<string, TMappedValue[]> {
  const result: Record<string, TMappedValue[]> = {};

  for (const value of values) {
    const key = keyMapper(value);
    if (result[key] === undefined) {
      result[key] = [];
    }

    result[key].push(valueMapper(value));
  }

  return result;
}
