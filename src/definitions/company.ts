import { allOf } from './utils';

/**
 * The possible definitions related to companies.
 */
export interface CompanyDefinitions {
  /**
   * Business/products related adjectives.
   */
  bs_adjective: string[];
  /**
   * Business/products related nouns.
   */
  bs_noun: string[];
  /**
   * Business/products related verbs.
   */
  bs_verb: string[];
  /**
   * Catch phrase adjectives.
   */
  adjective: string[];
  /**
   * Catch phrase adjectives.
   */
  descriptor: string[];
  /**
   * Catch phrase adjectives.
   */
  noun: string[];
  /**
   * Company suffixes
   */
  suffix: string[];
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
