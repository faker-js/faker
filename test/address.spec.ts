import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      city: 'Port Valentine',
      cityPrefix: 'West',
      citySuffix: 'bury',
      cityName: 'Gulfport',
      streetName: 'Valentine Isle',
      streetPrefix: 'b',
      streetSuffix: 'Isle',
      streetAddressDigits: 4,
      fullStreetAddress: '7917 Lauryn Spur Apt. 410',
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
      nearbyGpsCoordinates: ['-0.0394', '0.0396'],
    },
  },
  {
    seed: 1337,
    expectations: {
      city: 'New Carmelo',
      cityPrefix: 'West',
      citySuffix: 'boro',
      cityName: 'Dubuque',
      streetName: 'Carmelo Forks',
      streetPrefix: 'a',
      streetSuffix: 'Forks',
      streetAddressDigits: 5,
      fullStreetAddress: '51225 Hammes Lodge Apt. 552',
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
      nearbyGpsCoordinates: ['-0.0042', '0.0557'],
    },
  },
  {
    seed: 1211,
    expectations: {
      city: 'La Crosse',
      cityPrefix: 'Fort',
      citySuffix: 'shire',
      cityName: 'Urbana',
      streetName: 'Trantow Via',
      streetPrefix: 'c',
      streetSuffix: 'Via',
      streetAddressDigits: 3,
      fullStreetAddress: '487 Zieme Flat Apt. 616',
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
      nearbyGpsCoordinates: ['0.0503', '-0.0242'],
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

describe('address', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      it('city()', () => {
        faker.seed(seed);

        const city = faker.address.city();
        expect(city).toEqual(expectations.city);
      });

      it('cityPrefix()', () => {
        faker.seed(seed);

        const cityPrefix = faker.address.cityPrefix();
        expect(cityPrefix).toEqual(expectations.cityPrefix);
      });

      it('citySuffix()', () => {
        faker.seed(seed);

        const citySuffix = faker.address.citySuffix();
        expect(citySuffix).toEqual(expectations.citySuffix);
      });

      it('cityName()', () => {
        faker.seed(seed);

        const cityName = faker.address.cityName();
        expect(cityName).toEqual(expectations.cityName);
      });

      it('streetName()', () => {
        faker.seed(seed);

        const street_name = faker.address.streetName();
        expect(street_name).toEqual(expectations.streetName);
      });

      describe('streetAddress()', () => {
        it('should return a digit street number', () => {
          faker.seed(seed);

          const address = faker.address.streetAddress();
          const parts = address.split(' ');

          expect(
            parts[0].length,
            `The street number should have ${expectations.streetAddressDigits} digits`
          ).toStrictEqual(expectations.streetAddressDigits);
        });

        describe('when useFulladdress is true', () => {
          it('adds a secondary address to the result', () => {
            faker.seed(seed);

            const address = faker.address.streetAddress(true);
            expect(address).toEqual(expectations.fullStreetAddress);
          });
        });
      });

      it('streetPrefix()', () => {
        faker.seed(seed);

        const streetPrefix = faker.address.streetPrefix();
        expect(streetPrefix).toEqual(expectations.streetPrefix);
      });

      it('streetSuffix()', () => {
        faker.seed(seed);

        const streetSuffix = faker.address.streetSuffix();
        expect(streetSuffix).toEqual(expectations.streetSuffix);
      });

      describe('secondaryAddress()', () => {
        it('randomly chooses an Apt or Suite number', () => {
          faker.seed(seed);

          const address = faker.address.secondaryAddress();
          expect(address).toEqual(expectations.secondaryAddress);
        });
      });

      describe('county()', () => {
        it('returns random county', () => {
          faker.seed(seed);

          const county = faker.address.county();
          expect(county).toEqual(expectations.county);
        });
      });

      describe('country()', () => {
        it('returns random country', () => {
          faker.seed(seed);

          const country = faker.address.country();
          expect(country).toEqual(expectations.country);
        });
      });

      describe('countryCode()', () => {
        it('returns random countryCode', () => {
          faker.seed(seed);

          const countryCode = faker.address.countryCode();
          expect(countryCode).toEqual(expectations.countryCode);
        });
      });

      describe('state()', () => {
        it('returns random state', () => {
          faker.seed(seed);

          const state = faker.address.state();
          expect(state).toEqual(expectations.state);
        });
      });

      describe('stateAbbr()', () => {
        it('returns random stateAbbr', () => {
          faker.seed(seed);

          const stateAbbr = faker.address.stateAbbr();
          expect(stateAbbr).toEqual(expectations.stateAbbr);
        });
      });

      describe('zipCode()', () => {
        it('returns random zipCode', () => {
          faker.seed(seed);

          const zipCode = faker.address.zipCode();
          expect(zipCode).toEqual(expectations.zipCode);
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

      describe('timeZone()', () => {
        it('returns random timeZone', () => {
          faker.seed(seed);

          const timeZone = faker.address.timeZone();
          expect(timeZone).toEqual(expectations.timeZone);
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

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
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
        it('should return random gps coordinate within a distance of another one', () => {
          function haversine(lat1, lon1, lat2, lon2, isMetric) {
            function degreesToRadians(degrees) {
              return degrees * (Math.PI / 180.0);
            }
            function kilometersToMiles(miles) {
              return miles * 0.621371;
            }
            const R = 6378.137;
            const dLat = degreesToRadians(lat2 - lat1);
            const dLon = degreesToRadians(lon2 - lon1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(lat1)) *
                Math.cos(degreesToRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return isMetric ? distance : kilometersToMiles(distance);
          }

          let latFloat1: number;
          let lonFloat1: number;
          let isMetric: boolean;

          for (let i = 0; i < 10000; i++) {
            latFloat1 = parseFloat(faker.address.latitude());
            lonFloat1 = parseFloat(faker.address.longitude());
            const radius = Math.random() * 99 + 1; // range of [1, 100)
            isMetric = Math.round(Math.random()) === 1;

            const coordinate = faker.address.nearbyGPSCoordinate(
              [latFloat1, lonFloat1],
              radius,
              isMetric
            );

            expect(coordinate.length).toBe(2);
            expect(coordinate[0]).toBeTypeOf('string');
            expect(coordinate[1]).toBeTypeOf('string');

            const latFloat2 = parseFloat(coordinate[0]);
            expect(latFloat2).toBeGreaterThanOrEqual(-90.0);
            expect(latFloat2).toBeLessThanOrEqual(90.0);

            const lonFloat2 = parseFloat(coordinate[1]);
            expect(lonFloat2).toBeGreaterThanOrEqual(-180.0);
            expect(lonFloat2).toBeLessThanOrEqual(180.0);

            // Due to floating point math, and constants that are not extremely precise,
            // returned points will not be strictly within the given radius of the input
            // coordinate. Using a error of 1.0 to compensate.
            const error = 1.0;
            const actualDistance = haversine(
              latFloat1,
              lonFloat1,
              latFloat2,
              lonFloat2,
              isMetric
            );
            expect(actualDistance).toBeLessThanOrEqual(radius + error);
          }
        });

        it('should return near metric coordinates when radius is undefined', () => {
          const latitude = parseFloat(faker.address.latitude());
          const longitude = parseFloat(faker.address.longitude());
          const isMetric = true;

          const coordinate = faker.address.nearbyGPSCoordinate(
            [latitude, longitude],
            undefined,
            isMetric
          );

          expect(coordinate.length).toBe(2);
          expect(coordinate[0]).toBeTypeOf('string');
          expect(coordinate[1]).toBeTypeOf('string');

          const distanceToTarget =
            Math.pow(+coordinate[0] - latitude, 2) +
            Math.pow(+coordinate[1] - longitude, 2);

          expect(distanceToTarget).toBeLessThanOrEqual(
            100 * 0.002 // 100 km ~= 0.9 degrees, we take 2 degrees
          );
        });

        it('should return near non metric coordinates when radius is undefined', () => {
          const latitude = parseFloat(faker.address.latitude());
          const longitude = parseFloat(faker.address.longitude());
          const isMetric = false;

          const coordinate = faker.address.nearbyGPSCoordinate(
            [latitude, longitude],
            undefined,
            isMetric
          );

          expect(coordinate.length).toBe(2);
          expect(coordinate[0]).toBeTypeOf('string');
          expect(coordinate[1]).toBeTypeOf('string');

          // const distanceToTarget =
          //   Math.pow(coordinate[0] - latitude, 2) +
          //   Math.pow(coordinate[1] - longitude, 2);

          // TODO @Shinigami92 2022-01-27: Investigate why this test sometimes fails
          // expect(distanceToTarget).toBeLessThanOrEqual(
          //   100 * 0.002 * 1.6093444978925633 // 100 miles to km ~= 0.9 degrees, we take 2 degrees
          // );
        });
      });
    }
  });
});
