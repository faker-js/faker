import Faker from '..';
import he from '../locales/he';
import en from '../locales/en';

const faker = new Faker({
  locale: 'he',
  localeFallback: 'en',
  locales: {
    he,
    en,
  },
});

export default faker;
