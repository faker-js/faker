import { FakerError } from '../../errors/faker-error';
import Twister from './twister';

/**
 * Generate seed based random numbers.
 */
export interface Mersenne {
  /**
   * Generates a random number between `[min, max)`.
   *
   * @param max The maximum number. Defaults to `32768`.
   * @param min The minimum number. Defaults to `0`.
   */
  next(max?: number, min?: number): number;

  /**
   * Sets the seed to use.
   *
   * @param seed The seed to use.
   * @throws If the seed is not a `number` or `number[]`.
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
    next(max = 32768, min = 0): number {
      if (min > max) {
        const temp = min;
        min = max;
        max = temp;
      }

      return Math.floor(twister.genrandReal2() * (max - min) + min);
    },

    seed(seed: number | number[]): void {
      if (typeof seed === 'number') {
        twister.initGenrand(seed);
        return;
      }

      if (Array.isArray(seed)) {
        twister.initByArray(seed, seed.length);
        return;
      }

      throw new FakerError(
        `seed must take numeric argument(s); is ${typeof seed}`
      );
    },
  };
}
