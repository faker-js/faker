import type { LocaleDefinition } from '../..';
import address from './address';
import name from './name';
import phone_number from './phone_number';

const zh_CN: LocaleDefinition = {
  title: 'Chinese',
  address,
  name,
  phone_number,
};

export default zh_CN;
