import { MersenneTwister19937 } from '../internal/mersenne';
import { randomSeed } from '../internal/seed';
import type { Randomizer } from '../randomizer';

/**
 * Generates a MersenneTwister19937 randomizer with 32 bits of precision.
 * This is the default randomizer used by faker prior to v9.0.
 *
 * @param seed The initial seed to use. Defaults to a random number.
 */
export function generateMersenne32Randomizer(
  seed: number = randomSeed()
): Randomizer {
  const twister = new MersenneTwister19937();

  twister.initGenrand(seed);

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

/**
 * Generates a MersenneTwister19937 randomizer with 53 bits of precision.
 * This is the default randomizer used by faker starting with v9.0.
 *
 * @param seed The initial seed to use. Defaults to a random number.
 */
export function generateMersenne53Randomizer(
  seed: number = randomSeed()
): Randomizer {
  const twister = new MersenneTwister19937();

  twister.initGenrand(seed);

  return {
    next(): number {
      return twister.genrandRes53();
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
