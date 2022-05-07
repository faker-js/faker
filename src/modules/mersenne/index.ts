import { FakerError } from '../../errors/faker-error';
import Gen from './twister';

/**
 * Module to generate seed based random numbers.
 */
export class MersenneModule {
  private gen = new Gen();

  constructor() {
    this.gen.initGenrand(new Date().getTime() % 1000000000);

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MersenneModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random number between `[min, max)`.
   *
   * @param max The maximum number. Defaults to `32768`.
   * @param min The minimum number. Defaults to `0`.
   *
   * @example
   * faker.mersenne.rand() // 15515
   * faker.mersenne.rand(1000, 500) // 578
   */
  rand(max = 32768, min = 0): number {
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return Math.floor(this.gen.genrandReal2() * (max - min) + min);
  }

  /**
   * Sets the seed to use.
   *
   * @param S The seed to use.
   * @throws If the seed is not a `number`.
   */
  seed(S: number): void {
    if (typeof S !== 'number') {
      throw new FakerError(
        `seed(S) must take numeric argument; is ${typeof S}`
      );
    }

    this.gen.initGenrand(S);
  }

  /**
   * Sets the seed to use.
   *
   * @param A The seed to use.
   * @throws If the seed is not a `number[]`.
   */
  seed_array(A: number[]): void {
    if (typeof A !== 'object') {
      throw new FakerError(
        `seed_array(A) must take array of numbers; is ${typeof A}`
      );
    }

    this.gen.initByArray(A, A.length);
  }
}
