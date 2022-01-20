import type { LocaleDefinition } from '../..';
import address from './address';
import cell_phone from './cell_phone';
import commerce from './commerce';
import company from './company';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';
import team from './team';

const es_MX: LocaleDefinition = {
  title: 'Spanish (Mexico)',
  separator: ' & ',
  address,
  cell_phone,
  commerce,
  company,
  internet,
  lorem,
  name,
  phone_number,
  team,
};

export default es_MX;
