import type { JestMockCompat } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('address', () => {
  describe('city()', () => {
    let spy_address_cityPrefix: JestMockCompat<[], string>;
    let spy_name_firstName: JestMockCompat<[gender?: string | number], string>;
    let spy_name_lastName: JestMockCompat<[gender?: string | number], string>;
    let spy_address_citySuffix: JestMockCompat<[], string>;

    beforeEach(() => {
      spy_address_cityPrefix = vi.spyOn(faker.address, 'cityPrefix');
      spy_name_firstName = vi.spyOn(faker.name, 'firstName');
      spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      spy_address_citySuffix = vi.spyOn(faker.address, 'citySuffix');
    });

    afterEach(() => {
      // faker.datatype.number.restore();
      spy_address_cityPrefix.mockRestore();
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
      spy_address_citySuffix.mockRestore();
    });

    it('occasionally returns prefix + first name + suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 0);

      const city = faker.address.city();
      expect(city).toBeTruthy();

      expect(spy_address_cityPrefix).toHaveBeenCalledOnce();
      expect(spy_name_firstName).toHaveBeenCalledOnce();
      expect(spy_address_citySuffix).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns prefix + first name', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 1);

      const city = faker.address.city();
      expect(city).toBeTruthy();

      expect(spy_address_cityPrefix).toHaveBeenCalledOnce();
      expect(spy_name_firstName).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns first name + suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 2);

      const city = faker.address.city();
      expect(city).toBeTruthy();

      expect(spy_address_citySuffix).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns last name + suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 3);

      const city = faker.address.city();
      expect(city).toBeTruthy();

      expect(spy_address_cityPrefix).not.toHaveBeenCalled();
      expect(spy_name_firstName).not.toHaveBeenCalled();
      expect(spy_name_lastName).toHaveBeenCalled();
      expect(spy_address_citySuffix).toHaveBeenCalled();

      spy_datatype_number.mockRestore();
    });
  });

  describe('streetName()', () => {
    let spy_name_firstName: JestMockCompat<[gender?: string | number], string>;
    let spy_name_lastName: JestMockCompat<[gender?: string | number], string>;
    let spy_address_streetSuffix: JestMockCompat<[], string>;

    beforeEach(() => {
      spy_name_firstName = vi.spyOn(faker.name, 'firstName');
      spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      spy_address_streetSuffix = vi.spyOn(faker.address, 'streetSuffix');
    });

    afterEach(() => {
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
      spy_address_streetSuffix.mockRestore();
    });

    it('occasionally returns last name + suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 0);

      const street_name = faker.address.streetName();
      expect(street_name).toBeTruthy();

      expect(spy_name_firstName).not.toHaveBeenCalled();
      expect(spy_name_lastName).toHaveBeenCalledOnce();
      expect(spy_address_streetSuffix).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns first name + suffix', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 1);

      const street_name = faker.address.streetName();
      expect(street_name).toBeTruthy();

      expect(spy_name_firstName).toHaveBeenCalledOnce();
      expect(spy_name_lastName).not.toHaveBeenCalled();
      expect(spy_address_streetSuffix).toHaveBeenCalledOnce();

      spy_datatype_number.mockRestore();
    });

    it('trims trailing whitespace from the name', () => {
      spy_address_streetSuffix.mockRestore();

      spy_address_streetSuffix.mockImplementation(() => '');

      const street_name = faker.address.streetName();
      expect(street_name).not.match(/ $/);

      spy_address_streetSuffix.mockRestore();
    });
  });

  describe('streetAddress()', () => {
    const errorExpectDigits = (expected) => {
      return 'The street number should be had ' + expected + ' digits';
    };

    let spy_address_streetName: JestMockCompat<[], string>;
    let spy_address_secondaryAddress: JestMockCompat<[], string>;

    beforeEach(() => {
      spy_address_streetName = vi.spyOn(faker.address, 'streetName');
      spy_address_secondaryAddress = vi.spyOn(
        faker.address,
        'secondaryAddress'
      );
    });

    afterEach(() => {
      spy_address_streetName.mockRestore();
      spy_address_secondaryAddress.mockRestore();
    });

    it('occasionally returns a 5-digit street number', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 0);

      const address = faker.address.streetAddress();
      const expected = 5;
      const parts = address.split(' ');

      expect(parts[0].length, errorExpectDigits(expected)).toBe(expected);
      expect(spy_address_streetName).toHaveBeenCalled();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns a 4-digit street number', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 1);

      const address = faker.address.streetAddress();
      const parts = address.split(' ');
      const expected = 4;

      expect(parts[0].length, errorExpectDigits(expected)).toBe(expected);
      expect(spy_address_streetName).toHaveBeenCalled();

      spy_datatype_number.mockRestore();
    });

    it('occasionally returns a 3-digit street number', () => {
      const spy_datatype_number = vi
        .spyOn(faker.datatype, 'number')
        .mockImplementation(() => 2);

      const address = faker.address.streetAddress();
      const parts = address.split(' ');
      const expected = 3;

      expect(parts[0].length, errorExpectDigits(expected)).toBe(expected);
      expect(spy_address_streetName).toHaveBeenCalled();
      expect(spy_address_secondaryAddress).not.toHaveBeenCalled();

      spy_datatype_number.mockRestore();
    });

    describe('when useFulladdress is true', () => {
      it('adds a secondary address to the result', () => {
        faker.address.streetAddress(true);

        expect(spy_address_secondaryAddress).toHaveBeenCalled();
      });
    });
  });

  describe('secondaryAddress()', () => {
    it('randomly chooses an Apt or Suite number', () => {
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');

      const address = faker.address.secondaryAddress();

      const expected_array = ['Apt. ###', 'Suite ###'];

      expect(address).toBeTruthy();
      expect(spy_random_arrayElement).toHaveBeenCalledWith(expected_array);
    });
  });

  describe('county()', () => {
    it('returns random county', () => {
      const spy_address_county = vi.spyOn(faker.address, 'county');

      const county = faker.address.county();

      expect(county).toBeTruthy();
      expect(spy_address_county).toHaveBeenCalled();
    });
  });

  describe('country()', () => {
    it('returns random country', () => {
      const spy_address_country = vi.spyOn(faker.address, 'country');

      const country = faker.address.country();

      expect(country).toBeTruthy();
      expect(spy_address_country).toHaveBeenCalled();
    });
  });

  describe('countryCode()', () => {
    it('returns random countryCode', () => {
      const spy_address_countryCode = vi.spyOn(faker.address, 'countryCode');

      const countryCode = faker.address.countryCode();

      expect(countryCode).toBeTruthy();
      expect(spy_address_countryCode).toHaveBeenCalled();
    });

    it('returns random alpha-3 countryCode', () => {
      const spy_address_countryCode = vi.spyOn(faker.address, 'countryCode');

      const countryCode = faker.address.countryCode('alpha-3');

      expect(countryCode).toBeTruthy();
      expect(spy_address_countryCode).toHaveBeenCalled();
      expect(
        countryCode.length,
        'The countryCode should be had 3 characters'
      ).toBe(3);
    });
  });

  describe('state()', () => {
    it('returns random state', () => {
      const spy_address_state = vi.spyOn(faker.address, 'state');

      const state = faker.address.state();

      expect(state).toBeTruthy();
      expect(spy_address_state).toHaveBeenCalled();
    });
  });

  describe('zipCode()', () => {
    it('returns random zipCode', () => {
      const spy_address_zipCode = vi.spyOn(faker.address, 'zipCode');

      const zipCode = faker.address.zipCode();

      expect(zipCode).toBeTruthy();
      expect(spy_address_zipCode).toHaveBeenCalled();
    });

    it('returns random zipCode - user specified format', () => {
      let zipCode = faker.address.zipCode('?#? #?#');

      expect(zipCode).match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/);

      // try another format
      zipCode = faker.address.zipCode('###-###');

      expect(zipCode).match(/^\d{3}-\d{3}$/);
    });

    it('returns zipCode with proper locale format', () => {
      // we'll use the en_CA locale..
      faker.locale = 'en_CA';
      const zipCode = faker.address.zipCode();

      expect(zipCode).match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/);
    });
  });

  describe('zipCodeByState()', () => {
    it('returns zipCode valid for specified State', () => {
      faker.locale = 'en_US';
      const states = ['IL', 'GA', 'WA'];

      const zipCode1 = faker.address.zipCodeByState(states[0]);
      expect(zipCode1).greaterThanOrEqual(60001);
      expect(zipCode1).lessThanOrEqual(62999);

      const zipCode2 = faker.address.zipCodeByState(states[1]);
      expect(zipCode2).greaterThanOrEqual(30001);
      expect(zipCode2).lessThanOrEqual(31999);

      const zipCode3 = faker.address.zipCodeByState(states[2]);
      expect(zipCode3).greaterThanOrEqual(98001);
      expect(zipCode3).lessThanOrEqual(99403);
    });

    it('returns undefined if state is invalid', () => {
      const state = 'XX';
      const spy_address_zipCode = vi.spyOn(faker.address, 'zipCode');

      faker.address.zipCodeByState(state);
      expect(spy_address_zipCode).toHaveBeenCalled();

      spy_address_zipCode.mockRestore();
    });

    it('returns undefined if state is valid but localeis invalid', () => {
      faker.locale = 'zh_CN';
      const state = 'IL';

      const spy_address_zipCode = vi.spyOn(faker.address, 'zipCode');

      faker.address.zipCodeByState(state);
      expect(spy_address_zipCode).toHaveBeenCalled();

      spy_address_zipCode.mockRestore();
    });
  });

  describe('latitude()', () => {
    it('returns random latitude', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const latitude = faker.address.latitude();

        expect(typeof latitude).toBe('string');

        const latitude_float = parseFloat(latitude);

        expect(latitude_float).greaterThanOrEqual(-90.0);
        expect(latitude_float).lessThanOrEqual(90.0);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });

    it('returns latitude with min and max and default precision', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const latitude = faker.address.latitude(-5, 5);

        expect(typeof latitude).toBe('string');
        expect(
          latitude.split('.')[1].length,
          'The precision of latitude should be had of 4 digits'
        ).toBe(4);

        const latitude_float = parseFloat(latitude);

        expect(latitude_float).greaterThanOrEqual(-5);
        expect(latitude_float).lessThanOrEqual(5);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });

    it('returns random latitude with custom precision', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const latitude = faker.address.latitude(undefined, undefined, 7);

        expect(typeof latitude).toBe('string');
        expect(
          latitude.split('.')[1].length,
          'The precision of latitude should be had of 7 digits'
        ).toBe(7);

        const latitude_float = parseFloat(latitude);

        expect(latitude_float).greaterThanOrEqual(-180);
        expect(latitude_float).lessThanOrEqual(180);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });
  });

  describe('longitude()', () => {
    it('returns random longitude', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const longitude = faker.address.longitude();

        expect(typeof longitude).toBe('string');

        const longitude_float = parseFloat(longitude);

        expect(longitude_float).greaterThanOrEqual(-180);
        expect(longitude_float).lessThanOrEqual(180);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });

    it('returns random longitude with min and max and default precision', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const longitude = faker.address.longitude(100, -30);

        expect(typeof longitude).toBe('string');
        expect(
          longitude.split('.')[1].length,
          'The precision of longitude should be had of 4 digits'
        ).toBe(4);

        const longitude_float = parseFloat(longitude);

        expect(longitude_float).greaterThanOrEqual(-30);
        expect(longitude_float).lessThanOrEqual(100);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });

    it('returns random longitude with custom precision', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      for (let i = 0; i < 100; i++) {
        const longitude = faker.address.longitude(undefined, undefined, 7);

        expect(typeof longitude).toBe('string');
        expect(
          longitude.split('.')[1].length,
          'The precision of longitude should be had of 7 digits'
        ).toBe(7);

        const longitude_float = parseFloat(longitude);

        expect(longitude_float).greaterThanOrEqual(-180);
        expect(longitude_float).lessThanOrEqual(180);
        expect(spy_datatype_number).toHaveBeenCalled();

        spy_datatype_number.mockRestore();
      }
    });
  });

  describe('direction()', () => {
    it('returns random direction', () => {
      // TODO @Shinigami92 2022-01-20: This test does nothing and should be rewritten
      const spy_address_direction = vi
        .spyOn(faker.address, 'direction')
        .mockReturnValue('North');

      const direction = faker.address.direction();
      const expected = 'North';

      expect(
        direction,
        'The random direction should be equals ' + expected
      ).toBe(expected);

      spy_address_direction.mockRestore();
    });

    it('returns abbreviation when useAbbr is false', () => {
      // TODO @Shinigami92 2022-01-20: This test does nothing and should be rewritten
      const spy_address_direction = vi
        .spyOn(faker.address, 'direction')
        .mockReturnValue('N');

      const direction = faker.address.direction(false);
      const expected = 'N';

      expect(
        direction,
        'The abbreviation of direction when useAbbr is false should be equals ' +
          expected +
          '. Current is ' +
          direction
      ).toBe(expected);

      spy_address_direction.mockRestore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const direction = faker.address.direction(true);
      const expectedType = 'string';
      const lengthDirection = direction.length;
      const prefixErrorMessage =
        'The abbreviation of direction when useAbbr is true should';

      expect(
        typeof direction,
        prefixErrorMessage + ' be typeof string. Current is' + typeof direction
      ).toBe(expectedType);
      expect(
        lengthDirection <= 2,
        prefixErrorMessage +
          ' have a length less or equals 2. Current is ' +
          lengthDirection
      ).toBe(true);
    });

    it('returns abbreviation when useAbbr is true', () => {
      const spy_address_direction = vi
        .spyOn(faker.address, 'direction')
        .mockReturnValue('N');

      const direction = faker.address.direction(true);
      const expected = 'N';

      expect(
        direction,
        'The abbreviation of direction when useAbbr is true should be equals ' +
          expected +
          '. Current is ' +
          direction
      ).toBe(expected);

      spy_address_direction.mockRestore();
    });
  });

  describe('ordinalDirection()', () => {
    it('returns random ordinal direction', () => {
      const spy_address_ordinalDirection = vi
        .spyOn(faker.address, 'ordinalDirection')
        .mockReturnValue('West');

      const ordinalDirection = faker.address.ordinalDirection();
      const expected = 'West';

      expect(
        ordinalDirection,
        'The ransom ordinal direction should be equals ' +
          expected +
          '. Current is ' +
          ordinalDirection
      ).toBe(expected);

      spy_address_ordinalDirection.mockRestore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const spy_address_ordinalDirection = vi
        .spyOn(faker.address, 'ordinalDirection')
        .mockReturnValue('W');

      const ordinalDirection = faker.address.ordinalDirection(true);
      const expected = 'W';

      expect(
        ordinalDirection,
        'The ordinal direction when useAbbr is true should be equals ' +
          expected +
          '. Current is ' +
          ordinalDirection
      ).toBe(expected);

      spy_address_ordinalDirection.mockRestore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const ordinalDirection = faker.address.ordinalDirection(true);
      const expectedType = 'string';
      const ordinalDirectionLength = ordinalDirection.length;
      const prefixErrorMessage =
        'The ordinal direction when useAbbr is true should';

      expect(
        typeof ordinalDirection,
        prefixErrorMessage +
          ' be had typeof equals ' +
          expectedType +
          '.Current is ' +
          typeof ordinalDirection
      ).toBe(expectedType);
      expect(
        ordinalDirectionLength <= 2,
        prefixErrorMessage +
          ' have a length less or equals 2. Current is ' +
          ordinalDirectionLength
      ).toBe(true);
    });
  });

  describe('cardinalDirection()', () => {
    it('returns random cardinal direction', () => {
      const spy_address_cardinalDirection = vi
        .spyOn(faker.address, 'cardinalDirection')
        .mockReturnValue('Northwest');

      const cardinalDirection = faker.address.cardinalDirection();
      const expected = 'Northwest';

      expect(
        cardinalDirection,
        'The random cardinal direction should be equals ' +
          expected +
          '. Current is ' +
          cardinalDirection
      ).toBe(expected);

      spy_address_cardinalDirection.mockRestore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const spy_address_cardinalDirection = vi
        .spyOn(faker.address, 'cardinalDirection')
        .mockReturnValue('NW');

      const cardinalDirection = faker.address.cardinalDirection(true);
      const expected = 'NW';

      expect(
        cardinalDirection,
        'The cardinal direction when useAbbr is true should be equals ' +
          expected +
          '. Current is ' +
          cardinalDirection
      ).toBe(expected);

      spy_address_cardinalDirection.mockRestore();
    });

    it('returns abbreviation when useAbbr is true', () => {
      const cardinalDirection = faker.address.cardinalDirection(true);
      const expectedType = 'string';
      const cardinalDirectionLength = cardinalDirection.length;
      const prefixErrorMessage =
        'The cardinal direction when useAbbr is true should';

      expect(
        typeof cardinalDirection,
        prefixErrorMessage +
          ' be had typeof equals ' +
          expectedType +
          '.Current is ' +
          typeof cardinalDirection
      ).toBe(expectedType);
      expect(
        cardinalDirectionLength <= 2,
        prefixErrorMessage +
          ' have a length less or equals 2. Current is ' +
          cardinalDirectionLength
      ).toBe(true);
    });
  });

  describe('nearbyGPSCoordinate()', () => {
    it('returns random gps coordinate within a distance of another one', () => {
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
        isMetric = Math.round(Math.random()) == 1;

        const coordinate = faker.address.nearbyGPSCoordinate(
          [latFloat1, lonFloat1],
          radius,
          isMetric
        );

        expect(coordinate.length).toBe(2);
        expect(typeof coordinate[0]).toBe('string');
        expect(typeof coordinate[1]).toBe('string');

        const latFloat2 = parseFloat(coordinate[0]);
        expect(latFloat2).greaterThanOrEqual(-90.0);
        expect(latFloat2).lessThanOrEqual(90.0);

        const lonFloat2 = parseFloat(coordinate[1]);
        expect(lonFloat2).greaterThanOrEqual(-180.0);
        expect(lonFloat2).lessThanOrEqual(180.0);

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
        expect(actualDistance).lessThanOrEqual(radius + error);
      }

      // test once with undefined radius
      const coordinate = faker.address.nearbyGPSCoordinate(
        [latFloat1, lonFloat1],
        undefined,
        isMetric
      );
      expect(coordinate.length).toBe(2);
      expect(typeof coordinate[0]).toBe('string');
      expect(typeof coordinate[1]).toBe('string');
    });
  });

  describe('timeZone()', () => {
    it('returns random timeZone', () => {
      const spy_address_timeZone = vi.spyOn(faker.address, 'timeZone');

      const timeZone = faker.address.timeZone();

      expect(timeZone).toBeTruthy();
      expect(spy_address_timeZone).toHaveBeenCalled();

      spy_address_timeZone.mockRestore();
    });
  });
});
