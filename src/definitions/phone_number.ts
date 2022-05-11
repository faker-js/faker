import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to phone numbers.
 */
export type PhoneNumberDefinitions = LocaleEntry<{
  /**
   * Some patterns used to generate phone numbers.
   * `#` will be replaced by a random digit (0-9).
   * `!` will be replaced by a random digit (2-9).
   * (e.g. `!##-!##-####` -> 272-285-0453)
   *
   * @see Helpers.replaceSymbolWithNumber(format)
   */
  formats: string[];
}>;
