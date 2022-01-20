import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import date from './date';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const pt_PT: LocaleDefinition = {
  title: 'Portuguese (Portugal)',
  address,
  cell_phone,
  commerce,
  date,
  internet,
  name,
  phone_number,
};

export default pt_PT;
