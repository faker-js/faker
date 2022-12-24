import type { LocaleEntry } from './definitions';

export type AirlineDefinitions = LocaleEntry<{
  /**
   * IATA three-letter airport codes.
   */
  airport: string[];
}>;
