import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('attraction', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'attraction', (t) => {
    t.itEach(
      'attractionName',
      'attractionCategory',
      'attractionDescription',
      'attractionAge',
      'attractionHeight',
      'attractionIntensity',
      'attractionRecommended'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.attraction.attractionName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.attraction?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.attraction.attractionCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.attraction?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random style', () => {
          const description = faker.attraction.attractionDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.attraction?.description).toContain(
            description
          );
        });
      });

      describe('age()', () => {
        it('returns a random age', () => {
          const age = faker.attraction.attractionAge();

          expect(age).toBeTruthy();
          expect(age).toBeTypeOf('string');
          expect(faker.definitions.attraction?.age).toContain(age);
        });
      });

      describe('height()', () => {
        it('returns a random height', () => {
          const height = faker.attraction.attractionHeight();

          expect(height).toBeTruthy();
          expect(height).toBeTypeOf('string');
          expect(faker.definitions.attraction?.height).toContain(height);
        });
      });

      describe('intensity()', () => {
        it('returns a random intensity', () => {
          const intensity = faker.attraction.attractionIntensity();

          expect(intensity).toBeTruthy();
          expect(intensity).toBeTypeOf('string');
          expect(faker.definitions.attraction?.intensity).toContain(intensity);
        });
      });

      describe('recommended()', () => {
        it('returns a random recommended', () => {
          const recommended = faker.attraction.attractionRecommended();

          expect(recommended).toBeTruthy();
          expect(recommended).toBeTypeOf('string');
          expect(faker.definitions.attraction?.recommended).toContain(
            recommended
          );
        });
      });
    }
  });
});
