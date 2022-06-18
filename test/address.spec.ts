import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180.0);
}

function kilometersToMiles(miles: number) {
  return miles * 0.621371;
}

// http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
const EQUATORIAL_EARTH_RADIUS = 6378.137;

function haversine(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
  isMetric: boolean
) {
  const distanceLatitude = degreesToRadians(latitude2 - latitude1);
  const distanceLongitude = degreesToRadians(longitude2 - longitude1);
  const a =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.cos(degreesToRadians(latitude1)) *
      Math.cos(degreesToRadians(latitude2)) *
      Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2);
  const distance =
    EQUATORIAL_EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return isMetric ? distance : kilometersToMiles(distance);
}

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'city',
  'cityPrefix',
  'citySuffix',
  'cityName',
  'streetName',
  'streetPrefix',
  'streetSuffix',
  'secondaryAddress',
  'county',
  'country',
  'countryCode',
  'state',
  'stateAbbr',
  'zipCode',
  'timeZone',
];

describe('address', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.address[functionName]();
          expect(actual).toMatchSnapshot();
        });
      }

      describe('streetAddress()', () => {
        it('should return street name with a building number', () => {
          faker.seed(seed);

          const address = faker.address.streetAddress();

          expect(address).toMatchSnapshot();
        });

        it('should return street name with a building number and a secondary address', () => {
          faker.seed(seed);

          const address = faker.address.streetAddress(true);

          expect(address).toMatchSnapshot();
        });
      });

      describe('direction()', () => {
        it('returns random direction', () => {
          faker.seed(seed);

          const direction = faker.address.direction();

          expect(direction).toMatchSnapshot();
        });

        it('should not return abbreviation when useAbbr is false', () => {
          faker.seed(seed);

          const direction = faker.address.direction(false);

          expect(direction).toMatchSnapshot();
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const direction = faker.address.direction(true);

          expect(direction).toMatchSnapshot();
        });
      });

      describe('ordinalDirection()', () => {
        it('returns random ordinal direction', () => {
          faker.seed(seed);

          const ordinalDirection = faker.address.ordinalDirection();

          expect(ordinalDirection).toMatchSnapshot();
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const ordinalDirection = faker.address.ordinalDirection(true);

          expect(ordinalDirection).toMatchSnapshot();
        });
      });

      describe('cardinalDirection()', () => {
        it('returns random cardinal direction', () => {
          faker.seed(seed);

          const cardinalDirection = faker.address.cardinalDirection();

          expect(cardinalDirection).toMatchSnapshot();
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const cardinalDirection = faker.address.cardinalDirection(true);

          expect(cardinalDirection).toMatchSnapshot();
        });
      });

      describe('nearbyGPSCoordinate()', () => {
        it('returns expected coordinates', () => {
          faker.seed(seed);

          // this input is required for all expected results for this function
          const coordsInput: [number, number] = [0, 0];
          const coords = faker.address.nearbyGPSCoordinate(coordsInput);

          expect(coords).toMatchSnapshot();
        });
      });
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('countryCode()', () => {
        it('returns random alpha-3 countryCode', () => {
          const countryCode = faker.address.countryCode('alpha-3');

          expect(countryCode).toBeTruthy();
          expect(
            countryCode.length,
            'The countryCode should be 3 characters long'
          ).toBe(3);
        });
      });

      describe('zipCode()', () => {
        it('returns random zipCode - user specified format', () => {
          let zipCode = faker.address.zipCode('?#? #?#');

          expect(zipCode).toMatch(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/);

          // try another format
          zipCode = faker.address.zipCode('###-###');

          expect(zipCode).toMatch(/^\d{3}-\d{3}$/);
        });

        it('returns zipCode with proper locale format', () => {
          // we'll use the en_CA locale..
          faker.locale = 'en_CA';
          const zipCode = faker.address.zipCode();

          expect(zipCode).toMatch(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/);
        });
      });

      describe('zipCodeByState()', () => {
        it('returns zipCode valid for specified State', () => {
          faker.locale = 'en_US';
          const states = ['IL', 'GA', 'WA'];

          const zipCode1 = +faker.address.zipCodeByState(states[0]);
          expect(zipCode1).toBeGreaterThanOrEqual(60001);
          expect(zipCode1).toBeLessThanOrEqual(62999);

          const zipCode2 = +faker.address.zipCodeByState(states[1]);
          expect(zipCode2).toBeGreaterThanOrEqual(30001);
          expect(zipCode2).toBeLessThanOrEqual(31999);

          const zipCode3 = +faker.address.zipCodeByState(states[2]);
          expect(zipCode3).toBeGreaterThanOrEqual(98001);
          expect(zipCode3).toBeLessThanOrEqual(99403);
        });
      });

      describe('latitude()', () => {
        it('returns random latitude', () => {
          for (let i = 0; i < 100; i++) {
            const latitude = faker.address.latitude();

            expect(latitude).toBeTypeOf('string');

            const latitude_float = parseFloat(latitude);

            expect(latitude_float).toBeGreaterThanOrEqual(-90.0);
            expect(latitude_float).toBeLessThanOrEqual(90.0);
          }
        });

        it('returns latitude with min and max and default precision', () => {
          for (let i = 0; i < 100; i++) {
            const latitude = faker.address.latitude(5, -5);

            expect(latitude).toBeTypeOf('string');
            expect(
              latitude.split('.')[1].length,
              'The precision of latitude should be 4 digits'
            ).toBe(4);

            const latitude_float = parseFloat(latitude);

            expect(latitude_float).toBeGreaterThanOrEqual(-5);
            expect(latitude_float).toBeLessThanOrEqual(5);
          }
        });

        it('returns random latitude with custom precision', () => {
          for (let i = 0; i < 100; i++) {
            const latitude = faker.address.latitude(undefined, undefined, 7);

            expect(latitude).toBeTypeOf('string');
            expect(
              latitude.split('.')[1].length,
              'The precision of latitude should be 7 digits'
            ).toBe(7);

            const latitude_float = parseFloat(latitude);

            expect(latitude_float).toBeGreaterThanOrEqual(-180);
            expect(latitude_float).toBeLessThanOrEqual(180);
          }
        });
      });

      describe('longitude()', () => {
        it('returns random longitude', () => {
          for (let i = 0; i < 100; i++) {
            const longitude = faker.address.longitude();

            expect(longitude).toBeTypeOf('string');

            const longitude_float = parseFloat(longitude);

            expect(longitude_float).toBeGreaterThanOrEqual(-180);
            expect(longitude_float).toBeLessThanOrEqual(180);
          }
        });

        it('returns random longitude with min and max and default precision', () => {
          for (let i = 0; i < 100; i++) {
            const longitude = faker.address.longitude(100, -30);

            expect(longitude).toBeTypeOf('string');
            expect(
              longitude.split('.')[1].length,
              'The precision of longitude should be 4 digits'
            ).toBe(4);

            const longitude_float = parseFloat(longitude);

            expect(longitude_float).toBeGreaterThanOrEqual(-30);
            expect(longitude_float).toBeLessThanOrEqual(100);
          }
        });

        it('returns random longitude with custom precision', () => {
          for (let i = 0; i < 100; i++) {
            const longitude = faker.address.longitude(undefined, undefined, 7);

            expect(longitude).toBeTypeOf('string');
            expect(
              longitude.split('.')[1].length,
              'The precision of longitude should be 7 digits'
            ).toBe(7);

            const longitude_float = parseFloat(longitude);

            expect(longitude_float).toBeGreaterThanOrEqual(-180);
            expect(longitude_float).toBeLessThanOrEqual(180);
          }
        });
      });

      describe('direction()', () => {
        it('returns abbreviation when useAbbr is true', () => {
          const direction = faker.address.direction(true);
          const lengthDirection = direction.length;
          const prefixErrorMessage =
            'The abbreviation of direction when useAbbr is true should';

          expect(
            direction,
            `${prefixErrorMessage} be of type string. Current is ${typeof direction}`
          ).toBeTypeOf('string');
          expect(lengthDirection).toBeLessThanOrEqual(2);
        });
      });

      describe('ordinalDirection()', () => {
        it('returns abbreviation when useAbbr is true', () => {
          const ordinalDirection = faker.address.ordinalDirection(true);
          const expectedType = 'string';
          const ordinalDirectionLength = ordinalDirection.length;
          const prefixErrorMessage =
            'The ordinal direction when useAbbr is true should';

          expect(
            ordinalDirection,
            `${prefixErrorMessage} be equal ${expectedType}. Current is ${typeof ordinalDirection}`
          ).toBeTypeOf(expectedType);
          expect(ordinalDirectionLength).toBeLessThanOrEqual(2);
        });
      });

      describe('cardinalDirection()', () => {
        it('returns abbreviation when useAbbr is true', () => {
          const cardinalDirection = faker.address.cardinalDirection(true);
          const expectedType = 'string';
          const cardinalDirectionLength = cardinalDirection.length;
          const prefixErrorMessage =
            'The cardinal direction when useAbbr is true should';

          expect(
            cardinalDirection,
            `${prefixErrorMessage} be of type ${expectedType}. Current is ${typeof cardinalDirection}`
          ).toBeTypeOf(expectedType);
          expect(cardinalDirectionLength).toBeLessThanOrEqual(2);
        });
      });

      describe('nearbyGPSCoordinate()', () => {
        for (const isMetric of [true, false]) {
          for (const radius of times(100)) {
            it.each(times(5))(
              `should return random gps coordinate within a distance of another one (${JSON.stringify(
                { isMetric, radius }
              )}) (iter: %s)`,
              () => {
                const latitude1 = +faker.address.latitude();
                const longitude1 = +faker.address.longitude();

                const coordinate = faker.address.nearbyGPSCoordinate(
                  [latitude1, longitude1],
                  radius,
                  isMetric
                );

                expect(coordinate.length).toBe(2);
                expect(coordinate[0]).toBeTypeOf('string');
                expect(coordinate[1]).toBeTypeOf('string');

                const latitude2 = +coordinate[0];
                expect(latitude2).toBeGreaterThanOrEqual(-90.0);
                expect(latitude2).toBeLessThanOrEqual(90.0);

                const longitude2 = +coordinate[1];
                expect(longitude2).toBeGreaterThanOrEqual(-180.0);
                expect(longitude2).toBeLessThanOrEqual(180.0);

                const actualDistance = haversine(
                  latitude1,
                  longitude1,
                  latitude2,
                  longitude2,
                  isMetric
                );
                expect(actualDistance).toBeLessThanOrEqual(radius);
              }
            );
          }
        }
      });
    }
  });
});
