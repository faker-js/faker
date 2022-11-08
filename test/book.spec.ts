import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('book', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'book', (t) => {
    t.itEach(
      'bookTitle',
      'bookAuthor',
      'bookYear',
      'bookPublisher',
      'bookDescription'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.book.bookTitle();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.book?.title).toContain(name);
        });
      });

      describe('author()', () => {
        it('returns a random type', () => {
          const type = faker.book.bookAuthor();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.book?.author).toContain(type);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.book.bookDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.book?.description).toContain(description);
        });
      });

      describe('year()', () => {
        it('returns a random year', () => {
          const year = faker.book.bookYear();

          expect(year).toBeTruthy();
          expect(year).toBeTypeOf('number');
          expect(year).toBeGreaterThanOrEqual(1900);
          expect(year).toBeLessThanOrEqual(2022);
        });
      });

      describe('publisher()', () => {
        it('returns a random publisher', () => {
          const flavor = faker.book.bookPublisher();

          expect(flavor).toBeTruthy();
          expect(flavor).toBeTypeOf('string');
          expect(faker.definitions.book?.publisher).toContain(flavor);
        });
      });
    }
  });
});
