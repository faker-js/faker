import { allOf } from './utils';

/**
 * The possible definitions related to color.
 */
export interface ColorDefinitions {
  /**
   * Human readable color names
   */
  human: string[];
  /**
   * Color space names.
   */
  space: string[];
}

/**
 * Internal: A list of all keys for the ColorDefinitions.
 */
export const COLOR = allOf<keyof ColorDefinitions>()('human', 'space');
