import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to colors.
 */
export type ColorDefinitions = LocaleEntry<{
  /**
   * Human readable color names.
   */
  human: string[];

  /**
   * Color space names.
   */
  space: string[];

  /**
   * Functions supported by CSS to produce color.
   */
  css_function: string[];

  /**
   * Color space names supported by CSS.
   */
  css_space: string[];
}>;
