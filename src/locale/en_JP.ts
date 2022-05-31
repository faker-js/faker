/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import en from '../locales/en';
import en_JP from '../locales/en_JP';

export const faker = new Faker({
  locale: 'en_JP',
  localeFallback: 'en',
  locales: {
    en_JP,
    en,
  },
});
