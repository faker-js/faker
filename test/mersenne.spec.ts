import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Mersenne } from '../src/internal/mersenne/mersenne';
import mersenneFn from '../src/internal/mersenne/mersenne';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('mersenne twister', () => {
  let mersenne: Mersenne;

  beforeEach(() => {
    mersenne = mersenneFn();
  });

  for (const seed of [...seededRuns, [42, 1, 2], [1337, 1, 2], [1211, 1, 2]]) {
    describe(`seed: ${JSON.stringify(seed)}`, () => {
      beforeEach(() => {
        mersenne.seed(seed);
      });

      it(`should return deterministic value for next()`, () => {
        const actual = mersenne.next();

        expect(actual).toMatchSnapshot();
      });
    });
  }

  // Create and log-back the seed for debug purposes
  const seeds = [
    Math.ceil(Math.random() * 1_000_000_000),
    [
      Math.ceil(Math.random() * 1_000_000_000),
      Math.ceil(Math.random() * 1_000_000_000),
    ],
  ];

  for (const seed of seeds) {
    describe(`random seeded tests ${JSON.stringify(seed)}`, () => {
      beforeAll(() => {
        mersenne.seed(seed);
      });

      for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
        describe('next', () => {
          it('should return random number from interval [0, 1)', () => {
            const actual = mersenne.next();

            expect(actual).toBeGreaterThanOrEqual(0);
            expect(actual).toBeLessThan(1);
          });
        });
      }
    });
  }
});
