import type { Faker } from '.';
import type { Fake } from './fake';
import type { Helpers } from './helpers';

let f: Fake['fake'];

export class Address {
  readonly Helpers: Helpers;

  constructor(private readonly faker: Faker) {
    f = this.faker.fake;
    this.Helpers = this.faker.helpers;

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Address.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    // TODO @Shinigami92 2022-01-13: Need better strategy
    // @ts-expect-error
    this.direction.schema = {
      description:
        'Generates a direction. Use optional useAbbr bool to return abbreviation',
      sampleResults: ['Northwest', 'South', 'SW', 'E'],
    };
    // @ts-expect-error
    this.cardinalDirection.schema = {
      description:
        'Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation',
      sampleResults: ['North', 'South', 'E', 'W'],
    };
    // @ts-expect-error
    this.ordinalDirection.schema = {
      description:
        'Generates an ordinal direction. Use optional useAbbr boolean to return abbreviation',
      sampleResults: ['Northwest', 'Southeast', 'SW', 'NE'],
    };
  }

  /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method faker.address.zipCode
   * @param format
   */
  zipCode(format?: string) {
    // if zip format is not specified, use the zip format defined for the locale
    if (typeof format === 'undefined') {
      const localeFormat = this.faker.definitions.address.postcode;
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else {
        format = this.faker.random.arrayElement(localeFormat);
      }
    }
    return this.Helpers.replaceSymbols(format);
  }

  /**
   * Generates random zipcode from state abbreviation. If state abbreviation is
   * not specified, a random zip code is generated according to the locale's zip format.
   * Only works for locales with postcode_by_state definition. If a locale does not
   * have a postcode_by_state definition, a random zip code is generated according
   * to the locale's zip format.
   *
   * @method faker.address.zipCodeByState
   * @param state
   */
  zipCodeByState(state: string) {
    const zipRange = this.faker.definitions.address.postcode_by_state[state];
    if (zipRange) {
      return this.faker.datatype.number(zipRange);
    }
    return this.faker.address.zipCode();
  }

  /**
   * Generates a random localized city name. The format string can contain any
   * method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * * `{{address.cityPrefix}} {{name.firstName}}`
   * * `{{name.firstName}}{{address.citySuffix}}`
   * * `{{name.lastName}}{{address.citySuffix}}`
   * * `{{address.cityName}}` when city name is available
   *
   * @method faker.address.city
   * @param format
   */
  city(format?: string | number) {
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

    return f(formats[format]);
  }

  /**
   * Return a random localized city prefix
   *
   * @method faker.address.cityPrefix
   */
  cityPrefix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_prefix
    );
  }

  /**
   * Return a random localized city suffix
   *
   * @method faker.address.citySuffix
   */
  citySuffix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_suffix
    );
  }

  /**
   * Returns a random city name
   *
   * @method faker.address.cityName
   */
  cityName(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.city_name
    );
  }

  /**
   * Returns a random localized street name
   *
   * @method faker.address.streetName
   */
  streetName(): string {
    let result: string;
    let suffix = this.faker.address.streetSuffix();
    if (suffix !== '') {
      suffix = ' ' + suffix;
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

  //
  // TODO: change all these methods that accept a boolean to instead accept an options hash.
  //

  /**
   * Returns a random localized street address
   *
   * @method faker.address.streetAddress
   * @param useFullAddress
   */
  streetAddress(useFullAddress: boolean = false): string {
    let address = '';
    switch (this.faker.datatype.number(2)) {
      case 0:
        address =
          this.Helpers.replaceSymbolWithNumber('#####') +
          ' ' +
          this.faker.address.streetName();
        break;
      case 1:
        address =
          this.Helpers.replaceSymbolWithNumber('####') +
          ' ' +
          this.faker.address.streetName();
        break;
      case 2:
        address =
          this.Helpers.replaceSymbolWithNumber('###') +
          ' ' +
          this.faker.address.streetName();
        break;
    }
    return useFullAddress
      ? address + ' ' + this.faker.address.secondaryAddress()
      : address;
  }

  /**
   * streetSuffix
   *
   * @method faker.address.streetSuffix
   */
  streetSuffix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.street_suffix
    );
  }

  /**
   * streetPrefix
   *
   * @method faker.address.streetPrefix
   */
  streetPrefix(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.street_prefix
    );
  }

  /**
   * secondaryAddress
   *
   * @method faker.address.secondaryAddress
   */
  secondaryAddress() {
    return this.Helpers.replaceSymbolWithNumber(
      this.faker.random.arrayElement(['Apt. ###', 'Suite ###'])
    );
  }

  /**
   * county
   *
   * @method faker.address.county
   */
  county(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.county
    );
  }

  /**
   * country
   *
   * @method faker.address.country
   */
  country(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.country
    );
  }

  /**
   * countryCode
   *
   * @method faker.address.countryCode
   * @param alphaCode default alpha-2
   */
  countryCode(alphaCode: string = 'alpha-2'): string {
    if (alphaCode === 'alpha-2') {
      return this.faker.random.arrayElement(
        this.faker.definitions.address.country_code
      );
    }

    if (alphaCode === 'alpha-3') {
      return this.faker.random.arrayElement(
        this.faker.definitions.address.country_code_alpha_3
      );
    }

    return this.faker.random.arrayElement(
      this.faker.definitions.address.country_code
    );
  }

  /**
   * state
   *
   * @method faker.address.state
   * @param useAbbr
   */
  // TODO @Shinigami92 2022-01-13: useAbbr not in use
  state(useAbbr?: boolean): string {
    return this.faker.random.arrayElement(this.faker.definitions.address.state);
  }

  /**
   * stateAbbr
   *
   * @method faker.address.stateAbbr
   */
  stateAbbr(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.state_abbr
    );
  }

  /**
   * latitude
   *
   * @method faker.address.latitude
   * @param max default is 90
   * @param min default is -90
   * @param precision default is 4
   */
  latitude(max: number = 90, min: number = -90, precision: number = 4): string {
    return this.faker.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + '1'),
      })
      .toFixed(precision);
  }

  /**
   * longitude
   *
   * @method faker.address.longitude
   * @param max default is 180
   * @param min default is -180
   * @param precision default is 4
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
        precision: parseFloat((0.0).toPrecision(precision) + '1'),
      })
      .toFixed(precision);
  }

  /**
   *  direction
   *
   * @method faker.address.direction
   * @param useAbbr return direction abbreviation. defaults to false
   */
  direction(useAbbr: boolean = false) {
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
   * cardinal direction
   *
   * @method faker.address.cardinalDirection
   * @param useAbbr return direction abbreviation. defaults to false
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
   * ordinal direction
   *
   * @method faker.address.ordinalDirection
   * @param useAbbr return direction abbreviation. defaults to false
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

  nearbyGPSCoordinate(
    coordinate?: number[],
    radius?: number,
    isMetric?: boolean
  ): string[] {
    function randomFloat(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }
    function degreesToRadians(degrees: number): number {
      return degrees * (Math.PI / 180.0);
    }
    function radiansToDegrees(radians: number): number {
      return radians * (180.0 / Math.PI);
    }
    function kilometersToMiles(miles: number): number {
      return miles * 0.621371;
    }
    function coordinateWithOffset(
      coordinate: number[],
      bearing: number,
      distance: number,
      isMetric: boolean
    ): number[] {
      const R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
      const d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

      const lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
      const lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d / R) +
          Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
      );

      let lon2 =
        lon1 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
          Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
        );

      // Keep longitude in range [-180, 180]
      if (lon2 > degreesToRadians(180)) {
        lon2 = lon2 - degreesToRadians(360);
      } else if (lon2 < degreesToRadians(-180)) {
        lon2 = lon2 + degreesToRadians(360);
      }

      return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
    }

    // If there is no coordinate, the best we can do is return a random GPS coordinate.
    if (coordinate === undefined) {
      return [this.faker.address.latitude(), this.faker.address.longitude()];
    }
    radius ||= 10.0;
    isMetric ||= false;

    // TODO: implement either a gaussian/uniform distribution of points in circular region.
    // Possibly include param to function that allows user to choose between distributions.

    // This approach will likely result in a higher density of points near the center.
    const randomCoord = coordinateWithOffset(
      coordinate,
      degreesToRadians(Math.random() * 360.0),
      radius,
      isMetric
    );
    return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
  }

  /**
   * Return a random time zone
   *
   * @method faker.address.timeZone
   */
  timeZone(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.address.time_zone
    );
  }
}
