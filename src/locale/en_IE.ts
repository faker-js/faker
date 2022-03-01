/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import en from '../locales/en';
import en_IE from '../locales/en_IE';

const faker = new Faker({
  locale: 'en_IE',
  localeFallback: 'en',
  locales: {
    en_IE,
    en,
  },
});

export = faker;
