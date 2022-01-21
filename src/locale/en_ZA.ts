import { Faker } from '..';
import en_ZA from '../locales/en_ZA';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_ZA',
  localeFallback: 'en',
  locales: {
    en_ZA,
    en,
  },
});

export default faker;
