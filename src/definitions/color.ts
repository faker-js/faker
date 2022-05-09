import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to color.
 */
export type ColorDefinitions = LocaleEntry<{
  /**
   * Human readable color names
   */
  human: string[];
  /**
   * Color space names.
   */
  space: string[];
}>;
