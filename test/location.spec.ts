import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';
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

describe('location', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'location', (t) => {
    t.itEach('street', 'streetName');

    t.it('buildingNumber');

    t.it('secondaryAddress');
    t.describe('streetAddress', (t) => {
      t.it('noArgs')
        .it('with useFullAddress = true', true)
        .it('with useFullAddress = false', false);
    });

    t.itEach('city', 'cityName');

    t.it('county');

    t.it('country').describe('countryCode', (t) => {
      t.it('noArgs')
        .it('with code = alpha-2', 'alpha-2')
        .it('with code = alpha-3', 'alpha-3');
    });

    t.describe('latitude', (t) => {
      t.it('noArgs');
    });
    t.describe('longitude', (t) => {
      t.it('noArgs');
    });

    t.describe('nearbyGPSCoordinate', (t) => {
      t.it('noArgs').it('near origin', [0, 0]);
    });
    t.it('state').it('stateAbbr');

    t.it('timeZone');

    t.describeEach(
      'direction',
      'cardinalDirection',
      'ordinalDirection'
    )((t) => {
      t.it('noArgs')
        .it('with abbr = true', true)
        .it('with abbr = false', false);
    });

    t.describe('zipCode', (t) => {
      t.it('noArgs').it('with format', '###-###');
    });

    t.describe('zipCodeByState', (t) => {
      t.it('state', 'CA');
      t.it('state2', 'WA');
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('countryCode()', () => {
        it('returns random alpha-3 countryCode', () => {
          const countryCode = faker.location.countryCode('alpha-3');

          expect(countryCode).toBeTruthy();
          expect(
            countryCode.length,
            'The countryCode should be 3 characters long'
          ).toBe(3);
        });
      });

      describe('zipCode()', () => {
        it('returns random zipCode - user specified format', () => {
          let zipCode = faker.location.zipCode('?#? #?#');

          expect(zipCode).toMatch(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/);

          // try another format
          zipCode = faker.location.zipCode('###-###');

          expect(zipCode).toMatch(/^\d{3}-\d{3}$/);
        });

        it('returns zipCode with proper locale format', () => {
          // we'll use the en_CA locale..
          faker.locale = 'en_CA';
          const zipCode = faker.location.zipCode();

          expect(zipCode).toMatch(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/);
        });
      });

      describe('zipCodeByState()', () => {
        it('returns zipCode valid for specified State', () => {
          faker.locale = 'en_US';
          const states = ['IL', 'GA', 'WA'];

          const zipCode1 = +faker.location.zipCodeByState(states[0]);
          expect(zipCode1).toBeGreaterThanOrEqual(60001);
          expect(zipCode1).toBeLessThanOrEqual(62999);

          const zipCode2 = +faker.location.zipCodeByState(states[1]);
          expect(zipCode2).toBeGreaterThanOrEqual(30001);
          expect(zipCode2).toBeLessThanOrEqual(31999);

          const zipCode3 = +faker.location.zipCodeByState(states[2]);
          expect(zipCode3).toBeGreaterThanOrEqual(98001);
          expect(zipCode3).toBeLessThanOrEqual(99403);
        });
      });

      describe('latitude()', () => {
        it('returns a number', () => {
          const latitude = faker.location.latitude();

          expect(latitude).toBeTypeOf('number');
        });

        it('returns random latitude', () => {
          const latitude = faker.location.latitude();

          expect(latitude).toBeGreaterThanOrEqual(-90.0);
          expect(latitude).toBeLessThanOrEqual(90.0);
        });

        it('returns latitude with min and max and default precision', () => {
          const latitude = faker.location.latitude(5, -5);

          expect(
            latitude.toString().split('.')[1].length,
            'The precision of latitude should be 4 digits'
          ).lessThanOrEqual(4);

          expect(latitude).toBeGreaterThanOrEqual(-5);
          expect(latitude).toBeLessThanOrEqual(5);
        });

        it('returns random latitude with custom precision', () => {
          const latitude = faker.location.latitude(undefined, undefined, 7);

          expect(
            latitude.toString().split('.')[1].length,
            'The precision of latitude should be 7 digits'
          ).lessThanOrEqual(7);

          expect(latitude).toBeGreaterThanOrEqual(-180);
          expect(latitude).toBeLessThanOrEqual(180);
        });
      });

      describe('longitude()', () => {
        it('returns a number', () => {
          const longitude = faker.location.longitude();

          expect(longitude).toBeTypeOf('number');
        });

        it('returns random longitude', () => {
          const longitude = faker.location.longitude();

          expect(longitude).toBeGreaterThanOrEqual(-180);
          expect(longitude).toBeLessThanOrEqual(180);
        });

        it('returns random longitude with min and max and default precision', () => {
          const longitude = faker.location.longitude(100, -30);

          expect(
            longitude.toString().split('.')[1].length,
            'The precision of longitude should be 4 digits'
          ).lessThanOrEqual(4);

          expect(longitude).toBeGreaterThanOrEqual(-30);
          expect(longitude).toBeLessThanOrEqual(100);
        });

        it('returns random longitude with custom precision', () => {
          const longitude = faker.location.longitude(undefined, undefined, 7);

          expect(
            longitude.toString().split('.')[1].length,
            'The precision of longitude should be 7 digits'
          ).lessThanOrEqual(7);

          expect(longitude).toBeGreaterThanOrEqual(-180);
          expect(longitude).toBeLessThanOrEqual(180);
        });
      });

      describe('direction()', () => {
        it('returns abbreviation when useAbbr is true', () => {
          const direction = faker.location.direction(true);
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
          const ordinalDirection = faker.location.ordinalDirection(true);
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
          const cardinalDirection = faker.location.cardinalDirection(true);
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
            it(`should return random gps coordinate within a distance of another one (${JSON.stringify(
              { isMetric, radius }
            )})`, () => {
              const latitude1 = +faker.location.latitude();
              const longitude1 = +faker.location.longitude();

              const coordinate = faker.location.nearbyGPSCoordinate(
                [latitude1, longitude1],
                radius,
                isMetric
              );

              expect(coordinate.length).toBe(2);
              expect(coordinate[0]).toBeTypeOf('number');
              expect(coordinate[1]).toBeTypeOf('number');

              const latitude2 = coordinate[0];
              expect(latitude2).toBeGreaterThanOrEqual(-90.0);
              expect(latitude2).toBeLessThanOrEqual(90.0);

              const longitude2 = coordinate[1];
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
            });
          }
        }
      });
    }
  });
});
