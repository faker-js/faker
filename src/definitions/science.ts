import type { ChemicalElement } from '../modules/science/chemical-element';
import type { Unit } from '../modules/science/unit';
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
  chemical_element: ReadonlyArray<ChemicalElement>;
}>;
