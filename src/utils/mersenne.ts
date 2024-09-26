import { MersenneTwister19937 } from '../internal/mersenne';
import type { Randomizer } from '../randomizer';

/**
 * Generates a MersenneTwister19937 randomizer with 32 bits of precision.
 * This is the default randomizer used by faker prior to v9.0.
 */
export function generateMersenne32Randomizer(): Randomizer {
  const twister = new MersenneTwister19937();

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

/**
 * Generates a MersenneTwister19937 randomizer with 53 bits of precision.
 * This is the default randomizer used by faker starting with v9.0.
 */
export function generateMersenne53Randomizer(): Randomizer {
  const twister = new MersenneTwister19937();

  twister.initGenrand(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER));

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
