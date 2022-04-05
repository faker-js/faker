import { allOf } from './utils';

/**
 * The possible definitions related to words.
 */
export interface WordDefinitions {
  adjective: string[];
  adverb: string[];
  conjunction: string[];
  interjection: string[];
  noun: string[];
  preposition: string[];
  verb: string[];
}

/**
 * Internal: A list of all keys for the WordDefinitions.
 */
export const WORD = allOf<keyof WordDefinitions>()(
  'adjective',
  'adverb',
  'conjunction',
  'interjection',
  'noun',
  'preposition',
  'verb'
);
