import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('food', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'food', (t) => {
    t.itEach(
      'foodDescription',
      'foodFlavor',
      'foodName',
      'foodType',
      'foodOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.food.foodName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.food.name).toContain(name);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.food.foodType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.food.type).toContain(type);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.food.foodDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.food.description).toContain(description);
        });
      });

      describe('flavor()', () => {
        it('returns a random flavor', () => {
          const flavor = faker.food.foodFlavor();

          expect(flavor).toBeTruthy();
          expect(flavor).toBeTypeOf('string');
          expect(faker.definitions.food.flavor).toContain(flavor);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.food.foodOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
