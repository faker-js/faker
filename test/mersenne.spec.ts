import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Mersenne } from '../src/internal/mersenne/mersenne';
import mersenneFn from '../src/internal/mersenne/mersenne';
import { seededRuns } from './support/seeded-runs';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 25;

function randomSeed(): number {
  return Math.ceil(Math.random() * 1_000_000_000);
}

describe('mersenne twister', () => {
  const mersenne: Mersenne = mersenneFn();

  describe.each(
    [...seededRuns, ...seededRuns.map((v) => [v, 1, 2])].map((v) => [v])
  )('seed: %j', (seed) => {
    beforeEach(() => {
      mersenne.seed(seed);
    });

    it('should return deterministic value for next()', () => {
      const actual = mersenne.next();

      expect(actual).toMatchSnapshot();
    });
  });

  // Create and log-back the seed for debug purposes
  describe.each(
    times(NON_SEEDED_BASED_RUN).flatMap(() => [
      [randomSeed()],
      [[randomSeed(), randomSeed()]],
    ])
  )('random seeded tests %j', (seed) => {
    beforeAll(() => {
      mersenne.seed(seed);
    });

    describe('next', () => {
      it('should return random number from interval [0, 1)', () => {
        const actual = mersenne.next();

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThan(1);
      });
    });
  });
});
