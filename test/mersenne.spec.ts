import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { Mersenne } from '../src/internal/mersenne/mersenne';
import mersenneFn from '../src/internal/mersenne/mersenne';
import { seededRuns } from './support/seededRuns';

const minMaxTestCases = [
  { min: 0, max: 100 },
  { min: -60, max: 0 },
  { min: -50, max: 60 },
];

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

      for (const { min, max } of minMaxTestCases) {
        it(`should return deterministic values for next({ min: ${min}, max: ${max} })`, () => {
          const actual = mersenne.next({ min, max });

          expect(actual).toMatchSnapshot();
        });
      }

      it.todo(`should return 0 for next({ min: ${0}, max: ${1} })`, () => {
        const actual = mersenne.next({ min: 0, max: 1 });

        expect(actual).toEqual(0);
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
          it('should return random number from interval [min, max)', () => {
            const actual = mersenne.next({ min: 0, max: 2 });

            expect(actual).toBeGreaterThanOrEqual(0);
            expect(actual).toBeLessThan(2);
          });
        });
      }
    });
  }
});
