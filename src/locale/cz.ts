import { Faker } from '..';
import cz from '../locales/cz';
import en from '../locales/en';

const faker = new Faker({
  locale: 'cz',
  localeFallback: 'en',
  locales: {
    cz,
    en,
  },
});

export default faker;
