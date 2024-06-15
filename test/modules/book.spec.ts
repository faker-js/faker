import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('book', () => {
  seededTests(faker, 'book', (t) => {
    t.itEach('author', 'format', 'genre', 'publisher', 'series', 'title');
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('author()', () => {
        it('should return an author name', () => {
          const author = faker.book.author();

          expect(author).toBeTruthy();
          expect(author).toBeTypeOf('string');
          expect(faker.definitions.book.author).toContain(author);
        });
      });

      describe('format()', () => {
        it('should return a book format', () => {
          const format = faker.book.format();

          expect(format).toBeTruthy();
          expect(format).toBeTypeOf('string');
          expect(faker.definitions.book.format).toContain(format);
        });
      });

      describe('genre()', () => {
        it('should return a genre', () => {
          const genre = faker.book.genre();

          expect(genre).toBeTruthy();
          expect(genre).toBeTypeOf('string');
          expect(faker.definitions.book.genre).toContain(genre);
        });
      });

      describe('publisher()', () => {
        it('should return a publisher', () => {
          const publisher = faker.book.publisher();

          expect(publisher).toBeTruthy();
          expect(publisher).toBeTypeOf('string');
          expect(faker.definitions.book.publisher).toContain(publisher);
        });
      });

      describe('series()', () => {
        it('should return a series', () => {
          const series = faker.book.series();

          expect(series).toBeTruthy();
          expect(series).toBeTypeOf('string');
          expect(faker.definitions.book.series).toContain(series);
        });
      });

      describe('title()', () => {
        it('should return a title', () => {
          const title = faker.book.title();

          expect(title).toBeTruthy();
          expect(title).toBeTypeOf('string');
          expect(faker.definitions.book.title).toContain(title);
        });
      });
    }
  );
});
