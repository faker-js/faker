import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersRangeToNumber } from './range-to-number';

/**
 * Generates an array containing values returned by the given method.
 *
 * @template TResult The type of elements.
 *
 * @param fakerCore The FakerCore to use.
 * @param method The method used to generate the values.
 * The method will be called with `(_, index)`, to allow using the index in the generated value e.g. as id.
 * @param options The optional options object.
 * @param options.count The number or range of elements to generate. Defaults to `3`.
 *
 * @example
 * helpersMultiple(fakerCore, () => personFirstName(fakerCore)) // [ 'Aniya', 'Norval', 'Dallin' ]
 * helpersMultiple(fakerCore, () => personFirstName(fakerCore), { count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
 * helpersMultiple(fakerCore, (_, i) => `${colorHuman(fakerCore)}-${i + 1}`) // [ 'orange-1', 'orchid-2', 'sky blue-3' ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function helpersMultiple<TResult>(
  fakerCore: FakerCore,
  method: (v: unknown, index: number) => TResult,
  options: {
    /**
     * The number or range of elements to generate.
     *
     * @default 3
     */
    count?: NumberOrRange;
  } = {}
): TResult[] {
  const count = helpersRangeToNumber(fakerCore, options.count ?? 3);
  if (count <= 0) {
    return [];
  }

  return Array.from({ length: count }, method);
}
