import { Faker } from '..';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en',
  localeFallback: 'en',
  locales: {
    en,
  },
});

export default faker;
