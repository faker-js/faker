import type { Faker } from '../..';

/**
 * Module to generate addresses and locations.
 */
export class LocationModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(LocationModule.prototype)) {
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
   * faker.location.zipCode() // '17839'
   * faker.location.zipCode('####') // '6925'
   *
   * @since 8.0.0
   */
  zipCode(format?: string): string {
    // if zip format is not specified, use the zip format defined for the locale
    if (format == null) {
      const localeFormat = this.faker.definitions.location.postcode;
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else {
        format = this.faker.helpers.arrayElement(localeFormat);
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
   * fakerUS.location.zipCodeByState("AK") // '99595'
   * fakerUS.location.zipCodeByState("??") // '47683-9880'
   *
   * @since 8.0.0
   */
  zipCodeByState(state: string): string {
    const zipRange = this.faker.definitions.location.postcode_by_state?.[state];
    if (zipRange) {
      return String(this.faker.datatype.number(zipRange));
    }
    return this.zipCode();
  }

  /**
   * Generates a random localized city name.
   *
   * @example
   * faker.location.city() // 'East Jarretmouth'
   *
   * @since 8.0.0
   */
  city(): string {
    return this.faker.helpers.fake(this.faker.definitions.location.city);
  }

  /**
   * Returns a random localized and existing city name.
   *
   * @example
   * faker.location.cityName() // 'San Rafael'
   *
   * @since 8.0.0
   */
  cityName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.city_name
    );
  }

  /**
   * Generates a random building number.
   *
   * @example
   * faker.location.buildingNumber() // '379'
   *
   * @since 8.0.0
   */
  buildingNumber(): string {
    const format = this.faker.helpers.arrayElement(
      this.faker.definitions.location.building_number
    );

    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  /**
   * Generates a random localized street name.
   *
   * @example
   * faker.location.street() // 'Schroeder Isle'
   *
   * @since 8.0.0
   */
  street(): string {
    return this.faker.helpers.fake(this.faker.definitions.location.street);
  }

  /**
   * Returns a random localized street name.
   *
   * @example
   * fakerDE.location.streetName() // 'Cavill Avenue'
   *
   * @since 8.0.0
   */
  streetName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.street_name
    );
  }

  /**
   * Generates a random localized street address.
   *
   * @param useFullAddress When true this will generate a full address.
   * Otherwise it will just generate a street address.
   *
   * @example
   * faker.location.streetAddress() // '0917 O'Conner Estates'
   * faker.location.streetAddress(false) // '34830 Erdman Hollow'
   * faker.location.streetAddress(true) // '3393 Ronny Way Apt. 742'
   *
   * @since 8.0.0
   */
  streetAddress(useFullAddress: boolean = false): string {
    const formats = this.faker.definitions.location.street_address;
    const format = formats[useFullAddress ? 'full' : 'normal'];

    return this.faker.helpers.fake(format);
  }

  /**
   * Generates a random localized secondary address. This refers to a specific location at a given address
   * such as an apartment or room number.
   *
   * @example
   * faker.location.secondaryAddress() // 'Apt. 861'
   *
   * @since 8.0.0
   */
  secondaryAddress(): string {
    return this.faker.helpers.replaceSymbolWithNumber(
      this.faker.helpers.arrayElement(
        this.faker.definitions.location.secondary_address
      )
    );
  }

  /**
   * Returns a random localized county.
   *
   * @example
   * faker.location.county() // 'Cambridgeshire'
   *
   * @since 8.0.0
   */
  county(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.county
    );
  }

  /**
   * Returns a random country name.
   *
   * @example
   * faker.location.country() // 'Greece'
   *
   * @since 8.0.0
   */
  country(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.country
    );
  }

  /**
   * Returns a random country code.
   *
   * @param alphaCode The code to return. Can be either `'alpha-2'` (2 letter code)
   * or `'alpha-3'` (three letter code). Defaults to `'alpha-2'`.
   *
   * @example
   * faker.location.countryCode() // 'SJ'
   * faker.location.countryCode('alpha-2') // 'GA'
   * faker.location.countryCode('alpha-3') // 'TJK'
   *
   * @since 8.0.0
   */
  countryCode(alphaCode: 'alpha-2' | 'alpha-3' = 'alpha-2'): string {
    const key =
      alphaCode === 'alpha-3' ? 'country_code_alpha_3' : 'country_code';

    return this.faker.helpers.arrayElement(
      this.faker.definitions.location[key]
    );
  }

  /**
   * Returns a random localized state from this country.
   *
   * @example
   * faker.location.state() // 'Georgia'
   *
   * @since 8.0.0
   */
  state(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.state
    );
  }

  /**
   * Returns a random localized state's abbreviated name from this country.
   *
   * @example
   * faker.location.stateAbbr() // 'ND'
   *
   * @since 8.0.0
   */
  stateAbbr(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.state_abbr
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
   * faker.location.latitude() // -30.9501
   * faker.location.latitude(10, -10, 5) // 2.68452
   *
   * @since 8.0.0
   */
  // TODO @xDivisionByZerox 2022-06-12 this signature should probably be an object for easier maintainability
  latitude(max: number = 90, min: number = -90, precision: number = 4): number {
    return this.faker.datatype.number({
      min,
      max,
      precision: parseFloat(`${(0.0).toPrecision(precision)}1`),
    });
  }

  /**
   * Generates a random longitude.
   *
   * @param max The upper bound for the longitude to generate. Defaults to `180`.
   * @param min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -154.0226
   * faker.location.longitude(10, -10, 5) // -4.03620
   *
   * @since 8.0.0
   */
  // TODO @xDivisionByZerox 2022-06-12 this signature should probably be an object for easier maintainability
  longitude(
    max: number = 180,
    min: number = -180,
    precision: number = 4
  ): number {
    return this.faker.datatype.number({
      max: max,
      min: min,
      precision: parseFloat(`${(0.0).toPrecision(precision)}1`),
    });
  }

  /**
   * Returns a random direction (cardinal and ordinal; northwest, east, etc).
   *
   * @param useAbbr If true this will return abbreviated directions (NW, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.direction() // 'Northeast'
   * faker.location.direction(false) // 'South'
   * faker.location.direction(true) // 'NE'
   *
   * @since 8.0.0
   */
  direction(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.location.direction
      );
    }
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.direction_abbr
    );
  }

  /**
   * Returns a random cardinal direction (north, east, south, west).
   *
   * @param useAbbr If true this will return abbreviated directions (N, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.cardinalDirection() // 'North'
   * faker.location.cardinalDirection(false) // 'South'
   * faker.location.cardinalDirection(true) // 'N'
   *
   * @since 8.0.0
   */
  cardinalDirection(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.location.direction.slice(0, 4)
      );
    }
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.direction_abbr.slice(0, 4)
    );
  }

  /**
   * Returns a random ordinal direction (northwest, southeast, etc).
   *
   * @param useAbbr If true this will return abbreviated directions (NW, SE, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.ordinalDirection() // 'Northeast'
   * faker.location.ordinalDirection(false) // 'Northwest'
   * faker.location.ordinalDirection(true) // 'NE'
   *
   * @since 8.0.0
   */
  ordinalDirection(useAbbr: boolean = false): string {
    if (!useAbbr) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.location.direction.slice(4, 8)
      );
    }
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.direction_abbr.slice(4, 8)
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
   * faker.location.nearbyGPSCoordinate() // [ 33.8475, -170.5953 ]
   * faker.location.nearbyGPSCoordinate([33, -170]) // [ 33.0165, -170.0636 ]
   * faker.location.nearbyGPSCoordinate([33, -170], 1000, true) // [ 37.9163, -179.2408 ]
   *
   * @since 8.0.0
   */
  nearbyGPSCoordinate(
    coordinate?: [latitude: number, longitude: number],
    radius: number = 10,
    isMetric: boolean = false
  ): [latitude: number, longitude: number] {
    // If there is no coordinate, the best we can do is return a random GPS coordinate.
    if (coordinate === undefined) {
      return [this.latitude(), this.longitude()];
    }

    const angleRadians = this.faker.datatype.float({
      min: 0,
      max: 2 * Math.PI,
      precision: 0.00001,
    }); // in ° radians

    const radiusMetric = isMetric ? radius : radius * 1.60934; // in km
    const errorCorrection = 0.995; // avoid float issues
    const distanceInKm =
      this.faker.datatype.float({
        min: 0,
        max: radiusMetric,
        precision: 0.001,
      }) * errorCorrection; // in km

    /**
     * The distance in km per degree for earth.
     */
    // TODO @Shinigami92 2022-04-26: Provide an option property to provide custom circumferences.
    const kmPerDegree = 40_000 / 360; // in km/°

    const distanceInDegree = distanceInKm / kmPerDegree; // in °

    const newCoordinate: [latitude: number, longitude: number] = [
      coordinate[0] + Math.sin(angleRadians) * distanceInDegree,
      coordinate[1] + Math.cos(angleRadians) * distanceInDegree,
    ];

    // Box latitude [-90°, 90°]
    newCoordinate[0] = newCoordinate[0] % 180;
    if (newCoordinate[0] < -90 || newCoordinate[0] > 90) {
      newCoordinate[0] = Math.sign(newCoordinate[0]) * 180 - newCoordinate[0];
      newCoordinate[1] += 180;
    }
    // Box longitude [-180°, 180°]
    newCoordinate[1] = (((newCoordinate[1] % 360) + 540) % 360) - 180;

    return [newCoordinate[0], newCoordinate[1]];
  }

  /**
   * Returns a random time zone.
   *
   * @example
   * faker.location.timeZone() // 'Pacific/Guam'
   *
   * @since 8.0.0
   */
  timeZone(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.time_zone
    );
  }
}
