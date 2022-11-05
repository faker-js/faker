import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to computer.
 */
export type ComputerDefinitions = LocaleEntry<{
  brand: string[];
  model: string[];
  os: string[];
  cpu: string[];
  ram: string[];
  graphicCard: string[];
  memoryStorageCapacity: string[];
  productDimensions: string[];
  screenSize: string[];
}>;
