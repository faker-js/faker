import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const tr: LocaleDefinition = {
  title: 'Turkish',
  address,
  cell_phone,
  commerce,
  internet,
  lorem,
  name,
  phone_number,
};

export default tr;
