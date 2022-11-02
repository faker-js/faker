import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to flight's names.
 */
export type FlightsDefinitions = LocaleEntry<{
  airline: string[];
  type: string[];
  class_: string[];
  number: string[];
}>;
