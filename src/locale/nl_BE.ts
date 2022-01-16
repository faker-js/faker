import Faker from '..';
import nl_BE from '../locales/nl_BE';
import en from '../locales/en';

const faker = new Faker({
  locale: 'nl_BE',
  localeFallback: 'en',
  locales: {
    nl_BE,
    en,
  },
});

export default faker;
