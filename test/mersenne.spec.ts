import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Mersenne } from '../src/internal/mersenne/mersenne';
import mersenneFn from '../src/internal/mersenne/mersenne';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 25;

describe('mersenne twister', () => {
  const mersenne: Mersenne = mersenneFn();

  describe.each(
    (seededRuns as Array<number | number[]>)
      .concat([[42, 1, 2]], [[1337, 1, 2]], [[1211, 1, 2]])
      .map((s) => [s])
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
  const seeds = times(NON_SEEDED_BASED_RUN).reduce<
    Array<[seed: number | number[]]>
  >((prev) => {
    prev.push([Math.ceil(Math.random() * 1_000_000_000)]);
    prev.push([
      [
        Math.ceil(Math.random() * 1_000_000_000),
        Math.ceil(Math.random() * 1_000_000_000),
      ],
    ]);
    return prev;
  }, []);

  describe.each(seeds)('random seeded tests %j', (seed) => {
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
