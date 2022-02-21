import { describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      recent: {
        noArgs: 'number',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      recent: {
        noArgs: 'number',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      recent: {
        noArgs: 'number',
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['recent'];

describe('time', () => {
  // TODO @Shinigami92 2022-02-04: Results are not seeded yet
  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.time[functionName]();
          expect(actual).toBeTypeOf(expectations[functionName].noArgs);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('recent()', () => {
        it('should return the recent timestamp in unix time format by default', () => {
          const date = faker.time.recent();
          expect(date).toBeTypeOf('number');
        });

        it('should return the recent timestamp in full time string format', () => {
          const date = faker.time.recent('wide');
          expect(date).toBeTypeOf('string');
        });

        it('should return the recent timestamp in abbreviated string format', () => {
          const date = faker.time.recent('abbr');
          expect(date).toBeTypeOf('string');
        });

        it('should return the recent timestamp in unix time format', () => {
          const date = faker.time.recent('unix');
          expect(date).toBeTypeOf('number');
        });

        it('should return the recent timestamp in default (unix) time format', () => {
          const date = faker.time.recent();
          expect(date).toBeTypeOf('number');
        });
      });
    }
  });
});
