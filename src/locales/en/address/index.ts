import { state, street_name, street_address } from '../../ar/address';
import { time_zone } from '../../es/address';
import { building_number } from './building_number';
import { city } from './city';
import { city_name } from './city_name';
import { city_prefix } from './city_prefix';
import { city_suffix } from './city_suffix';
import { country } from './country';
import { country_code } from './country_code';
import { country_code_alpha_3 } from './country_code_alpha_3';
import { county } from './county';
import { default_country } from './default_country';
import { direction } from './direction';
import { direction_abbr } from './direction_abbr';
import { postcode } from './postcode';
import { postcode_by_state } from './postcode_by_state';
import { secondary_address } from './secondary_address';
import { state_abbr } from './state_abbr';
import { street_suffix } from './street_suffix';

export const address = {
  city_prefix: city_prefix,
  city_suffix: city_suffix,
  city_name: city_name,
  county: county,
  country: country,
  country_code: country_code,
  country_code_alpha_3: country_code_alpha_3,
  building_number: building_number,
  street_suffix: street_suffix,
  secondary_address: secondary_address,
  postcode: postcode,
  postcode_by_state: postcode_by_state,
  state: state,
  state_abbr: state_abbr,
  time_zone: time_zone,
  city: city,
  street_name: street_name,
  street_address: street_address,
  default_country: default_country,
  direction: direction,
  direction_abbr: direction_abbr,
};
export default address;
