import type { LocaleDefinition } from '../..';

const ar: LocaleDefinition = {
  title: 'Arabic',
  separator: ' & ',
  address: require('./address'),
  name: require('./name'),
  phone_number: require('./phone_number'),
  cell_phone: require('./cell_phone'),
  commerce: require('./commerce'),
  vehicle: require('./vehicle'),
  team: require('./team'),
  date: require('./date'),
};

export default ar;
