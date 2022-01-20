import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';

const ja: LocaleDefinition = {
  title: 'Japanese',
  address,
  cell_phone,
  lorem,
  name,
  phone_number,
};

export default ja;
