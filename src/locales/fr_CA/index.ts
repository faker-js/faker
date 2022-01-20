import type { LocaleDefinition } from '../..';
import address from './address';
import internet from './internet';
import phone_number from './phone_number';

const fr_CA: LocaleDefinition = {
  title: 'French (Canada)',
  address,
  internet,
  phone_number,
};

export default fr_CA;
