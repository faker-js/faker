import type { LocaleDefinition } from '../..';
import address from './address';
import company from './company';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const uk: LocaleDefinition = {
  title: 'Ukrainian',
  address,
  company,
  internet,
  name,
  phone_number,
};

export default uk;
