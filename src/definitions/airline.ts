import type { LocaleEntry } from '../';
import type { Airline, Airplane, Airport } from '../modules/airline';

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
