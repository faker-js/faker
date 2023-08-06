import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { generateMersennePRNG } from '../src/internal/mersenne';
import type { PRNG } from '../src/prng';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 25;

describe('mersenne twister', () => {
  const prng: PRNG = generateMersennePRNG();

  describe.each(
    [...seededRuns, ...seededRuns.map((v) => [v, 1, 2])].map((v) => [v])
  )('seed: %j', (seed) => {
    beforeEach(() => {
      prng.seed(seed);
    });

    it('should return deterministic value for next()', () => {
      const actual = prng.next();

      expect(actual).toMatchSnapshot();
    });
  });

  function randomSeed(): number {
    return Math.ceil(Math.random() * 1_000_000_000);
  }

  // Create and log-back the seed for debug purposes
  describe.each(
    times(NON_SEEDED_BASED_RUN).flatMap(() => [
      [randomSeed()],
      [[randomSeed(), randomSeed()]],
    ])
  )('random seeded tests %j', (seed) => {
    beforeAll(() => {
      prng.seed(seed);
    });

    describe('next', () => {
      it('should return random number from interval [0, 1)', () => {
        const actual = prng.next();

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThan(1);
      });
    });
  });
});
