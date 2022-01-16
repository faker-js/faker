import Faker from '..';
import fr_CA from '../locales/fr_CA';
import en from '../locales/en';

const faker = new Faker({
  locale: 'fr_CA',
  localeFallback: 'en',
  locales: {
    fr_CA,
    en,
  },
});

export default faker;
