import type { FakerCore } from '../../core';
import { shuffle } from './shuffle';

/**
 * Takes an array of strings or function that returns a string
 * and outputs a unique array of strings based on that source.
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
 * @param source The strings to choose from or a function that generates a string.
 * @param length The number of elements to generate.
 *
 * @example
 * uniqueArray(fakerCore, faker.word.sample, 3) // ['mob', 'junior', 'ripe']
 * uniqueArray(fakerCore, faker.definitions.person.first_name.generic, 6) // ['Silas', 'Montana', 'Lorenzo', 'Alayna', 'Aditya', 'Antone']
 * uniqueArray(fakerCore, ["Hello", "World", "Goodbye"], 2) // ['World', 'Goodbye']
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function uniqueArray<const T>(
  fakerCore: FakerCore,
  source: ReadonlyArray<T> | (() => T),
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
        set.add(source());
        attempts++;
      }
    }
  } catch {
    // Ignore
  }

  return [...set];
}
