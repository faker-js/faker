import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('plant', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'plant', (t) => {
    t.itEach(
      'plantName',
      'plantDescription',
      'plantCategory',
      'plantPotSize',
      'plantOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.plant.plantName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.plant?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.plant.plantDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.plant?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.plant.plantCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.plant?.category).toContain(category);
        });
      });

      describe('potSize()', () => {
        it('returns a random pot size', () => {
          const potSize = faker.plant.plantPotSize();

          expect(potSize).toBeTruthy();
          expect(potSize).toBeTypeOf('string');
          expect(faker.definitions.plant?.potSize).toContain(potSize);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.plant.plantOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
