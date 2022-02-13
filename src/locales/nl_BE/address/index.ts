/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */
import type { AddressDefinitions } from '../../..';
import building_number from './building_number';
import city from './city';
import city_prefix from './city_prefix';
import city_suffix from './city_suffix';
import default_country from './default_country';
import postcode from './postcode';
import secondary_address from './secondary_address';
import state from './state';
import state_abbr from './state_abbr';
import street_address from './street_address';
import street_name from './street_name';
import street_suffix from './street_suffix';

const address = {
  building_number,
  city,
  city_prefix,
  city_suffix,
  default_country,
  postcode,
  secondary_address,
  state,
  state_abbr,
  street_address,
  street_name,
  street_suffix,
} as Partial<AddressDefinitions>;

export default address;
