import type { Format, Formats, Texts } from './utils';
import { allOf } from './utils';

/**
 * The possible definitions related to addresses.
 */
export interface AddressDefinitions {
  /**
   * Postcodes patterns by state
   */
  // TODO ST-DDT 2022-01-31: address.zipCodeByState() expects only { [state: string]: Range }
  postcode_by_state: Formats | { [state: string]: Range };
  /**
   * Postcodes patterns
   */
  postcode: Format | Formats;

  /**
   * Names of actual cities
   */
  city_name?: Texts;
  /**
   * Common city prefixes
   */
  city_prefix: Texts;
  /**
   * Common city suffixes
   */
  city_suffix: Texts;

  /**
   * The names of all countries
   */
  country: Texts;
  /**
   * The names of this country's states
   */
  state: Texts;
  /**
   * The abbreviated names of this country's states
   */
  state_abbr: Texts;
  /**
   * The names of counties inside the country or state
   */
  county: Texts;

  /**
   * The names of the compass directions.
   * First the 4 cardinal directions, then the 4 ordinal directions
   */
  direction: Texts;
  /**
   * The abbreviated names of the compass directions.
   * First the 4 cardinal directions, then the 4 ordinal directions
   */
  direction_abbr: Texts;

  /**
   * Common street prefixes
   */
  street_prefix: Texts;
  /**
   * Common street suffixes
   */
  street_suffix: Texts;

  /**
   * The address "inside" an address/e.g. an apartment or office.
   */
  secondary_address: Texts;

  /**
   * The ISO-3166-1 ALPHA-2 country codes
   */
  country_code: Texts;
  /**
   * The ISO-3166-1 ALPHA-3 country codes
   */
  country_code_alpha_3: Texts;

  // A list of timezones names.
  time_zone: Texts;
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

  'street_prefix',
  'street_suffix',

  'secondary_address',

  'country_code',
  'country_code_alpha_3',

  'time_zone'
);
