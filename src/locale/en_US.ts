import Faker from '..';
import en_US from '../locales/en_US';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_US',
  localeFallback: 'en',
  locales: {
    en_US,
    en,
  },
});

export default faker;
