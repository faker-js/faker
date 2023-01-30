import Twister from './twister';

/**
 * Generate seed based random numbers.
 *
 * @internal
 */
export interface Mersenne {
  /**
   * Generates a random float between `[0, 1)`.
   * This method is called `next` so that it could be used as an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)
   */
  next(): number;

  /**
   * Sets the seed to use.
   *
   * @param seed The seed to use.
   */
  seed(seed: number | number[]): void;
}

/**
 * Generate seed based random numbers.
 *
 * @internal
 */
export default function mersenne(): Mersenne {
  const twister = new Twister();

  twister.initGenrand(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER));

  return {
    next(): number {
      return twister.genrandReal2();
    },
    seed(seed: number | number[]): void {
      if (typeof seed === 'number') {
        twister.initGenrand(seed);
      } else if (Array.isArray(seed)) {
        twister.initByArray(seed, seed.length);
      }
    },
  };
}
