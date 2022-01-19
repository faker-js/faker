import type { LocaleDefinition } from '../..';

const mk: LocaleDefinition = {
  title: 'Macedonian',
  separator: ' и ',
  address: require('./address'),
  cell_phone: require('./cell_phone'),
  phone_number: require('./phone_number'),
  name: require('./name'),
  date: require('./date'),
  internet: require('./internet'),
  company: require('./company'),
};

export default mk;
