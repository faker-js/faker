import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import company from './company';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const en_ZA: LocaleDefinition = {
  title: 'English (South Africa)',
  address,
  cell_phone,
  company,
  internet,
  name,
  phone_number,
};

export default en_ZA;
