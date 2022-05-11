import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to companies.
 */
export type CompanyDefinitions = LocaleEntry<{
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
}>;
