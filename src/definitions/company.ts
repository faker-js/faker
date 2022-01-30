import type { Texts } from '.';
import { allOf } from './utils';

export interface CompanyDefinition {
  // Business/products related words
  bs_adjective: Texts;
  bs_noun;
  bs_verb;
  // Catch phrases
  adjective: Texts;
  descriptor: Texts;
  noun: Texts;
  // Company suffixes
  suffix: Texts;
}

export const companies = allOf<keyof CompanyDefinition>()(
  'bs_adjective',
  'bs_noun',
  'bs_verb',

  'adjective',
  'descriptor',
  'noun',

  'suffix'
);
