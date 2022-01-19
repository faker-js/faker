import type { LocaleDefinition } from '../..';

const sv: LocaleDefinition = {
  title: 'Swedish',
  address: require('./address'),
  company: require('./company'),
  internet: require('./internet'),
  name: require('./name'),
  phone_number: require('./phone_number'),
  cell_phone: require('./cell_phone'),
  commerce: require('./commerce'),
  team: require('./team'),
  date: require('./date'),
};

export default sv;
