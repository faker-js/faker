import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import date from './date';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const ro: LocaleDefinition = {
  title: 'Romanian',
  address,
  cell_phone,
  date,
  internet,
  name,
  phone_number,
};

export default ro;
