import { describe, expect, it } from 'vitest';
import { Aircraft, faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('airline', () => {
  seededTests(faker, 'airline', (t) => {
    t.itEach('airport', 'airline', 'airplane', 'aircraftType');
    t.describe('recordLocator', (t) => {
      t.it('noArgs')
        .it('allowNumerics', { allowNumerics: true })
        .it('allowVisuallySimilarCharacters', {
          allowVisuallySimilarCharacters: true,
        })
        .it('both allowNumerics and allowVisuallySimilarCharacters', {
          allowNumerics: true,
          allowVisuallySimilarCharacters: true,
        });
    });
    t.describe('seat', (t) => {
      t.it('noArgs')
        .it('aircraftType narrowbody', { aircraftType: 'narrowbody' })
        .it('aircraftType regional', { aircraftType: 'regional' })
        .it('aircraftType widebody', { aircraftType: 'widebody' });
    });
    t.describe('flightNumber', (t) => {
      t.it('noArgs')
        .it('flightNumber length 3', { length: 3 })
        .it('flightNumber length 2 to 4', { length: { min: 2, max: 4 } })
        .it('flightNumber addLeadingZeros', { addLeadingZeros: true })
        .it('flightNumber length 3 and addLeadingZeros', {
          length: 3,
          addLeadingZeros: true,
        })
        .it('flightNumber length 2 to 4 and addLeadingZeros', {
          length: { min: 2, max: 4 },
          addLeadingZeros: true,
        });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe(`airport()`, () => {
        it('should return a random value from airport array', () => {
          const airport = faker.airline.airport();
          expect(faker.definitions.airline.airport).toContainEqual(airport);
        });
      });

      describe(`airline()`, () => {
        it('should return a random value from airline array', () => {
          const airline = faker.airline.airline();
          expect(faker.definitions.airline.airline).toContainEqual(airline);
        });
      });

      describe(`airplane()`, () => {
        it('should return a random value from airplane array', () => {
          const airplane = faker.airline.airplane();
          expect(faker.definitions.airline.airplane).toContainEqual(airplane);
        });
      });

      describe(`recordLocator()`, () => {
        it('should use the default values when not passing arguments', () => {
          const recordLocator = faker.airline.recordLocator();
          expect(recordLocator).toMatch(/^[A-HJ-KM-NP-Z]{6}$/);
        });
        it('should allow numeric characters', () => {
          const recordLocator = faker.airline.recordLocator({
            allowNumerics: true,
          });
          expect(recordLocator).toMatch(/^[2-9A-HJ-KM-NP-Z]{6}$/);
        });
        it('should allow visually similar characters', () => {
          const recordLocator = faker.airline.recordLocator({
            allowVisuallySimilarCharacters: true,
          });
          expect(recordLocator).toMatch(/^[A-Z]{6}$/);
        });
        it('should allow both numeric and visually similar characters', () => {
          const recordLocator = faker.airline.recordLocator({
            allowNumerics: true,
            allowVisuallySimilarCharacters: true,
          });
          expect(recordLocator).toMatch(/^[0-9A-Z]{6}$/);
        });
      });

      describe(`seat()`, () => {
        const seatRegex = /^(\d{1,2})([A-K])$/;
        it('should return a random narrowbody seat when not passing an argument', () => {
          const seat = faker.airline.seat();
          const matchResult = seatRegex.exec(seat);
          expectNotNull(matchResult);
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 35);
          expect(seatLetter).toMatch(/^[A-F]$/);
        });
        it('should return a random narrowbody seat', () => {
          const seat = faker.airline.seat({
            aircraftType: Aircraft.Narrowbody,
          });
          const matchResult = seatRegex.exec(seat);
          expectNotNull(matchResult);
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 35);
          expect(seatLetter).toMatch(/^[A-F]$/);
        });
        it('should return a random regional seat', () => {
          const seat = faker.airline.seat({ aircraftType: Aircraft.Regional });
          const matchResult = seatRegex.exec(seat);
          expectNotNull(matchResult);
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 20);
          expect(seatLetter).toMatch(/^[A-D]$/);
        });
        it('should return a random widebody seat', () => {
          const seat = faker.airline.seat({ aircraftType: Aircraft.Widebody });
          const matchResult = seatRegex.exec(seat);
          expectNotNull(matchResult);
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 60);
          expect(seatLetter).toMatch(/^[A-HJ-K]$/);
        });
      });

      describe(`aircraftType()`, () => {
        it('should return a random aircraft type from the Aircraft enum', () => {
          const aircraft = faker.airline.aircraftType();
          expect(Object.values(Aircraft)).toContain(aircraft);
        });
      });

      describe(`flightNumber()`, () => {
        it('should return a random flight number', () => {
          const flightNumber = faker.airline.flightNumber();
          expect(flightNumber).toMatch(/^[1-9][0-9]{0,3}$/);
        });
        it('should return a random flight number with 3 digits', () => {
          const flightNumber = faker.airline.flightNumber({ length: 3 });
          expect(flightNumber).toMatch(/^[1-9][0-9]{2}$/);
        });
        it('should return a random flight number with 2 to 4 digits', () => {
          const flightNumber = faker.airline.flightNumber({
            length: { min: 2, max: 4 },
          });
          expect(flightNumber).toMatch(/^[1-9][0-9]{1,3}$/);
        });
        it('should return a random flight number with leading zeros', () => {
          const flightNumber = faker.airline.flightNumber({
            addLeadingZeros: true,
          });
          expect(flightNumber).toMatch(/^[0-9]{4}$/);
        });
        it('should return a random flight number with 3 digits and leading zeros', () => {
          const flightNumber = faker.airline.flightNumber({
            length: 3,
            addLeadingZeros: true,
          });
          expect(flightNumber).toMatch(/^[0-9][1-9][0-9]{2}$/);
        });
        it('should return a random flight number with 2 to 4 digits and leading zeros', () => {
          const flightNumber = faker.airline.flightNumber({
            length: { min: 2, max: 4 },
            addLeadingZeros: true,
          });
          expect(flightNumber).toMatch(/^[0-9]{1,4}$/);
        });
      });
    }
  );
});

function expectNotNull<T>(value: T): asserts value is NonNullable<T> {
  expect(value).not.toBeNull();
}
