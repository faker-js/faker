import type { AddressDefinitions } from '../../../definitions';
import building_number from './building_number';
import city from './city';
import city_name from './city_name';
import city_prefix from './city_prefix';
import city_suffix from './city_suffix';
import country from './country';
import country_code from './country_code';
import country_code_alpha_3 from './country_code_alpha_3';
import county from './county';
import default_country from './default_country';
import direction from './direction';
import direction_abbr from './direction_abbr';
import postcode from './postcode';
import postcode_by_state from './postcode_by_state';
import secondary_address from './secondary_address';
import state from './state';
import state_abbr from './state_abbr';
import street_address from './street_address';
import street_name from './street_name';
import street_suffix from './street_suffix';
import time_zone from './time_zone';

const address = {
  postcode,
  postcode_by_state,

  city,
  city_name,
  city_prefix,
  city_suffix,

  country,
  state,
  state_abbr,
  county,

  direction,
  direction_abbr,

  // street_prefix
  street_suffix,

  secondary_address,

  country_code,
  country_code_alpha_3,

  time_zone,

  // Extra
  street_address,
  street_name,
  default_country,
  building_number,
} as Partial<AddressDefinitions>;

export default address;
