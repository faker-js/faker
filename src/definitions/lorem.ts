import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to lorem texts.
 */
export interface LoremDefinitions {
  words: Texts;
}

/**
 * Internal: A list of all keys for the LoremDefinitions.
 */
export const lorem = allOf<keyof LoremDefinitions>()('words');
