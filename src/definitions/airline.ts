import type { Airline } from '../modules/airline/airline';
import type { Airplane } from '../modules/airline/airplane';
import type { Airport } from '../modules/airline/airport';
import type { LocaleEntry } from './definitions';

export type AirlineDefinition = LocaleEntry<{
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
