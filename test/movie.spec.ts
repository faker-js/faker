import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('movie', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'movie', (t) => {
    t.itEach(
      'movieTitle',
      'movieDirector',
      'movieWriters',
      'movieCast',
      'movieYear',
      'movieReleaseDate',
      'movieDescription',
      'movieDuration',
      'movieGenre',
      'movieOrigin'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('title()', () => {
        it('should return a title', () => {
          const title = faker.movie.movieTitle();

          expect(title).toBeTruthy();
          expect(title).toBeTypeOf('string');
          expect(faker.definitions.movie?.title).toContain(title);
        });
      });

      describe('director()', () => {
        it('returns a random director', () => {
          const director = faker.movie.movieDirector();

          expect(director).toBeTruthy();
          expect(director).toBeTypeOf('string');
          expect(faker.definitions.movie?.director).toContain(director);
        });
      });

      describe('writers()', () => {
        it('returns a random writers', () => {
          const writers = faker.movie.movieWriters();

          expect(writers).toBeTruthy();
          expect(writers).toBeTypeOf('string');
          expect(faker.definitions.movie?.writers).toContain(writers);
        });
      });

      describe('year()', () => {
        it('returns a random year', () => {
          const year = faker.movie.movieYear();

          expect(year).toBeTruthy();
          expect(year).toBeTypeOf('number');
          expect(year).toBeGreaterThanOrEqual(1980);
          expect(year).toBeLessThanOrEqual(2023);
        });
      });

      describe('releaseDate()', () => {
        it('returns a random release date', () => {
          const releaseDate = faker.movie.movieReleaseDate();

          expect(releaseDate).toBeTruthy();
          expect(releaseDate).toBeTypeOf('object');
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.movie.movieDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.movie?.description).toContain(description);
        });
      });

      describe('duration()', () => {
        it('returns a random duration', () => {
          const duration = faker.movie.movieDuration();

          expect(duration).toBeTruthy();
          expect(duration).toBeTypeOf('string');
          expect(faker.definitions.movie?.duration).toContain(duration);
        });
      });

      describe('genre()', () => {
        it('returns a random genre', () => {
          const genre = faker.movie.movieGenre();

          expect(genre).toBeTruthy();
          expect(genre).toBeTypeOf('string');
          expect(faker.definitions.movie?.genre).toContain(genre);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.movie.movieOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });
    }
  });
});
