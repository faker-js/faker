import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('cigarette', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'cigarette', (t) => {
    t.itEach('cigaretteBrand', 'cigaretteType', 'cigaretteOrigin');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.cigarette.cigaretteBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.cigarette?.brand).toContain(brand);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.cigarette.cigaretteType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.cigarette?.type).toContain(type);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.cigarette.cigaretteOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
