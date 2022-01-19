import type { LocaleDefinition } from '../..';
import adresses from './adresses';
import cell_phone from './cell_phone';
import internet from './internet';
import name from './name';
import phone_number from './phone_number';

const fr_BE: LocaleDefinition = {
  title: 'Français (Belgique)',
  adresses,
  cell_phone,
  internet,
  name,
  phone_number,
};

export default fr_BE;
