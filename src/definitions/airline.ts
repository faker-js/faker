import type { Airline, Airplane, Airport } from '../modules/airline';
import type { LocaleEntry } from './definitions';

export type AirlineDefinitions = LocaleEntry<{
  /**
   * Some airline information
   */
  airline: readonly Airline[];

  /**
   * Some airplane information
   */
  airplane: readonly Airplane[];

  /**
   * Some airport information
   */
  airport: readonly Airport[];
}>;
