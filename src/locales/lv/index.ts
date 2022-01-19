import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import company from './company';
import date from './date';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const lv: LocaleDefinition = {
  title: 'Latvian',
  separator: ' un ',
  address,
  cell_phone,
  commerce,
  company,
  date,
  internet,
  lorem,
  name,
  phone_number,
};

export default lv;
