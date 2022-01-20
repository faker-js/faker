import type { LocaleDefinition } from '../..';
import address from './address';
import commerce from './commerce';
import company from './company';
import date from './date';
import hacker from './hacker';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const ru: LocaleDefinition = {
  title: 'Russian',
  separator: ' и ',
  address,
  commerce,
  company,
  date,
  hacker,
  internet,
  lorem,
  name,
  phone_number,
};

export default ru;
