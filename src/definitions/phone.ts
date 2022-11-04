import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to phone numbers.
 */
export type PhoneDefinitions = LocaleEntry<{
  brand: string[];
  model: string[];
  camera: string[];
  os: string[];
  connectivityTechnologies: string[];
  cellularTechnologies: string[];
  productDimensions: string[];
  memoryStorageCapacity: string[];
  screenSize: string[];
  /**
   * Some patterns used to generate phone numbers.
   * `#` will be replaced by a random digit (0-9).
   * `!` will be replaced by a random digit (2-9).
   * (e.g. `!##-!##-####` -> 272-285-0453)
   *
   * @see faker.helpers.replaceSymbolWithNumber(format)
   */
  numberFormats: string[];
}>;
