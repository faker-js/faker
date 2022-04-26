import type { Faker } from '.';

/**
 * Converts degrees to radians.
 *
 * @param degrees Degrees.
 */
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180.0);
}

/**
 * Converts radians to degrees.
 *
 * @param radians Radians.
 */
function radiansToDegrees(radians: number): number {
  return radians * (180.0 / Math.PI);
}

/**
 * Converts kilometers to miles.
 *
 * @param miles Miles.
 */
function kilometersToMiles(miles: number): number {
  return miles * 0.621371;
}

/**
 * Calculates coordinates with offset.
 *
 * @param coordinate Coordinate.
 * @param bearing Bearing.
 * @param distance Distance.
 * @param isMetric Metric: true, Miles: false.
 */
function coordinateWithOffset(
  coordinate: [latitude: number, longitude: number],
  bearing: number,
  distance: number,
  isMetric: boolean
): [latitude: number, longitude: number] {
  const EQUATORIAL_EARTH_RADIUS = 6378.137; // http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
  const d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

  const latitudeCenter = degreesToRadians(coordinate[0]); // Current latitude point converted to radians
  const longitudeCenter = degreesToRadians(coordinate[1]); // Current longitude point converted to radians

  const latitudeOffset = Math.asin(
    Math.sin(latitudeCenter) * Math.cos(d / EQUATORIAL_EARTH_RADIUS) +
      Math.cos(latitudeCenter) *
        Math.sin(d / EQUATORIAL_EARTH_RADIUS) *
        Math.cos(bearing)
  );

  let longitudeOffset =
    longitudeCenter +
    Math.atan2(
      Math.sin(bearing) *
        Math.sin(d / EQUATORIAL_EARTH_RADIUS) *
        Math.cos(latitudeCenter),
      Math.cos(d / EQUATORIAL_EARTH_RADIUS) -
        Math.sin(latitudeCenter) * Math.sin(latitudeOffset)
    );

  // Keep longitude in range [-180, 180]
  if (longitudeOffset > degreesToRadians(180)) {
    longitudeOffset = longitudeOffset - degreesToRadians(360);
  } else if (longitudeOffset < degreesToRadians(-180)) {
    longitudeOffset = longitudeOffset + degreesToRadians(360);
  }

  return [radiansToDegrees(latitudeOffset), radiansToDegrees(longitudeOffset)];
}

/**
 * Module to generate addresses and locations.
 */
export class Address {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Address.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates random zip code from specified format. If format is not specified,
   * the locale's zip format is used.
   *
   * @param format The optional format used to generate the the zip code.
   * By default, a random format is used from the locale zip formats.
   *
   * @see faker.helpers.replaceSymbols()
   *
   * @example
   * faker.address.zipCode() // '17839'
   * faker.address.zipCode('####') // '6925'
   *
   */
  zipCode(format?: string): string {
    // if zip format is not specified, use the zip format defined for the locale
    if (format == null) {
      const localeFormat = this.faker.definitions.address.postcode;
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else {
        format = this.faker.random.arrayElement(localeFormat);
      }
    }
    return this.faker.helpers.replaceSymbols(format);
  }

  /**
   * Generates random zip code from state abbreviation. If state abbreviation is
   * not specified, a random zip code is generated according to the locale's zip format.
   * Only works for locales with postcode_by_state definition. If a locale does not
   * have a postcode_by_state definition, a random zip code is generated according
   * to the locale's zip format.
   *
   * @param state The abbreviation of the state to generate the zip code for.
   *
   * @example
   * fakerUS.address.zipCodeByState("AK") // '99595'
   * fakerUS.address.zipCodeByState("??") // '47683-9880'
   */
  zipCodeByState(state: string): string {
    const zipRange = this.faker.definitions.address.postcode_by_state?.[state];
    if (zipRange) {
      return String(this.faker.datatype.number(zipRange));
    }
    return this.zipCode();
  }

  /**
   * Generates a random localized city name.
   *
   * @param format The format to use. Can be either the index of the format to use or
   * any method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * - `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * - `{{address.cityPrefix}} {{name.firstName}}`
   * - `{{name.firstName}}{{address.citySuffix}}`
   * - `{{name.lastName}}{{address.citySuffix}}`
   * - `{{address.cityName}}` when city name is available
   *
   * @example
   * faker.address.city() // 'Gleasonbury'
   * faker.address.city(2) // 'Jadenshire'
   */
  // TODO ST-DDT 2022-02-10: The string parameter doesn't work as expected.
  city(format?: string | number): string {
    const formats = [
      '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
      '{{address.cityPrefix}} {{name.firstName}}',
      '{{name.firstName}}{{address.citySuffix}}',
      '{{name.lastName}}{{address.citySuffix}}',
    ];

    if (!format && this.faker.definitions.address.city_name) {
      formats.push('{{address.cityName}}');
    }

    if (typeof format !== 'number') {
      format = this.faker.datatype.number(formats.length - 1);
    }

    return this.faker.fake(formats[format]);
  }

  /**
   * Returns a random localized city prefix.
   *
   * @example
   * faker.address.cityPrefix() // 'East'
   */
  cityPrefix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_prefix
    );
  }

  /**
   * Returns a random localized city suffix.
   *
   * @example
   * faker.address.citySuffix() // 'mouth'
   */
  citySuffix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_suffix
    );
  }

  /**
   * Returns a random localized city name.
   *
   * @example
   * faker.address.cityName() // 'San Rafael'
   */
  cityName(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_name
    );
  }

  /**
   * Generates a random building number.
   *
   * @example
   * faker.address.buildingNumber() // '379'
   */
  buildingNumber(): string {
    const format = this.faker.random.arrayElement(
      this.faker.definitions.address.building_number
    );

    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  /**
   * Generates a random localized street name.
   *
   * @example
   * faker.address.streetName() // 'Kulas Roads'
   */
  streetName(): string {
    let result: string;
    let suffix = this.streetSuffix();
    if (suffix !== '') {
      suffix = ` ${suffix}`;
    }

    switch (this.faker.datatype.number(1)) {
      case 0:
        result = this.faker.name.lastName() + suffix;
        break;
      case 1:
        result = this.faker.name.firstName() + suffix;
        break;
    }
    return result;
  }

  /**
   * Generates a random localized street address.
   *
   * @param useFullAddress When true this will generate a full address.
   * Otherwise it will just generate a street address.
   *
   * @example
   * faker.address.streetName() // '0917 O'Conner Estates'
   * faker.address.streetAddress(true) // '3393 Ronny Way Apt. 742'
   * faker.address.streetAddress(false) // '34830 Erdman Hollow'
   */
  streetAddress(useFullAddress: boolean = false): string {
    const formats = this.faker.definitions.address.street_address;
    const format = formats[useFullAddress ? 'full' : 'normal'];

    return this.faker.fake(format);
  }

  /**
   * Returns a random localized street suffix.
   *
   * @example
   * faker.address.streetSuffix() // 'Streets'
   */
  streetSuffix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.street_suffix
    );
  }

  /**
   * Returns a random localized street prefix.
   *
   * @example
   * fakerGH.address.streetPrefix() // 'Boame'
   */
  streetPrefix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.street_prefix
    );
  }

  /**
   * Generates a random localized secondary address. This refers to a specific location at a given address
   * such as an apartment or room number.
   *
   * @example
   * faker.address.secondaryAddress() // 'Apt. 861'
   */
  secondaryAddress(): string {
    return this.faker.helpers.replaceSymbolWithNumber(
      this.faker.random.arrayElement(
        this.faker.definitions.address.secondary_address
      )
    );
  }

  /**
   * Returns a random localized county.
   *
   * @example
   * faker.address.county() // 'Cambridgeshire'
   */
  county(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.county
    );
  }

  /**
   * Returns a random country name.
   *
   * @example
   * faker.address.country() // 'Greece'
   */
  country(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.country
    );
  }

  /**
   * Returns a random country code.
   *
   * @param alphaCode The code to return. Can be either `'alpha-2'` (2 letter code)
   * or `'alpha-3'` (three letter code). Defaults to `'alpha-2'`.
   *
   * @example
   * faker.address.countryCode() // 'SJ'
   * faker.address.countryCode('alpha-2') // 'GA'
   * faker.address.countryCode('alpha-3') // 'TJK'
   */
  countryCode(alphaCode: 'alpha-2' | 'alpha-3' = 'alpha-2'): string {
    const key: keyof typeof this.faker.definitions.address =
      alphaCode === 'alpha-3' ? 'country_code_alpha_3' : 'country_code';

    return this.faker.random.arrayElement(this.faker.definitions.address[key]);
  }

  /**
   * Returns a random localized state from this country.
   *
   * @example
   * faker.address.state() // 'Georgia'
   */
  state(): string {
    return this.faker.random.arrayElement(this.faker.definitions.address.state);
  }

  /**
   * Returns a random localized state's abbreviated name from this country.
   *
   * @example
   * faker.address.stateAbbr() // 'ND'
   */
  stateAbbr(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.state_abbr
    );
  }

  /**
   * Generates a random latitude.
   *
   * @param max The upper bound for the latitude to generate. Defaults to `90`.
   * @param min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param precision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.address.latitude() // '-30.9501'
   * faker.address.latitude(10, -10, 5) // '2.68452'
   */
  latitude(max: number = 90, min: number = -90, precision: number = 4): string {
    return this.faker.datatype
      .number({
        min,
        max,
        precision: parseFloat(`${(0.0).toPrecision(precision)}1`),
      })
      .toFixed(precision);
  }

  /**
   * Generates a random longitude.
   *
   * @param max The upper bound for the longitude to generate. Defaults to `180`.
   * @param min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.address.longitude() // '-154.0226'
   * faker.address.longitude(10, -10, 5) // '-4.03620'
   */
  longitude(
    max: number = 180,
    min: number = -180,
    precision: number = 4
  ): string {
    return this.faker.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat(`${(0.0).toPrecision(precision)}1`),
      })
      .toFixed(precision);
  }

  /**
   * Returns a random direction (cardinal and ordinal; northwest, east, etc).
   *
   * @param useAbbr If true this will return abbreviated directions (NW, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.address.direction() // 'Northeast'
   * faker.address.direction(false) // 'South'
   * faker.address.direction(true) // 'NE'
   */
  direction(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.random.arrayElement(
        this.faker.definitions.address.direction
      );
    }
    return this.faker.random.arrayElement(
      this.faker.definitions.address.direction_abbr
    );
  }

  /**
   * Returns a random cardinal direction (north, east, south, west).
   *
   * @param useAbbr If true this will return abbreviated directions (N, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.address.cardinalDirection() // 'North'
   * faker.address.cardinalDirection(false) // 'South'
   * faker.address.cardinalDirection(true) // 'N'
   */
  cardinalDirection(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.random.arrayElement(
        this.faker.definitions.address.direction.slice(0, 4)
      );
    }
    return this.faker.random.arrayElement(
      this.faker.definitions.address.direction_abbr.slice(0, 4)
    );
  }

  /**
   * Returns a random ordinal direction (northwest, southeast, etc).
   *
   * @param useAbbr If true this will return abbreviated directions (NW, SE, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.address.ordinalDirection() // 'Northeast'
   * faker.address.ordinalDirection(false) // 'Northwest'
   * faker.address.ordinalDirection(true) // 'NE'
   */
  ordinalDirection(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.random.arrayElement(
        this.faker.definitions.address.direction.slice(4, 8)
      );
    }
    return this.faker.random.arrayElement(
      this.faker.definitions.address.direction_abbr.slice(4, 8)
    );
  }

  /**
   * Generates a random GPS coordinate within the specified radius from the given coordinate.
   *
   * @param coordinate The original coordinate to get a new coordinate close to.
   * If no coordinate is given, a random one will be chosen.
   * @param radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
   * @param isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
   *
   * @example
   * faker.address.nearbyGPSCoordinate() // [ '33.8475', '-170.5953' ]
   * faker.address.nearbyGPSCoordinate([33, -170]) // [ '33.0165', '-170.0636' ]
   * faker.address.nearbyGPSCoordinate([33, -170], 1000, true) // [ '37.9163', '-179.2408' ]
   */
  // TODO ST-DDT 2022-02-10: Allow coordinate parameter to be [string, string].
  nearbyGPSCoordinate(
    coordinate?: [latitude: number, longitude: number],
    radius: number = 10,
    isMetric: boolean = false
  ): [latitude: string, longitude: string] {
    // If there is no coordinate, the best we can do is return a random GPS coordinate.
    if (coordinate === undefined) {
      return [this.latitude(), this.longitude()];
    }

    const twoPi = 2 * Math.PI;
    const angle = this.faker.datatype.float({
      min: 0,
      max: twoPi,
      precision: 0.00001,
    });

    const earthRadius = 40000; // in km
    const radiusMetric = isMetric ? radius : radius * 1.60934; // in km

    const kmPerDegreeLatitude = earthRadius / 360; // in km/°
    const maxDistanceLatitude = radiusMetric / kmPerDegreeLatitude; // in °
    const distanceLatitude = this.faker.datatype.float({
      min: 0,
      max: maxDistanceLatitude,
      precision: 0.00001,
    }); // in °

    const newLatitude = coordinate[0] + Math.cos(angle) * distanceLatitude;

    const earthRadiusAtLatitude =
      Math.cos((newLatitude / 360) * twoPi) * earthRadius;
    const kmPerDegreeLongitude = earthRadiusAtLatitude / 360; // in km/°
    const maxDistanceLongitude = radiusMetric / kmPerDegreeLongitude; // in °
    const distanceLongitude = this.faker.datatype.float({
      min: 0,
      max: maxDistanceLongitude,
      precision: 0.00001,
    }); // in °

    const newLongitude = coordinate[1] + Math.sin(angle) * distanceLongitude;

    const newCoordinate: [latitude: number, longitude: number] = [
      newLatitude,
      newLongitude,
    ];

    // Box latitude [-90°, 90°]
    newCoordinate[0] = newCoordinate[0] % 180;
    if (newCoordinate[0] < -90 || newCoordinate[0] > 90) {
      newCoordinate[0] = Math.sign(newCoordinate[0]) * 180 - newCoordinate[0];
      newCoordinate[1] += 180;
    }
    // Box longitude [-180°, 180°]
    newCoordinate[1] = (((newCoordinate[1] % 360) + 180) % 360) - 180;

    return [newCoordinate[0].toFixed(4), newCoordinate[1].toFixed(4)];
  }

  /**
   * Returns a random time zone.
   *
   * @example
   * faker.address.timeZone() // 'Pacific/Guam'
   */
  timeZone(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.time_zone
    );
  }
}
