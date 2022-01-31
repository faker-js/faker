import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

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

  describe('genre()', () => {
    it('should return a genre', () => {
      const genre = faker.music.genre();

      expect(typeof genre).toBe('string');
      expect(genre).toBeTruthy();
    });
  });
});
