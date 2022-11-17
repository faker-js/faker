import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('tobacco', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'tobacco', (t) => {
    t.itEach('tobaccoBrand', 'tobaccoType', 'tobaccoOrigin');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.tobacco.tobaccoBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.tobacco?.brand).toContain(brand);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.tobacco.tobaccoType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.tobacco?.type).toContain(type);
        });
      });
    }
  });
});
