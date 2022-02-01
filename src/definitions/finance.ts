import { allOf } from './utils';

/**
 * The possible definitions related to finances.
 */
export interface FinanceDefinitions {
  /**
   * The types of accounts/purposes of an account (e.g. `Savings` account).
   */
  account_type: string[];
  /**
   * The pattern by provider used to generate credit card codes.
   * `L` will be replaced by the check bit.
   *
   * @see Helpers.replaceCreditCardSymbols()
   */
  credit_card: { [provider: string]: string[] };
  /**
   * Currencies by their full name and their symbols (e.g. `US Dollar` -> `USD` / `$`).
   */
  currency: { [currencyName: string]: FinanceCurrencyEntryDefinitions };
  /**
   * Types of transactions (e.g. `deposit`).
   */
  transaction_type: string[];
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
export const FINANCE = allOf<keyof FinanceDefinitions>()(
  'account_type',
  'credit_card',
  'currency',
  'transaction_type'
);
