import type { LocaleDefinition } from '../..';

const el: LocaleDefinition = {
  title: 'Greek',
  separator: ' & ',
  address: require('./address'),
  // TODO @Shinigami92 2022-01-16: Maybe we need to move `credit_card` into `finance`
  // @ts-expect-error
  credit_card: require('./credit_card'),
  company: require('./company'),
  internet: require('./internet'),
  lorem: require('./lorem'),
  name: require('./name'),
  phone_number: require('./phone_number'),
  cell_phone: require('./cell_phone'),
  business: require('./business'),
  commerce: require('./commerce'),
  team: require('./team'),
  hacker: require('./hacker'),
  app: require('./app'),
  finance: require('./finance'),
};

export default el;
