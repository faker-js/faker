import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'bear',
  'bird',
  'cat',
  'cetacean',
  'cow',
  'crocodilia',
  'dog',
  'fish',
  'horse',
  'insect',
  'lion',
  'rabbit',
  'rodent',
  'snake',
  'type',
] as const;

describe('animal', () => {
  seededTests(faker, 'animal', (t) => {
    t.itEach(...functionNames);
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe.each(functionNames)('%s()', (functionName) => {
        it(`should return random value from ${functionName} array`, () => {
          const actual = faker.animal[functionName]();
          expect(faker.definitions.animal[functionName]).toContain(actual);
        });
      });
    }
  );
});
