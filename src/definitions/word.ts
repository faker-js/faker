import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to words.
 */
export interface WordDefinitions {
  adjective: Texts;
  adverb: Texts;
  conjunction: Texts;
  interjection: Texts;
  noun: Texts;
  preposition: Texts;
  verb: Texts;
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
