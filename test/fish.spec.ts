import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('fish', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'fish', (t) => {
    t.itEach('fishName', 'fishDescription', 'fishCategory', 'fishOrigin');
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return name', () => {
          const name = faker.fish.fishName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.fish?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('should return description', () => {
          const description = faker.fish.fishDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.fish?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('should return category', () => {
          const category = faker.fish.fishCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.fish?.category).toContain(category);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.fish.fishOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
