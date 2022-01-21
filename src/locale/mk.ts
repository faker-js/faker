import { Faker } from '..';
import mk from '../locales/mk';
import en from '../locales/en';

const faker = new Faker({
  locale: 'mk',
  localeFallback: 'en',
  locales: {
    mk,
    en,
  },
});

export default faker;
