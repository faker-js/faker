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
   * Catchphrase adjectives.
   */
  adjective: string[];

  /**
   * Catchphrase descriptors.
   */
  descriptor: string[];

  /**
   * A list of patterns used to generate company names.
   */
  name_patterns: string[];

  /**
   * Catchphrase nouns.
   */
  noun: string[];

  /**
   * Company/Business entity types.
   *
   * @deprecated Use `faker.company.name` instead.
   */
  suffix: string[];
}>;
