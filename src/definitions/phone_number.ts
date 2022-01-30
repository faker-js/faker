import { allOf } from './utils';

/**
 * The possible definitions related to phone numbers.
 */
export interface PhoneNumberDefinitions {
  /**
   * Some formats for phone numbers.
   */
  formats: PhoneNumberFormatDefinitions;
}

/**
 * An array of phone number patterns.
 * `#` will be replaced by a random digit (0-9).
 * `!` will be replaced by a random digit (2-9).
 * (e.g. `!##-!##-####` -> 272-285-0453)
 *
 * @see Helpers.replaceSymbolWithNumber(format)
 */
export type PhoneNumberFormatDefinitions = string[];

/**
 * Internal: A list of all keys for the PhoneNumberDefinitions.
 */
export const phone_number = allOf<keyof PhoneNumberDefinitions>()('formats');
