import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to computers.
 */
export interface HackerDefinitions {
  /**
   * Generic computer related abbreviations (e.g. `RAM`, `EXE`).
   */
  abbreviation: Texts;
  /**
   * Some computer related adjectives or descriptors (e.g. `digital`, `bluetooth`)
   */
  adjective: Texts;
  /**
   * Some computer related verbs for continuous actions (en: `ing` suffix; e.g. `hacking`).
   */
  ingverb: Texts;
  /**
   * Some computer related nouns (e.g. `protocol`, `sensor`)
   */
  noun: Texts;
  /**
   * Some phrases that will be injected with random hacker values.
   */
  phrase: HackerPhraseDefinitions;
  /**
   * Some computer related verbs (e.g. `hack`).
   */
  verb: Texts;
}

/**
 * An array of phrases that will have its placeholders filled with some hacker terms.
 * May use any of the HackerDefinition keys wrapped in double braces.
 * (e.g. `I'm {{ingverb}} {{adjective}} {{noun}}` )
 */
export type HackerPhraseDefinitions = string[];

/**
 * Internal: A list of all keys for the HackerDefinitions.
 */
export const HACKER = allOf<keyof HackerDefinitions>()(
  'abbreviation',
  'adjective',
  'ingverb',
  'noun',
  'phrase',
  'verb'
);
