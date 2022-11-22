import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('bookcase', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'bookcase', (t) => {
    t.itEach(
      'bookcaseName',
      'bookcaseCategory',
      'bookcaseStyle',
      'bookcaseMaterial',
      'bookcaseColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.bookcase.bookcaseName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.bookcase?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.bookcase.bookcaseCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.bookcase?.category).toContain(category);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.bookcase.bookcaseStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.bookcase?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.bookcase.bookcaseMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.bookcase?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.bookcase.bookcaseColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
