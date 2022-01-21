import { Faker } from '..';
import en_BORK from '../locales/en_BORK';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_BORK',
  localeFallback: 'en',
  locales: {
    en_BORK,
    en,
  },
});

export default faker;
