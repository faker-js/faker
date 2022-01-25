import { describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'dog',
  'cat',
  'snake',
  'bear',
  'lion',
  'cetacean',
  'horse',
  'bird',
  'cow',
  'fish',
  'crocodilia',
  'insect',
  'rabbit',
  'type',
];

describe('animal', () => {
  describe('non seed-based tests', () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      for (const functionName of functionNames) {
        describe(`${functionName}()`, () => {
          it(`should return random value from ${functionName} array`, () => {
            const actual = faker.animal[functionName]();
            expect(faker.definitions.animal[functionName]).toContain(actual);
          });
        });
      }
    }
  });
});
