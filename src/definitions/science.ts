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
   * Some chemical element informtion.
   */
  chemicalElement: ChemicalElement[];
}>;

/**
 * The possible definitions related to elements.
 */
export interface ChemicalElement {
  /**
   * The symbol for the element (e.g. `He`).
   */
  symbol: string;
  /**
   * The name for the element (e.g. `Cerium`).
   */
  name: string;
}
