import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to finances.
 */
export interface FinanceDefinitions {
  /**
   * The types of accounts/purposes of an account (e.g. `Savings` account).
   */
  account_type: Texts;
  /**
   * Patterns for credit cards used in this locale.
   */
  credit_card: FinanceCreditCardDefinitions;
  /**
   * Currencies and their symbols (e.g. `US Dollar` -> `USD` / `$`).
   */
  currency: FinanceCurrencyDefinitions;
  /**
   * Types of transactions (e.g. `deposit`).
   */
  transaction_type: Texts;
}

/**
 * The credit card patterns by provider (e.g. Visa -> ['34##-######-####L'])
 */
export interface FinanceCreditCardDefinitions {
  [provider: string]: FinanceCreditCardPattern[];
}

/**
 * The pattern used to generate credit card codes.
 * `L` will be replaced by the check bit.
 *
 * @see Helpers.replaceCreditCardSymbols()
 */
export type FinanceCreditCardPattern = string;

/**
 * The possible definitions related to currencies.
 */
export interface FinanceCurrencyDefinitions {
  /**
   * The information about currencies by their full name.
   */
  [currencyName: string]: FinanceCurrencyEntryDefinitions;
}

/**
 * The possible definitions related to currency entries.
 */
export interface FinanceCurrencyEntryDefinitions {
  /**
   * The code/short text/abbreviation for the currency (e.g. `USD`).
   */
  code: string;
  /**
   * The symbol for the currency (e.g. `$`).
   */
  symbol: string;
}

/**
 * Internal: A list of all keys for the FinanceDefinitions.
 */
export const finance = allOf<keyof FinanceDefinitions>()(
  'account_type',
  'credit_card',
  'currency',
  'transaction_type'
);
