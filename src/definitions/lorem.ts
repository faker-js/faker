import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to lorem texts.
 */
export type LoremDefinitions = LocaleEntry<{
  /**
   * Lorem words used to generate dummy texts.
   */
  words: string[];
}>;
