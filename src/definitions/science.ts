import type { ChemicalElement, Unit } from '../modules/science';
import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to science.
 */
export type ScienceDefinitions = LocaleEntry<{
  /**
   * Some science units.
   */
  unit: readonly Unit[];
  /**
   * Some periodic table element informtion.
   */
  chemicalElement: readonly ChemicalElement[];
}>;
