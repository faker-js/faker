import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('videogame', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'videogame', (t) => {
    t.itEach(
      'videogameName',
      'videogameDescription',
      'videogameBrand',
      'videogamePublisher',
      'videogameDeveloper',
      'videogameAgeRating',
      'videogameGenre',
      'videogamePlatform',
      'videogameCondition'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.videogame.videogameName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.videogame?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.videogame.videogameDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.videogame?.description).toContain(
            description
          );
        });
      });

      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.videogame.videogameBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.videogame?.brand).toContain(brand);
        });
      });

      describe('publisher()', () => {
        it('returns a random publisher', () => {
          const publisher = faker.videogame.videogamePublisher();

          expect(publisher).toBeTruthy();
          expect(publisher).toBeTypeOf('string');
          expect(faker.definitions.videogame?.publisher).toContain(publisher);
        });
      });

      describe('developer()', () => {
        it('returns a random developer', () => {
          const developer = faker.videogame.videogameDeveloper();

          expect(developer).toBeTruthy();
          expect(developer).toBeTypeOf('string');
          expect(faker.definitions.videogame?.developer).toContain(developer);
        });
      });

      describe('region()', () => {
        it('returns a random age rating', () => {
          const ageRating = faker.videogame.videogameAgeRating();

          expect(ageRating).toBeTruthy();
          expect(ageRating).toBeTypeOf('string');
          expect(faker.definitions.videogame?.ageRating).toContain(ageRating);
        });
      });

      describe('genre()', () => {
        it('returns a random genre', () => {
          const genre = faker.videogame.videogameGenre();

          expect(genre).toBeTruthy();
          expect(genre).toBeTypeOf('string');
          expect(faker.definitions.videogame?.genre).toContain(genre);
        });
      });

      describe('platform()', () => {
        it('returns a random platform', () => {
          const platform = faker.videogame.videogamePlatform();

          expect(platform).toBeTruthy();
          expect(platform).toBeTypeOf('string');
          expect(faker.definitions.videogame?.platform).toContain(platform);
        });
      });

      describe('condition()', () => {
        it('returns a random condition', () => {
          const condition = faker.videogame.videogameCondition();

          expect(condition).toBeTruthy();
          expect(condition).toBeTypeOf('string');
          expect(faker.definitions.videogame?.condition).toContain(condition);
        });
      });
    }
  });
});
