import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to companies.
 */
export interface CompanyDefinitions {
  /**
   * Business/products related adjectives.
   */
  bs_adjective: Texts;
  /**
   * Business/products related nouns.
   */
  bs_noun: Texts;
  /**
   * Business/products related verbs.
   */
  bs_verb: Texts;
  /**
   * Catch phrase adjectives.
   */
  adjective: Texts;
  /**
   * Catch phrase adjectives.
   */
  descriptor: Texts;
  /**
   * Catch phrase adjectives.
   */
  noun: Texts;
  /**
   * Company suffixes
   */
  suffix: Texts;
}

/**
 * Internal: A list of all keys for the CompanyDefinitions.
 */
export const COMPANY = allOf<keyof CompanyDefinitions>()(
  'bs_adjective',
  'bs_noun',
  'bs_verb',

  'adjective',
  'descriptor',
  'noun',

  'suffix'
);
