import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to computers.
 */
export type HackerDefinition = LocaleEntry<{
  /**
   * Generic computer related abbreviations (e.g. `RAM`, `EXE`).
   */
  abbreviation: string[];

  /**
   * Some computer related adjectives or descriptors (e.g. `digital`, `bluetooth`)
   */
  adjective: string[];

  /**
   * Some computer related verbs for continuous actions (en: `ing` suffix; e.g. `hacking`).
   */
  ingverb: string[];

  /**
   * Some computer related nouns (e.g. `protocol`, `sensor`).
   */
  noun: string[];

  /**
   * Some phrases that will be injected with random hacker words.
   * May use any of the hacker module methods prefixed with `hacker.` wrapped in double braces
   * (e.g. `I'm {{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}}`).
   *
   * @see faker.helpers.fake(): For more information about how the phrases are generated.
   */
  phrase: string[];

  /**
   * Some computer related verbs (e.g. `hack`).
   */
  verb: string[];
}>;
