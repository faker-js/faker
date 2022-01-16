import type { LocaleDefinition } from '../..';

const ja: LocaleDefinition = {
  title: 'Japanese',
  address: require('./address'),
  phone_number: require('./phone_number'),
  cell_phone: require('./cell_phone'),
  name: require('./name'),
  lorem: require('./lorem'),
};

export default ja;
