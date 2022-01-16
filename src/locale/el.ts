import Faker from '..';
import el from '../locales/el';
import en from '../locales/en';

const faker = new Faker({
  locale: 'el',
  localeFallback: 'en',
  locales: {
    el,
    en,
  },
});

export = faker;
