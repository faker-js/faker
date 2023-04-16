import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate addresses and locations. Prior to Faker 8.0.0, this module was known as `faker.address`.
 *
 * ### Overview
 *
 * For a typical street address for a locale, use [`streetAddress()`](https://next.fakerjs.dev/api/location.html#streetaddress), [`city()`](https://next.fakerjs.dev/api/location.html#city), [`state()`](https://next.fakerjs.dev/api/location.html#state) (or [`stateAbbr()`](https://next.fakerjs.dev/api/location.html#stateabbr)), and [`zipCode()`](https://next.fakerjs.dev/api/location.html#zipcode). Most locales provide localized versions for a specific country.
 *
 * If you need latitude and longitude coordinates, use [`latitude()`](https://next.fakerjs.dev/api/location.html#latitude) and [`longitude()`](https://next.fakerjs.dev/api/location.html#longitude), or [`nearbyGPSCoordinate()`](https://next.fakerjs.dev/api/location.html#nearbygpscoordinate) for a latitude/longitude near a given location.
 *
 * For a random country, you can use [`country()`](https://next.fakerjs.dev/api/location.html#country) or [`countryCode()`](https://next.fakerjs.dev/api/location.html#countrycode).
 */
export class LocationModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      LocationModule.prototype
    ) as Array<keyof LocationModule | 'constructor'>) {
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
   * @param options The format used to generate the the zip code or an options object. Defaults to `{}`.
   * @param options.state The state to generate the zip code for.
   * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
   * @param options.format The optional format used to generate the the zip code.
   * By default, a random format is used from the locale zip formats.
   * This wont be used if the state option is specified.
   *
   * @see faker.helpers.replaceSymbols()
   *
   * @example
   * faker.location.zipCode() // '17839'
   * faker.location.zipCode('####') // '6925'
   *
   * @since 8.0.0
   */
  zipCode(
    options:
      | string
      | {
          /**
           * The state to generate the zip code for.
           *
           * If the currrent locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
           */
          state?: string;
          /**
           * The optional format used to generate the the zip code.
           *
           * This wont be used if the state option is specified.
           *
           * @default faker.definitions.location.postcode
           */
          format?: string;
        } = {}
  ): string {
    if (typeof options === 'string') {
      options = { format: options };
    }

    const { state } = options;

    if (state) {
      const zipRange =
        this.faker.definitions.location.postcode_by_state?.[state];

      if (zipRange) {
        return String(this.faker.number.int(zipRange));
      }

      throw new FakerError(`No zip code definition found for state "${state}"`);
    }

    let { format = this.faker.definitions.location.postcode } = options;
    if (typeof format === 'string') {
      format = [format];
    }

    format = this.faker.helpers.arrayElement(format);

    return this.faker.helpers.replaceSymbols(format);
  }

  /**
   * Generates random zip code from state abbreviation.
   *
   * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
   *
   * @param options A state abbreviation or an options object. Defaults to `{}`.
   * @param options.state The abbreviation of the state to generate the zip code for.
   * If not specified, a random zip code is generated according to the locale's zip format.
   *
   * @see faker.location.zipCode()
   *
   * @example
   * fakerEN_US.location.zipCodeByState("AK") // '99595'
   * fakerEN_US.location.zipCodeByState() // '47683-9880'
   * fakerEN_US.location.zipCodeByState({ state: "AK" }) // '99595'
   *
   * @since 8.0.0
   *
   * @deprecated Use `faker.location.zipCode({ state })` instead.
   */
  zipCodeByState(
    options:
      | string
      | {
          /**
           * The abbreviation of the state to generate the zip code for.
           * If not specified, a random zip code is generated according to the locale's zip format.
           */
          state?: string;
        } = {}
  ): string {
    deprecated({
      deprecated: 'faker.location.zipCodeByState',
      proposed: 'faker.location.zipCode({ state })',
      since: '8.0',
      until: '9.0',
    });

    if (typeof options === 'string') {
      options = { state: options };
    }

    const { state } = options;

    return this.zipCode({ state });
  }

  /**
   * Generates a random fictional city name for the locale.
   *
   * @example
   * faker.location.city() // 'East Jarretmouth'
   * fakerDE.location.city() // 'Bad Lilianadorf'
   *
   * @since 8.0.0
   */
  city(): string {
    return this.faker.helpers.fake(this.faker.definitions.location.city);
  }

  /**
   * Returns a random city name from a list of real cities for the locale.
   *
   * @example
   * faker.location.cityName() // 'San Rafael'
   * fakerDE.location.cityName() // 'Nürnberg'
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
   * @param options Whether to use a full address or an options object. Defaults to `{}`.
   * @param options.useFullAddress When true this will generate a full address.
   * Otherwise it will just generate a street address.
   *
   * @example
   * faker.location.streetAddress() // '0917 O'Conner Estates'
   * faker.location.streetAddress(false) // '34830 Erdman Hollow'
   * faker.location.streetAddress(true) // '3393 Ronny Way Apt. 742'
   * faker.location.streetAddress({ useFullAddress: true }) // '7917 Miller Park Apt. 410'
   *
   * @since 8.0.0
   */
  streetAddress(
    options:
      | boolean
      | {
          /**
           * When true this will generate a full address.
           * Otherwise it will just generate a street address.
           */
          useFullAddress?: boolean;
        } = {}
  ): string {
    if (typeof options === 'boolean') {
      options = { useFullAddress: options };
    }

    const { useFullAddress } = options;

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
   * Returns a random localized county, or other equivalent second-level administrative entity for the locale's country such as a district or department.
   *
   * @example
   * fakerEN_GB.location.county() // 'Cambridgeshire'
   * fakerEN_US.location.county() // 'Monroe County'
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
   * Returns a random [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code.
   *
   * @param options The code to return or an options object. Defaults to `{}`.
   * @param options.variant The variant to return. Can be either `'alpha-2'` (two letter code)
   * or `'alpha-3'` (three letter code). Defaults to `'alpha-2'`.
   *
   * @example
   * faker.location.countryCode() // 'SJ'
   * faker.location.countryCode('alpha-2') // 'GA'
   * faker.location.countryCode('alpha-3') // 'TJK'
   *
   * @since 8.0.0
   */
  countryCode(
    options:
      | 'alpha-2'
      | 'alpha-3'
      | {
          /**
           * The code to return.
           * Can be either `'alpha-2'` (two letter code)
           * or `'alpha-3'` (three letter code).
           *
           * @default 'alpha-2'
           */
          variant?: 'alpha-2' | 'alpha-3';
        } = {}
  ): string {
    if (typeof options === 'string') {
      options = { variant: options };
    }

    const { variant = 'alpha-2' } = options;
    const key = variant === 'alpha-3' ? 'alpha3' : 'alpha2';

    return this.faker.helpers.arrayElement(
      this.faker.definitions.location.country_code
    )[key];
  }

  /**
   * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
   *
   * @param useAbbreviation Whether to return an abbreviation. Defaults to `false`.
   *
   * @example
   * faker.location.state() // 'Mississippi'
   * faker.location.state(false) // 'Florida'
   * faker.location.state(true) // 'AR'
   *
   * @since 8.0.0
   */
  state(useAbbreviation?: boolean): string;
  /**
   * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.useAbbreviation Whether to return an abbreviation. Defaults to `false`.
   *
   * @example
   * faker.location.state() // 'Mississippi'
   * faker.location.state({ useAbbreviation: false }) // 'Florida'
   * faker.location.state({ useAbbreviation: true }) // 'AR'
   *
   * @since 8.0.0
   */
  state(options?: {
    /**
     * Whether to return an abbreviation.
     *
     * @default false
     */
    useAbbreviation?: boolean;
  }): string;
  /**
   * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
   *
   * @param options Whether to return an abbreviation or an options object. Defaults to `{}`.
   * @param options.useAbbreviation Whether to return an abbreviation. Defaults to `false`.
   *
   * @example
   * faker.location.state() // 'Mississippi'
   * faker.location.state(false) // 'Iowa'
   * fakerDE.location.state({ useAbbreviation: true }) // 'NRW'
   *
   * @since 8.0.0
   */
  state(
    options?:
      | boolean
      | {
          /**
           * Whether to return an abbreviation.
           *
           * @default false
           */
          useAbbreviation?: boolean;
        }
  ): string;
  /**
   * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
   *
   * @param options Whether to return an abbreviation or an options object. Defaults to `{}`.
   * @param options.useAbbreviation Whether to return an abbreviation. Defaults to `false`.
   *
   * @example
   * faker.location.state() // 'Mississippi'
   * faker.location.state(false) // 'Iowa'
   * fakerDE.location.state({ useAbbreviation: true }) // 'NRW'
   *
   * @since 8.0.0
   */
  state(
    options:
      | boolean
      | {
          /**
           * Whether to return an abbreviation.
           *
           * @default false
           */
          useAbbreviation?: boolean;
        } = {}
  ): string {
    if (typeof options === 'boolean') {
      options = { useAbbreviation: options };
    }

    const { useAbbreviation = false } = options;
    const stateDataSet = useAbbreviation
      ? this.faker.definitions.location.state_abbr
      : this.faker.definitions.location.state;

    return this.faker.helpers.arrayElement(stateDataSet);
  }

  /**
   * Returns a random localized state's abbreviated name from this country.
   *
   * @example
   * faker.location.stateAbbr() // 'ND'
   *
   * @since 8.0.0
   *
   * @deprecated Use `faker.location.state({ useAbbreviation: true })` instead.
   */
  stateAbbr(): string {
    deprecated({
      deprecated: 'faker.location.stateAbbr()',
      proposed: 'faker.location.state({ useAbbreviation: true })',
      since: '8.0',
      until: '9.0',
    });
    return this.state({ useAbbreviation: true });
  }

  /**
   * Generates a random latitude.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
   * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.location.latitude() // -30.9501
   * faker.location.latitude({ max: 10 }) // 5.7225
   * faker.location.latitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  latitude(options?: {
    /**
     * The upper bound for the latitude to generate.
     *
     * @default 90
     */
    max?: number;
    /**
     * The lower bound for the latitude to generate.
     *
     * @default -90
     */
    min?: number;
    /**
     * The number of decimal points of precision for the latitude.
     *
     * @default 4
     */
    precision?: number;
  }): number;
  /**
   * Generates a random latitude.
   *
   * @param max The upper bound for the latitude to generate. Defaults to `90`.
   * @param min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param precision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.location.latitude() // -30.9501
   * faker.location.latitude(10) // 5.7225
   * faker.location.latitude(10, -10) // -9.6273
   * faker.location.latitude(10, -10, 5) // 2.68452
   *
   * @since 8.0.0
   */
  latitude(max?: number, min?: number, precision?: number): number;
  /**
   * Generates a random latitude.
   *
   * @param options The upper bound for the latitude or an options object. Defaults to `{}`.
   * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
   * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
   * @param legacyMin The lower bound for the latitude to generate. Defaults to `-90`.
   * @param legacyPrecision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.location.latitude() // -30.9501
   * faker.location.latitude({ max: 10 }) // 5.7225
   * faker.location.latitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   * faker.location.latitude(10) // 5.7225
   * faker.location.latitude(10, -10) // -9.6273
   * faker.location.latitude(10, -10, 5) // 2.68452
   *
   * @since 8.0.0
   */
  latitude(
    options:
      | number
      | {
          /**
           * The upper bound for the latitude to generate.
           *
           * @default 90
           */
          max?: number;
          /**
           * The lower bound for the latitude to generate.
           *
           * @default -90
           */
          min?: number;
          /**
           * The number of decimal points of precision for the latitude.
           *
           * @default 4
           */
          precision?: number;
        },
    legacyMin?: number,
    legacyPrecision?: number
  ): number;
  /**
   * Generates a random latitude.
   *
   * @param options The upper bound for the latitude or an options object. Defaults to `{}`.
   * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
   * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
   * @param legacyMin The lower bound for the latitude to generate. Defaults to `-90`.
   * @param legacyPrecision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.location.latitude() // -30.9501
   * faker.location.latitude({ max: 10 }) // 5.7225
   * faker.location.latitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   * faker.location.latitude(10) // 5.7225
   * faker.location.latitude(10, -10) // -9.6273
   * faker.location.latitude(10, -10, 5) // 2.68452
   *
   * @since 8.0.0
   */
  latitude(
    options:
      | number
      | {
          /**
           * The upper bound for the latitude to generate.
           *
           * @default 90
           */
          max?: number;
          /**
           * The lower bound for the latitude to generate.
           *
           * @default -90
           */
          min?: number;
          /**
           * The number of decimal points of precision for the latitude.
           *
           * @default 4
           */
          precision?: number;
        } = {},
    legacyMin = -90,
    legacyPrecision = 4
  ): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { max = 90, min = legacyMin, precision = legacyPrecision } = options;

    return this.faker.number.float({ min, max, precision: 10 ** -precision });
  }

  /**
   * Generates a random longitude.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -30.9501
   * faker.location.longitude({ max: 10 }) // 5.7225
   * faker.location.longitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  longitude(options?: {
    /**
     * The upper bound for the latitude to generate.
     *
     * @default 90
     */
    max?: number;
    /**
     * The lower bound for the latitude to generate.
     *
     * @default -90
     */
    min?: number;
    /**
     * The number of decimal points of precision for the latitude.
     *
     * @default 4
     */
    precision?: number;
  }): number;
  /**
   * Generates a random longitude.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -30.9501
   * faker.location.longitude({ max: 10 }) // 5.7225
   * faker.location.longitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  longitude(max?: number, min?: number, precision?: number): number;
  /**
   * Generates a random longitude.
   *
   * @param options The upper bound for the longitude or an options object. Defaults to `{}`.
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   * @param legacyMin The lower bound for the longitude to generate. Defaults to `-180`.
   * @param legacyPrecision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -30.9501
   * faker.location.longitude({ max: 10 }) // 5.7225
   * faker.location.longitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  longitude(
    options?:
      | number
      | {
          /**
           * The upper bound for the longitude to generate.
           *
           * @default 180
           */
          max?: number;
          /**
           * The lower bound for the longitude to generate.
           *
           * @default -180
           */
          min?: number;
          /**
           * The number of decimal points of precision for the longitude.
           *
           * @default 4
           */
          precision?: number;
        },
    legacyMin?: number,
    legacyPrecision?: number
  ): number;
  /**
   * Generates a random longitude.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   * @param legacyMin The lower bound for the longitude to generate. Defaults to `-180`.
   * @param legacyPrecision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -154.0226
   * faker.location.longitude({ max: 10 }) // 2.4387
   * faker.location.longitude({ max: 10, min: -10 }) // 6.9126
   * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // -4.03620
   * faker.location.longitude(10) // 2.4387
   * faker.location.longitude(10, -10) // 6.9126
   * faker.location.longitude(10, -10, 5) // -4.03620
   *
   * @since 8.0.0
   */
  longitude(
    options:
      | number
      | {
          /**
           * The upper bound for the longitude to generate.
           *
           * @default 180
           */
          max?: number;
          /**
           * The lower bound for the longitude to generate.
           *
           * @default -180
           */
          min?: number;
          /**
           * The number of decimal points of precision for the longitude.
           *
           * @default 4
           */
          precision?: number;
        } = {},
    legacyMin = -180,
    legacyPrecision = 4
  ): number {
    if (typeof options === 'number') {
      options = { max: options };
    }

    const { max = 180, min = legacyMin, precision = legacyPrecision } = options;

    return this.faker.number.float({ max, min, precision: 10 ** -precision });
  }

  /**
   * Returns a random direction (cardinal and ordinal; northwest, east, etc).
   *
   * @param options Whether to use abbreviated or an options object.
   * @param options.useAbbr If true this will return abbreviated directions (NW, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.direction() // 'Northeast'
   * faker.location.direction(false) // 'South'
   * faker.location.direction(true) // 'NE'
   * faker.location.direction({ useAbbr: true }) // 'SW'
   *
   * @since 8.0.0
   */
  direction(
    options:
      | boolean
      | {
          /**
           * If true this will return abbreviated directions (NW, E, etc).
           * Otherwise this will return the long name.
           *
           * @default false
           */
          useAbbr?: boolean;
        } = {}
  ): string {
    if (typeof options === 'boolean') {
      options = { useAbbr: options };
    }

    const { useAbbr = false } = options;

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
   * @param options Whether to use abbreviated or an options object.
   * @param options.useAbbr If true this will return abbreviated directions (N, E, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.cardinalDirection() // 'North'
   * faker.location.cardinalDirection(false) // 'South'
   * faker.location.cardinalDirection(true) // 'N'
   * faker.location.cardinalDirection({ useAbbr: true }) // 'W'
   *
   * @since 8.0.0
   */
  cardinalDirection(
    options:
      | boolean
      | {
          /**
           * If true this will return abbreviated directions (N, E, etc).
           * Otherwise this will return the long name.
           *
           * @default false
           */
          useAbbr?: boolean;
        } = {}
  ): string {
    if (typeof options === 'boolean') {
      options = { useAbbr: options };
    }

    const { useAbbr = false } = options;
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
   * @param options Whether to use abbreviated or an options object.
   * @param options.useAbbr If true this will return abbreviated directions (NW, SE, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * faker.location.ordinalDirection() // 'Northeast'
   * faker.location.ordinalDirection(false) // 'Northwest'
   * faker.location.ordinalDirection(true) // 'NE'
   * faker.location.ordinalDirection({ useAbbr: true }) // 'SW'
   *
   * @since 8.0.0
   */
  ordinalDirection(
    options:
      | boolean
      | {
          /**
           * If true this will return abbreviated directions (NW, SE, etc).
           * Otherwise this will return the long name.
           *
           * @default false
           */
          useAbbr?: boolean;
        } = {}
  ): string {
    if (typeof options === 'boolean') {
      options = { useAbbr: options };
    }

    const { useAbbr = false } = options;
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
   * @param options The options for generating a GPS coordinate.
   * @param options.origin The original coordinate to get a new coordinate close to.
   * If no coordinate is given, a random one will be chosen.
   * @param options.radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
   * @param options.isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
   *
   * @example
   * faker.location.nearbyGPSCoordinate() // [ 33.8475, -170.5953 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170] }) // [ 33.0165, -170.0636 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170], radius: 1000, isMetric: true }) // [ 37.9163, -179.2408 ]
   *
   * @since 8.0.0
   */
  nearbyGPSCoordinate(options?: {
    origin?: [latitude: number, longitude: number];
    radius?: number;
    isMetric?: boolean;
  }): [latitude: number, longitude: number];
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
   *
   * @deprecated Use `faker.location.nearbyGPSCoordinate({ origin, radius, isMetric })` instead.
   */
  nearbyGPSCoordinate(
    coordinate?: [latitude: number, longitude: number],
    radius?: number,
    isMetric?: boolean
  ): [latitude: number, longitude: number];
  /**
   * Generates a random GPS coordinate within the specified radius from the given coordinate.
   *
   * @param options The options for generating a GPS coordinate.
   * @param options.origin The original coordinate to get a new coordinate close to.
   * If no coordinate is given, a random one will be chosen.
   * @param options.radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
   * @param options.isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
   * @param legacyRadius Deprecated, use `options.radius` instead.
   * @param legacyIsMetric Deprecated, use `options.isMetric` instead.
   *
   * @example
   * faker.location.nearbyGPSCoordinate() // [ 33.8475, -170.5953 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170] }) // [ 33.0165, -170.0636 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170], radius: 1000, isMetric: true }) // [ 37.9163, -179.2408 ]
   *
   * @since 8.0.0
   */
  nearbyGPSCoordinate(
    options?:
      | [latitude: number, longitude: number]
      | {
          origin?: [latitude: number, longitude: number];
          radius?: number;
          isMetric?: boolean;
        },
    legacyRadius?: number,
    legacyIsMetric?: boolean
  ): [latitude: number, longitude: number];
  nearbyGPSCoordinate(
    options:
      | [latitude: number, longitude: number]
      | {
          origin?: [latitude: number, longitude: number];
          radius?: number;
          isMetric?: boolean;
        } = {},
    legacyRadius: number = 10,
    legacyIsMetric: boolean = false
  ): [latitude: number, longitude: number] {
    if (Array.isArray(options)) {
      deprecated({
        deprecated:
          'faker.location.nearbyGPSCoordinate(coordinate, radius, isMetric)',
        proposed:
          'faker.location.nearbyGPSCoordinate({ origin, radius, isMetric })',
        since: '8.0',
        until: '9.0',
      });
      options = { origin: options };
    }

    const {
      origin,
      radius = legacyRadius,
      isMetric = legacyIsMetric,
    } = options;

    // If there is no origin, the best we can do is return a random GPS coordinate.
    if (origin == null) {
      return [this.latitude(), this.longitude()];
    }

    const angleRadians = this.faker.number.float({
      max: 2 * Math.PI,
      precision: 0.00001,
    }); // in ° radians

    const radiusMetric = isMetric ? radius : radius * 1.60934; // in km
    const errorCorrection = 0.995; // avoid float issues
    const distanceInKm =
      this.faker.number.float({
        max: radiusMetric,
        precision: 0.001,
      }) * errorCorrection; // in km

    /**
     * The distance in km per degree for earth.
     */
    // TODO @Shinigami92 2022-04-26: Provide an option property to provide custom circumferences.
    const kmPerDegree = 40_000 / 360; // in km/°

    const distanceInDegree = distanceInKm / kmPerDegree; // in °

    const coordinate: [latitude: number, longitude: number] = [
      origin[0] + Math.sin(angleRadians) * distanceInDegree,
      origin[1] + Math.cos(angleRadians) * distanceInDegree,
    ];

    // Box latitude [-90°, 90°]
    coordinate[0] = coordinate[0] % 180;
    if (coordinate[0] < -90 || coordinate[0] > 90) {
      coordinate[0] = Math.sign(coordinate[0]) * 180 - coordinate[0];
      coordinate[1] += 180;
    }

    // Box longitude [-180°, 180°]
    coordinate[1] = (((coordinate[1] % 360) + 540) % 360) - 180;

    return [coordinate[0], coordinate[1]];
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
