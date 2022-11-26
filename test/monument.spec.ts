import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('monument', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'monument', (t) => {
    t.itEach(
      'monumentName',
      'monumentDescription',
      'monumentLocation',
      'monumentCountry',
      'monumentYear',
      'monumentDateEstabilished'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.monument.monumentName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.monument?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('should return a description', () => {
          const description = faker.monument.monumentDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.monument?.description).toContain(
            description
          );
        });
      });

      describe('location()', () => {
        it('should return a location', () => {
          const location = faker.monument.monumentLocation();

          expect(location).toBeTruthy();
          expect(location).toBeTypeOf('string');
        });
      });

      describe('country()', () => {
        it('should return a country', () => {
          const country = faker.monument.monumentCountry();

          expect(country).toBeTruthy();
          expect(country).toBeTypeOf('string');
        });
      });

      describe('year()', () => {
        it('should return a brand', () => {
          const year = faker.monument.monumentYear();

          expect(year).toBeTruthy();
          expect(year).toBeTypeOf('number');
        });
      });

      describe('dateEstabilished()', () => {
        it('should return a date estabilished', () => {
          const dateEstabilished = faker.monument.monumentDateEstabilished();

          expect(dateEstabilished).toBeTruthy();
        });
      });
    }
  });
});
