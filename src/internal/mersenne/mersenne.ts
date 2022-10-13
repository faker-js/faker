import { FakerError } from '../../errors/faker-error';
import Twister from './twister';

export interface Mersenne {
  /**
   * Generates a random number between `[min, max)`.
   *
   * @param max The maximum number. Defaults to `32768`.
   * @param min The minimum number. Defaults to `0`.
   *
   * @since 5.5.0
   */
  rand(max?: number, min?: number): number;

  /**
   * Sets the seed to use.
   *
   * @param S The seed to use.
   * @throws If the seed is not a `number`.
   *
   * @since 5.5.0
   */
  seed(S: number): void;

  /**
   * Sets the seed to use.
   *
   * @param A The seed to use.
   * @throws If the seed is not a `number[]`.
   *
   * @since 5.5.0
   */
  seedArray(A: number[]): void;
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
    rand(max = 32768, min = 0): number {
      if (min > max) {
        const temp = min;
        min = max;
        max = temp;
      }

      return Math.floor(twister.genrandReal2() * (max - min) + min);
    },

    seed(S: number): void {
      if (typeof S !== 'number') {
        throw new FakerError(
          `seed(S) must take numeric argument; is ${typeof S}`
        );
      }

      twister.initGenrand(S);
    },

    seedArray(A: number[]): void {
      if (typeof A !== 'object') {
        throw new FakerError(
          `seedArray(A) must take array of numbers; is ${typeof A}`
        );
      }

      twister.initByArray(A, A.length);
    },
  };
}
