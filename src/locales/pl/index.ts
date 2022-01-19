import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import company from './company';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const pl: LocaleDefinition = {
  title: 'Polish',
  address,
  cell_phone,
  company,
  internet,
  lorem,
  name,
  phone_number,
};

export default pl;
