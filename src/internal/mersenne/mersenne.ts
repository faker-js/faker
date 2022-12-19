import Twister from './twister';

/**
 * Generate seed based random numbers.
 *
 * @internal
 */
export interface Mersenne {
  /**
   * Generates a random integer between `[min, max)`. The result is already floored.
   *
   * @param options The options to generate a random number.
   * @param options.min The minimum number.
   * @param options.max The maximum number.
   */
  next(options: { max: number; min: number }): number;

  /**
   * Generates a random float between `[min, max)`.
   *
   * @param options The options to generate a random number.
   * @param options.min The minimum number.
   * @param options.max The maximum number.
   */
  nextFloat(options: { max: number; min: number }): number;

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
    next({ min, max }): number {
      return Math.floor(twister.genrandReal2() * (max - min) + min);
    },
    nextFloat({ min, max }): number {
      return twister.genrandReal2() * (max - min) + min;
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
