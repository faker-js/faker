import { afterEach, describe, expect, it } from 'vitest';
import { Aircraft, faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('airline', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'airline', (t) => {
    t.itEach('airportCode', 'aircraftType');
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
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`airportCode()`, () => {
        it('should return a random value from airport array', () => {
          const airport = faker.airline.airportCode();
          expect(faker.definitions.airline.airport).toContain(airport);
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
          const matchResult = seat.match(seatRegex);
          expect(matchResult).not.toBeNull();
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 35);
          expect(seatLetter).toMatch(/^[A-F]$/);
        });
        it('should return a random narrowbody seat', () => {
          const seat = faker.airline.seat({
            aircraftType: Aircraft.Narrowbody,
          });
          const matchResult = seat.match(seatRegex);
          expect(matchResult).not.toBeNull();
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 35);
          expect(seatLetter).toMatch(/^[A-F]$/);
        });
        it('should return a random regional seat', () => {
          const seat = faker.airline.seat({ aircraftType: Aircraft.Regional });
          const matchResult = seat.match(seatRegex);
          expect(matchResult).not.toBeNull();
          const row = matchResult[1];
          const seatLetter = matchResult[2];
          expect(row).toSatisfy((row: number) => row >= 1 && row <= 20);
          expect(seatLetter).toMatch(/^[A-D]$/);
        });
        it('should return a random widebody seat', () => {
          const seat = faker.airline.seat({ aircraftType: Aircraft.Widebody });
          const matchResult = seat.match(seatRegex);
          expect(matchResult).not.toBeNull();
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
    }
  });
});
