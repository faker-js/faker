import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['tree', 'flower'] as const;

describe('plant', () => {
  seededTests(faker, 'plant', (t) => {
    t.itEach(...functionNames);
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      for (const functionName of functionNames) {
        describe(`${functionName}()`, () => {
          it(`should return random value from ${functionName} array`, () => {
            const actual = faker.plant[functionName]();
            expect(faker.definitions.plant[functionName]).toContain(actual);
          });
        });
      }
    }
  });
});
