import { Faker } from '..';
import en_AU_ocker from '../locales/en_AU_ocker';
import en from '../locales/en';

const faker = new Faker({
  locale: 'en_AU_ocker',
  localeFallback: 'en',
  locales: {
    en_AU_ocker,
    en,
  },
});

export = faker;
