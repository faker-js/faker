import { Faker } from '..';
import ro from '../locales/ro';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ro',
  localeFallback: 'en',
  locales: {
    ro,
    en,
  },
});

export default faker;
