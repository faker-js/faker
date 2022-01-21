import { Faker } from '..';
import af_ZA from '../locales/af_ZA';
import en from '../locales/en';

const faker = new Faker({
  locale: 'af_ZA',
  localeFallback: 'en',
  locales: {
    af_ZA,
    en,
  },
});

export default faker;
