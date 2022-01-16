import Faker from '..';
import vi from '../locales/vi';
import en from '../locales/en';

const faker = new Faker({
  locale: 'vi',
  localeFallback: 'en',
  locales: {
    vi,
    en,
  },
});

export = faker;
