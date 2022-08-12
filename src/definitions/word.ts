import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to words.
 */
export type WordDefinitions = LocaleEntry<{
  adjective: string[];
  adverb: string[];
  conjunction: string[];
  interjection: string[];
  noun: string[];
  preposition: string[];
  verb: string[];
}>;
