import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      genre: {
        noArgs: 'Country',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      genre: {
        noArgs: 'Folk',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      genre: {
        noArgs: 'Non Music',
      },
    },
  },
];

const functionNames = ['genre'];

const NON_SEEDED_BASED_RUN = 5;

describe('music', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.music[functionName]();

          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('genre()', () => {
        it('should return a genre', () => {
          const genre = faker.music.genre();

          expect(genre).toBeTruthy();
          expect(genre).toBeTypeOf('string');
          expect(faker.definitions.music.genre).toContain(genre);
        });
      });
    }
  });
});
