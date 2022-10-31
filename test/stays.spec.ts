import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('stays', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'stays', (t) => {
    t.itEach(
      'staysDestination',
      'staysCheckInDate',
      'staysCheckOutDate',
      'staysAdults',
      'staysChildren',
      'staysRooms',
      'staysPropertyName',
      'staysPropertyType',
      'staysDescription',
      'staysStarRating',
      'staysFacilities',
      'staysReviewScore',
      'staysBrands'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('destination()', () => {
        it('should return a name', () => {
          const destination = faker.stays.staysDestination();

          expect(destination).toBeTruthy();
          expect(destination).toBeTypeOf('string');
        });
      });

      describe('checkInDate()', () => {
        it('should return check in date', () => {
          const checkInDate = faker.stays.staysCheckInDate();

          expect(checkInDate).toBeTruthy();
          expect(checkInDate).toBeTypeOf('object');
          expect(checkInDate).greaterThan(new Date(1577836800000));
          expect(checkInDate).lessThan(new Date(1638936800000));
        });
      });

      describe('checkOutDate()', () => {
        it('returns a random check out date', () => {
          const checkOutDate = faker.stays.staysCheckOutDate();

          expect(checkOutDate).toBeTruthy();
          expect(checkOutDate).toBeTypeOf('object');
          expect(checkOutDate).greaterThan(new Date(1638936800001));
          expect(checkOutDate).lessThan(new Date(1658936800000));
        });
      });

      describe('adults()', () => {
        it('returns a random number of adults', () => {
          const adults = faker.stays.staysAdults();

          expect(adults).toBeTruthy();
          expect(adults).toBeTypeOf('number');
          expect(adults).toBeGreaterThanOrEqual(1);
          expect(adults).toBeLessThanOrEqual(10);
        });
      });

      describe('children()', () => {
        it('returns a random number of children', () => {
          const children = faker.stays.staysChildren();

          expect(children).toBeTruthy();
          expect(children).toBeTypeOf('number');
          expect(children).toBeGreaterThanOrEqual(1);
          expect(children).toBeLessThanOrEqual(10);
        });
      });

      describe('rooms()', () => {
        it('returns a random number of rooms', () => {
          const rooms = faker.stays.staysRooms();

          expect(rooms).toBeTruthy();
          expect(rooms).toBeTypeOf('number');
          expect(rooms).toBeGreaterThanOrEqual(1);
          expect(rooms).toBeLessThanOrEqual(10);
        });
      });

      describe('propertyName()', () => {
        it('returns a random propertyName', () => {
          const propertyName = faker.stays.staysPropertyName();

          expect(propertyName).toBeTruthy();
          expect(propertyName).toBeTypeOf('string');
          expect(faker.definitions.stays?.propertyName).toContain(propertyName);
        });
      });

      describe('propertyType()', () => {
        it('returns a random propertyType', () => {
          const propertyType = faker.stays.staysPropertyType();

          expect(propertyType).toBeTruthy();
          expect(propertyType).toBeTypeOf('string');
          expect(faker.definitions.stays?.propertyType).toContain(propertyType);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.stays.staysDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.stays?.description).toContain(description);
        });
      });

      describe('starRating()', () => {
        it('returns a random starRating', () => {
          const starRating = faker.stays.staysStarRating();

          expect(starRating).toBeTruthy();
          expect(starRating).toBeTypeOf('string');
          expect(faker.definitions.stays?.starRating).toContain(starRating);
        });
      });

      describe('facilities()', () => {
        it('returns a random facilities', () => {
          const facilities = faker.stays.staysFacilities();

          expect(facilities).toBeTruthy();
          expect(facilities).toBeTypeOf('string');
          expect(faker.definitions.stays?.facilities).toContain(facilities);
        });
      });

      describe('reviewScore()', () => {
        it('returns a random reviewScore', () => {
          const reviewScore = faker.stays.staysReviewScore();

          expect(reviewScore).toBeTruthy();
          expect(reviewScore).toBeTypeOf('string');
          expect(faker.definitions.stays?.reviewScore).toContain(reviewScore);
        });
      });

      describe('brands()', () => {
        it('returns a random brands', () => {
          const brands = faker.stays.staysBrands();

          expect(brands).toBeTruthy();
          expect(brands).toBeTypeOf('string');
          expect(faker.definitions.stays?.brands).toContain(brands);
        });
      });
    }
  });
});
