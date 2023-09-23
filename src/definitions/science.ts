import type { ChemicalElement, Notation, Unit } from '../modules/science';
import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to science.
 */
export type ScienceDefinition = LocaleEntry<{
  /**
   * Some science units.
   */
  unit: ReadonlyArray<Unit>;

  /**
   * Some periodic table element information.
   */
  chemicalElement: ReadonlyArray<ChemicalElement>;

  /**
   * Some science notations
   */
  notation: ReadonlyArray<Notation>;
}>;
