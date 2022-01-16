import Faker from '..';
import fr_CH from '../locales/fr_CH';
import en from '../locales/en';

const faker = new Faker({
  locale: 'fr_CH',
  localeFallback: 'en',
  locales: {
    fr_CH,
    en,
  },
});

export = faker;
