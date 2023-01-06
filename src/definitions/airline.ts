import type { Airline, Airplane, Airport } from '../modules/airline';
import type { LocaleEntry } from './definitions';

export type AirlineDefinitions = LocaleEntry<{
  /**
   * Some airline information
   */
  airlines: Airline[];

  /**
   * Some airplane information
   */
  airplane: Airplane[];

  /**
   * Some airport information
   */
  airport: Airport[];
}>;
