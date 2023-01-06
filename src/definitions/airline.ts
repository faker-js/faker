import type { Airline, Airplane, Airport } from '../modules/airline';
import type { LocaleEntry } from './definitions';

export type AirlineDefinitions = LocaleEntry<{
  /**
   * Some airline information
   */
  airline: Airline[];

  /**
   * Some airplane information
   */
  airplane: Airplane[];

  /**
   * Some airport information
   */
  airport: Airport[];
}>;
