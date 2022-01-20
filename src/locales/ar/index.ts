import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import date from './date';
import name from './name';
import phone_number from './phone_number';
import team from './team';
import vehicle from './vehicle';

const ar: LocaleDefinition = {
  title: 'Arabic',
  separator: ' & ',
  address,
  cell_phone,
  commerce,
  date,
  name,
  phone_number,
  team,
  vehicle,
};

export default ar;
