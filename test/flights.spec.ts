import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('flights', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'flights', (t) => {
    t.itEach(
      'flightDeparture',
      'flightDestination',
      'flightDepartureDate',
      'flightReturnDate',
      'flightAdults',
      'flightChildren',
      'flightAirline',
      'flightType',
      'flightClass',
      'flightNumber'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('departure()', () => {
        it('should return departure', () => {
          const departure = faker.flights.flightDeparture();

          expect(departure).toBeTruthy();
          expect(departure).toBeTypeOf('string');
        });
      });

      describe('destination()', () => {
        it('should return destination', () => {
          const destination = faker.flights.flightDestination();

          expect(destination).toBeTruthy();
          expect(destination).toBeTypeOf('string');
        });
      });

      describe('departureDate()', () => {
        it('should return check in date', () => {
          const departureDate = faker.flights.flightDepartureDate();

          expect(departureDate).toBeTruthy();
          expect(departureDate).toBeTypeOf('object');
          expect(departureDate).greaterThan(new Date(1577836800000));
          expect(departureDate).lessThan(new Date(1638936800000));
        });
      });

      describe('returnDate()', () => {
        it('returns a random return date', () => {
          const returnDate = faker.flights.flightReturnDate();

          expect(returnDate).toBeTruthy();
          expect(returnDate).toBeTypeOf('object');
          expect(returnDate).greaterThan(new Date(1638936800001));
          expect(returnDate).lessThan(new Date(1658936800000));
        });
      });

      describe('adults()', () => {
        it('returns a random number of adults', () => {
          const adults = faker.flights.flightAdults();

          expect(adults).toBeTruthy();
          expect(adults).toBeTypeOf('number');
          expect(adults).toBeGreaterThanOrEqual(1);
          expect(adults).toBeLessThanOrEqual(10);
        });
      });

      describe('children()', () => {
        it('returns a random number of children', () => {
          const children = faker.flights.flightChildren();

          expect(children).toBeTruthy();
          expect(children).toBeTypeOf('number');
          expect(children).toBeGreaterThanOrEqual(1);
          expect(children).toBeLessThanOrEqual(10);
        });
      });

      describe('airline()', () => {
        it('returns a random airline', () => {
          const airline = faker.flights.flightAirline();

          expect(airline).toBeTruthy();
          expect(airline).toBeTypeOf('string');
          expect(faker.definitions.flights?.airline).toContain(airline);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.flights.flightType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.flights?.type).toContain(type);
        });
      });

      describe('class()', () => {
        it('returns a random class', () => {
          const class_ = faker.flights.flightClass();

          expect(class_).toBeTruthy();
          expect(class_).toBeTypeOf('string');
          expect(faker.definitions.flights?.class_).toContain(class_);
        });
      });

      describe('number()', () => {
        it('returns a random flight number', () => {
          const number = faker.flights.flightNumber();

          expect(number).toBeTruthy();
          expect(number).toBeTypeOf('string');
          expect(faker.definitions.flights?.number).toContain(number);
        });
      });
    }
  });
});
