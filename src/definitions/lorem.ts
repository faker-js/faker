import { allOf } from './utils';

/**
 * The possible definitions related to lorem texts.
 */
export interface LoremDefinitions {
  /**
   * Lorem words used to generate dummy texts.
   */
  words: string[];
}

/**
 * Internal: A list of all keys for the LoremDefinitions.
 */
export const LOREM = allOf<keyof LoremDefinitions>()('words');
