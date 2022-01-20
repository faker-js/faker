import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import company from './company';
import date from './date';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const mk: LocaleDefinition = {
  title: 'Macedonian',
  separator: ' и ',
  address,
  cell_phone,
  company,
  date,
  internet,
  name,
  phone_number,
};

export default mk;
