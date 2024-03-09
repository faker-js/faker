import type { CreditCardIssuerType, Currency } from '../modules/finance';
import type { LocaleEntry } from './definitions';
/**
 * The possible definitions related to finance.
 */
export type FinanceDefinition = LocaleEntry<{
  /**
   * The types of accounts/purposes of an account (e.g. `Savings` account).
   */
  account_type: string[];

  /**
   * The issers of credit cards that are commonly used in this locale.
   */
  common_credit_card_issuer: CreditCardIssuerType[];

  /**
   * Currencies including their name, code and symbol (e.g. `US Dollar` / `USD` / `$`).
   */
  currency: Currency[];

  /**
   * Types of transactions (e.g. `deposit`).
   */
  transaction_type: string[];
}>;
