import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import company from './company';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const zu_ZA: LocaleDefinition = {
  title: 'Zulu (South Africa)',
  address,
  cell_phone,
  company,
  internet,
  name,
  phone_number,
};

export default zu_ZA;
