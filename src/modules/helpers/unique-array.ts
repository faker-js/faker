import type { FakerCore } from '../../core';
import { shuffle } from './shuffle';

/**
 * Takes an array of elements or function that returns an element
 * and outputs a unique array of elements based on that source.
 * This method does not store the unique state between invocations.
 *
 * If there are not enough unique values to satisfy the length, if
 * the source is an array, it will only return as many items as are
 * in the array. If the source is a function, it will return after
 * a maximum number of attempts has been reached.
 *
 * @template T The type of the elements.
 *
 * @param fakerCore The FakerCore to use.
 * @param source The elements to choose from or a function that generates an element.
 * @param length The number of elements to generate.
 *
 * @example
 * uniqueArray(fakerCore, wordSample, 3) // ['mob', 'junior', 'ripe']
 * uniqueArray(fakerCore, fakerCore.locale.color.human, 6) // ['lavender', 'green', 'indigo', 'orange', 'tan', 'teal']
 * uniqueArray(fakerCore, ["Hello", "World", "Goodbye"], 2) // ['World', 'Goodbye']
 * uniqueArray(fakerCore, ["one"], 1000) // ['one']
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uniqueArray<const T>(
  fakerCore: FakerCore,
  source: ReadonlyArray<T> | ((fakerCore: FakerCore) => T),
  length: number
): T[] {
  if (Array.isArray(source)) {
    const set = new Set<T>(source);
    const array = [...set];
    return shuffle(fakerCore, array).splice(0, length);
  }

  const set = new Set<T>();
  try {
    if (typeof source === 'function') {
      const maxAttempts = 1000 * length;
      let attempts = 0;
      while (set.size < length && attempts < maxAttempts) {
        set.add(source(fakerCore));
        attempts++;
      }
    }
  } catch {
    // Ignore
  }

  return [...set];
}
