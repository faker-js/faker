import type { LocaleDefinition } from '../..';
import address from './address';
import commerce from './commerce';
import date from './date';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const hy: LocaleDefinition = {
  title: 'Armenian',
  separator: ' և ',
  address,
  commerce,
  date,
  internet,
  lorem,
  name,
  phone_number,
};

export default hy;
