import { Faker } from '..';
import it from '../locales/it';
import en from '../locales/en';

const faker = new Faker({
  locale: 'it',
  localeFallback: 'en',
  locales: {
    it,
    en,
  },
});

export default faker;
