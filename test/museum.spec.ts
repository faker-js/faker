import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('museum', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'museum', (t) => {
    t.itEach('museumName', 'museumCategory');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.museum.museumName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.museum?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.museum.museumCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.museum?.category).toContain(category);
        });
      });
    }
  });
});
