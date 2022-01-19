import type { LocaleDefinition } from '../..';
import address from './address';
import app from './app';
import business from './business';
import cell_phone from './cell_phone';
import commerce from './commerce';
import company from './company';
import credit_card from './credit_card';
import finance from './finance';
import hacker from './hacker';
import internet from './internet';
import lorem from './lorem';
import name from './name';
import phone_number from './phone_number';
import team from './team';

const el: LocaleDefinition = {
  title: 'Greek',
  separator: ' & ',
  address,
  app,
  business,
  cell_phone,
  commerce,
  company,
  credit_card,
  finance,
  hacker,
  internet,
  lorem,
  name,
  phone_number,
  team,
};

export default el;
