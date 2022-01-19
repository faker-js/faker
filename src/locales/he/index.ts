import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import date from './date';
import lorem from './lorem';
import music from './music';
import name from './name';
import phone_number from './phone_number';

const he: LocaleDefinition = {
  title: 'Hebrew',
  separator: 'ו ',
  address,
  cell_phone,
  commerce,
  date,
  lorem,
  music,
  name,
  phone_number,
};

export default he;
