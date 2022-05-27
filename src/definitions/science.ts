import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to science.
 */
export type ScienceDefinitions = LocaleEntry<{
  /**
   * Some science units (short).
   */
  shortUnit: string[];
  /**
   * Some science units (long).
   */
  longUnit: string[];
  /**
   * Some element informtion.
   */
  element: Element[];
}>;

/**
 * The possible definitions related to elements.
 */
export interface Element {
  /**
   * The symbol for the element (e.g. `He`).
   */
  symbol: string;
  /**
   * The name for the element (e.g. `Cerium`).
   */
  name: string;
}
