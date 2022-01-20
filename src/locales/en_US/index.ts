import type { LocaleDefinition } from '../..';
import address from './address';
import internet from './internet';
import phone_number from './phone_number';

const en_US: LocaleDefinition = {
  title: 'English (United States)',
  address,
  internet,
  phone_number,
};

export default en_US;
