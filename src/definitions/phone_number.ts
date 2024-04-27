import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to phone numbers.
 */
export type PhoneNumberDefinition = LocaleEntry<{
  /**
   * Some patterns used to generate phone numbers.
   * `#` will be replaced by a random digit (0-9).
   * `!` will be replaced by a random digit (2-9).
   * (e.g. `!##-!##-####` -> 272-285-0453)
   *
   * @see faker.helpers.replaceSymbolWithNumber(format): For more information about how the patterns are used.
   */
  format: {
    /**
     * Formats for a human-input phone number, e.g. `555-770-7727` or `555.770.7727 x1234`
     */
    human: string[];
    /**
     * Formats for a phone number in a standardized national format, e.g. `(555) 123-4567`.
     */
    national: string[];
    /**
     * Formats for a phone number in the standardised E.123 format, e.g. `+15551234567`
     */
    international: string[];
  };
}>;
