import { allOf } from './utils';

/**
 * The possible definitions related to addresses.
 */
export interface AddressDefinitions {
  /**
   * Postcodes patterns by state
   */
  postcode_by_state: { [state: string]: { min: number; max: number } };
  /**
   * Postcodes patterns (Fake-Pattern | Fake-Pattern[]).
   */
  postcode: string | string[];

  /**
   * Names of actual cities
   */
  city_name?: string[];
  /**
   * Common city prefixes
   */
  city_prefix: string[];
  /**
   * Common city suffixes
   */
  city_suffix: string[];

  /**
   * The names of all countries
   */
  country: string[];
  /**
   * The names of this country's states
   */
  state: string[];
  /**
   * The abbreviated names of this country's states
   */
  state_abbr: string[];
  /**
   * The names of counties inside the country or state
   */
  county: string[];

  /**
   * The names of the compass directions.
   * First the 4 cardinal directions, then the 4 ordinal directions
   */
  direction: string[];
  /**
   * The abbreviated names of the compass directions.
   * First the 4 cardinal directions, then the 4 ordinal directions
   */
  direction_abbr: string[];

  /**
   * The pattern used to generate building numbers.
   */
  building_number: string[];

  /**
   * Common street prefixes
   */
  street_prefix: string[];
  /**
   * Common street suffixes
   */
  street_suffix: string[];

  /**
   * The pattern used to generate street addresses.
   */
  street_address: {
    /**
     * The fake pattern to generate only the street address.
     */
    normal: string;
    /**
     * The fake pattern to generate the full street address including the secondary address.
     */
    full: string;
  };

  /**
   * The address "inside" an address/e.g. an apartment or office.
   */
  secondary_address: string[];

  /**
   * The ISO-3166-1 ALPHA-2 country codes related to this locale.
   */
  country_code: string[];
  /**
   * The ISO-3166-1 ALPHA-3 country codes related to this locale.
   */
  country_code_alpha_3: string[];

  // A list of timezones names.
  time_zone: string[];
}

/**
 * Internal: A list of all keys for the AddressDefinitions.
 */
export const ADDRESS = allOf<keyof AddressDefinitions>()(
  'postcode_by_state',
  'postcode',

  'city_name',
  'city_prefix',
  'city_suffix',

  'country',
  'state',
  'state_abbr',
  'county',

  'direction_abbr',
  'direction',

  'building_number',

  'street_prefix',
  'street_suffix',

  'street_address',
  'secondary_address',

  'country_code',
  'country_code_alpha_3',

  'time_zone'
);
