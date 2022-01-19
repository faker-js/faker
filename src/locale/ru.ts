import { Faker } from '..';
import ru from '../locales/ru';
import en from '../locales/en';

const faker = new Faker({
  locale: 'ru',
  localeFallback: 'en',
  locales: {
    ru,
    en,
  },
});

export = faker;
