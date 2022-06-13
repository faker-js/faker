import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
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

const seededRuns = [
  {
    seed: 42,
    expectations: {
      city: 'Port Valentine',
      cityPrefix: 'West',
      citySuffix: 'bury',
      cityName: 'Gulfport',
      streetName: 'Peyton Village',
      streetPrefix: 'b',
      streetSuffix: 'Isle',
      streetAddress: '7917 Metz Pine',
      fullStreetAddress: '7917 Metz Pine Apt. 410',
      secondaryAddress: 'Apt. 791',
      county: 'Berkshire',
      country: 'Haiti',
      countryCode: 'GY',
      state: 'Maine',
      stateAbbr: 'ME',
      zipCode: '79177',
      direction: 'South',
      directionNonAbbr: 'South',
      directionAbbr: 'S',
      ordinalDirection: 'Northwest',
      ordinalDirectionAbbr: 'NW',
      cardinalDirection: 'East',
      cardinalDirectionAbbr: 'E',
      timeZone: 'Europe/Amsterdam',
      nearbyGpsCoordinates: ['0.0814', '-0.0809'],
    },
  },
  {
    seed: 1337,
    expectations: {
      city: 'New Carmelo',
      cityPrefix: 'West',
      citySuffix: 'boro',
      cityName: 'Dubuque',
      streetName: 'Keith Dam',
      streetPrefix: 'a',
      streetSuffix: 'Forks',
      streetAddress: '51225 Alexys Haven',
      fullStreetAddress: '51225 Alexys Haven Apt. 552',
      secondaryAddress: 'Apt. 512',
      county: 'Bedfordshire',
      country: 'Equatorial Guinea',
      countryCode: 'EH',
      state: 'Indiana',
      stateAbbr: 'IN',
      zipCode: '51225',
      direction: 'South',
      directionNonAbbr: 'South',
      directionAbbr: 'S',
      ordinalDirection: 'Northwest',
      ordinalDirectionAbbr: 'NW',
      cardinalDirection: 'East',
      cardinalDirectionAbbr: 'E',
      timeZone: 'Africa/Casablanca',
      nearbyGpsCoordinates: ['0.0806', '-0.0061'],
    },
  },
  {
    seed: 1211,
    expectations: {
      city: 'La Crosse',
      cityPrefix: 'Fort',
      citySuffix: 'shire',
      cityName: 'Urbana',
      streetName: 'Koch Turnpike',
      streetPrefix: 'c',
      streetSuffix: 'Via',
      streetAddress: '487 Breana Wells',
      fullStreetAddress: '487 Breana Wells Apt. 616',
      secondaryAddress: 'Suite 487',
      county: 'Cambridgeshire',
      country: 'Uganda',
      countryCode: 'UM',
      state: 'Washington',
      stateAbbr: 'WA',
      zipCode: '48721-9061',
      direction: 'Southwest',
      directionNonAbbr: 'Southwest',
      directionAbbr: 'SW',
      ordinalDirection: 'Southwest',
      ordinalDirectionAbbr: 'SW',
      cardinalDirection: 'West',
      cardinalDirectionAbbr: 'W',
      timeZone: 'Asia/Magadan',
      nearbyGpsCoordinates: ['-0.0287', '0.0596'],
    },
  },
];

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

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.address[functionName]();
          expect(actual).toBe(expectations[functionName]);
        });
      }

      describe('streetAddress()', () => {
        it('should return street name with a building number', () => {
          faker.seed(seed);

          const address = faker.address.streetAddress();

          expect(address).toStrictEqual(expectations.streetAddress);
        });

        it('should return street name with a building number and a secondary address', () => {
          faker.seed(seed);

          const address = faker.address.streetAddress(true);
          expect(address).toEqual(expectations.fullStreetAddress);
        });
      });

      describe('direction()', () => {
        it('returns random direction', () => {
          faker.seed(seed);

          const direction = faker.address.direction();
          const expected = expectations.direction;

          expect(
            direction,
            `The random direction should be equal to ${expected}`
          ).toBe(expected);
        });

        it('should not return abbreviation when useAbbr is false', () => {
          faker.seed(seed);

          const direction = faker.address.direction(false);
          const expected = expectations.directionNonAbbr;

          expect(
            direction,
            `The abbreviation of direction when useAbbr is false should be equal ${expected}. Current is ${direction}`
          ).toBe(expected);
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const direction = faker.address.direction(true);
          const expected = expectations.directionAbbr;

          expect(
            direction,
            `The abbreviation of direction when useAbbr is true should be equal ${expected}. Current is ${direction}`
          ).toBe(expected);
        });
      });

      describe('ordinalDirection()', () => {
        it('returns random ordinal direction', () => {
          faker.seed(seed);

          const ordinalDirection = faker.address.ordinalDirection();
          const expected = expectations.ordinalDirection;

          expect(
            ordinalDirection,
            `The ransom ordinal direction should be equal ${expected}. Current is ${ordinalDirection}`
          ).toBe(expected);
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const ordinalDirection = faker.address.ordinalDirection(true);
          const expected = expectations.ordinalDirectionAbbr;

          expect(
            ordinalDirection,
            `The ordinal direction when useAbbr is true should be equal ${expected}. Current is ${ordinalDirection}`
          ).toBe(expected);
        });
      });

      describe('cardinalDirection()', () => {
        it('returns random cardinal direction', () => {
          faker.seed(seed);

          const cardinalDirection = faker.address.cardinalDirection();
          const expected = expectations.cardinalDirection;

          expect(
            cardinalDirection,
            `The random cardinal direction should be equal ${expected}. Current is ${cardinalDirection}`
          ).toBe(expected);
        });

        it('returns abbreviation when useAbbr is true', () => {
          faker.seed(seed);

          const cardinalDirection = faker.address.cardinalDirection(true);
          const expected = expectations.cardinalDirectionAbbr;

          expect(
            cardinalDirection,
            `The cardinal direction when useAbbr is true should be equal ${expected}. Current is ${cardinalDirection}`
          ).toBe(expected);
        });
      });

      describe('nearbyGPSCoordinate()', () => {
        it('returns expected coordinates', () => {
          faker.seed(seed);

          // this input is required for all expected results for this function
          const coordsInput: [number, number] = [0, 0];
          const coords = faker.address.nearbyGPSCoordinate(coordsInput);
          expect(coords).toEqual(expectations.nearbyGpsCoordinates);
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
        // all coordinate type combinations
        const coordinates: [string | number, string | number][] = [
          [faker.address.latitude(), faker.address.longitude()],
          [+faker.address.latitude(), +faker.address.longitude()],
          [+faker.address.latitude(), faker.address.longitude()],
          [faker.address.latitude(), +faker.address.longitude()],
        ];

        for (const [latitude, longitude] of coordinates) {
          for (const isMetric of [true, false]) {
            for (const radius of times(100)) {
              it.each(times(5))(
                `should return random gps coordinate within a distance of another one ([${typeof latitude}, ${typeof longitude}]) (${JSON.stringify(
                  { isMetric, radius }
                )}) (iter: %s)`,
                () => {
                  const coordinate = faker.address.nearbyGPSCoordinate(
                    [latitude, longitude],
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
                    +latitude,
                    +longitude,
                    latitude2,
                    longitude2,
                    isMetric
                  );
                  expect(actualDistance).toBeLessThanOrEqual(radius);
                }
              );
            }
          }
        }
      });
    }
  });
});
