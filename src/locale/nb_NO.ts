import Faker from '..';
import nb_NO from '../locales/nb_NO';
import en from '../locales/en';

const faker = new Faker({
  locale: 'nb_NO',
  localeFallback: 'en',
  locales: {
    nb_NO,
    en,
  },
});

export = faker;
