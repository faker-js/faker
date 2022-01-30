import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to companies.
 */
export interface CompanyDefinitions {
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

/**
 * Internal: A list of all keys for the CompanyDefinitions.
 */
export const company = allOf<keyof CompanyDefinitions>()(
  'bs_adjective',
  'bs_noun',
  'bs_verb',

  'adjective',
  'descriptor',
  'noun',

  'suffix'
);
