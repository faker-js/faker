import type { LocaleDefinition } from '../..';

const ru: LocaleDefinition = {
  title: 'Russian',
  separator: ' и ',
  address: require('./address'),
  internet: require('./internet'),
  lorem: require('./lorem'),
  name: require('./name'),
  phone_number: require('./phone_number'),
  commerce: require('./commerce'),
  company: require('./company'),
  date: require('./date'),
  hacker: require('./hacker'),
};

export default ru;
