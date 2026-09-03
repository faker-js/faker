import { ModuleBase } from '../../internal/module-base';
import { accountName as financeAccountName } from './account-name';
import { accountNumber as financeAccountNumber } from './account-number';
import { amount as financeAmount } from './amount';
import { bic as financeBic } from './bic';
import type {
  BitcoinAddressFamilyType,
  BitcoinNetworkType,
} from './bitcoin-address';
import { bitcoinAddress as financeBitcoinAddress } from './bitcoin-address';
import { creditCardCVV as financeCreditCardCVV } from './credit-card-cvv';
import { creditCardIssuer as financeCreditCardIssuer } from './credit-card-issuer';
import { creditCardNumber as financeCreditCardNumber } from './credit-card-number';
import type { Currency } from './currency';
import { currency as financeCurrency } from './currency';
import { currencyCode as financeCurrencyCode } from './currency-code';
import { currencyName as financeCurrencyName } from './currency-name';
import { currencyNumericCode as financeCurrencyNumericCode } from './currency-numeric-code';
import { currencySymbol as financeCurrencySymbol } from './currency-symbol';
import { ethereumAddress as financeEthereumAddress } from './ethereum-address';
import { iban as financeIban } from './iban';
import { litecoinAddress as financeLitecoinAddress } from './litecoin-address';
import { pin as financePin } from './pin';
import { routingNumber as financeRoutingNumber } from './routing-number';
import { transactionDescription as financeTransactionDescription } from './transaction-description';
import { transactionType as financeTransactionType } from './transaction-type';

/**
 * Module to generate finance and money related entries.
 *
 * ### Overview
 *
 * For a random amount, use [`amount()`](https://fakerjs.dev/api/finance.html#amount).
 *
 * For traditional bank accounts, use: [`accountNumber()`](https://fakerjs.dev/api/finance.html#accountnumber), [`accountName()`](https://fakerjs.dev/api/finance.html#accountname), [`bic()`](https://fakerjs.dev/api/finance.html#bic), [`iban()`](https://fakerjs.dev/api/finance.html#iban), [`pin()`](https://fakerjs.dev/api/finance.html#pin) and [`routingNumber()`](https://fakerjs.dev/api/finance.html#routingnumber).
 *
 * For credit card related methods, use: [`creditCardNumber()`](https://fakerjs.dev/api/finance.html#creditcardnumber), [`creditCardCVV()`](https://fakerjs.dev/api/finance.html#creditcardcvv), [`creditCardIssuer()`](https://fakerjs.dev/api/finance.html#creditcardissuer), [`transactionDescription()`](https://fakerjs.dev/api/finance.html#transactiondescription) and [`transactionType()`](https://fakerjs.dev/api/finance.html#transactiontype).
 *
 * For blockchain related methods, use: [`bitcoinAddress()`](https://fakerjs.dev/api/finance.html#bitcoinaddress), [`ethereumAddress()`](https://fakerjs.dev/api/finance.html#ethereumaddress) and [`litecoinAddress()`](https://fakerjs.dev/api/finance.html#litecoinaddress).
 */
export class FinanceModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree finance' to update the methods from their respective files.
   */

  /**
   * Generates a random account number.
   *
   * @param length The length of the account number. Defaults to `8`.
   *
   * @see faker.string.numeric(): For generating the number with greater control.
   *
   * @example
   * faker.finance.accountNumber() // '92842238'
   * faker.finance.accountNumber(5) // '32564'
   *
   * @since 8.0.0
   */
  accountNumber(length?: number): string;
  /**
   * Generates a random account number.
   *
   * @param options An options object.
   * @param options.length The length of the account number. Defaults to `8`.
   *
   * @see faker.string.numeric(): For generating the number with greater control.
   *
   * @example
   * faker.finance.accountNumber() // '92842238'
   * faker.finance.accountNumber({ length: 5 }) // '32564'
   *
   * @since 8.0.0
   */
  accountNumber(options?: {
    /**
     * The length of the account number.
     *
     * @default 8
     */
    length?: number;
  }): string;
  /**
   * Generates a random account number.
   *
   * @param optionsOrLength An options object or the length of the account number.
   * @param optionsOrLength.length The length of the account number. Defaults to `8`.
   *
   * @see faker.string.numeric(): For generating the number with greater control.
   *
   * @example
   * faker.finance.accountNumber() // '92842238'
   * faker.finance.accountNumber(5) // '28736'
   * faker.finance.accountNumber({ length: 5 }) // '32564'
   *
   * @since 8.0.0
   */
  accountNumber(
    optionsOrLength?:
      | number
      | {
          /**
           * The length of the account number.
           *
           * @default 8
           */
          length?: number;
        }
  ): string;
  /**
   * Generates a random account number.
   *
   * @param options An options object or the length of the account number.
   * @param options.length The length of the account number. Defaults to `8`.
   *
   * @see faker.string.numeric(): For generating the number with greater control.
   *
   * @example
   * faker.finance.accountNumber() // '92842238'
   * faker.finance.accountNumber(5) // '28736'
   * faker.finance.accountNumber({ length: 5 }) // '32564'
   *
   * @since 8.0.0
   */
  accountNumber(
    options:
      | number
      | {
          /**
           * The length of the account number.
           *
           * @default 8
           */
          length?: number;
        } = {}
  ): string {
    return financeAccountNumber(this.faker.fakerCore, options);
  }

  /**
   * Generates a random account name.
   *
   * @example
   * faker.finance.accountName() // 'Personal Loan Account'
   *
   * @since 2.0.1
   */
  accountName(): string {
    return financeAccountName(this.faker.fakerCore);
  }

  /**
   * Generates a random [ABA routing number](https://en.wikipedia.org/wiki/ABA_routing_transit_number).
   *
   * @example
   * faker.finance.routingNumber() // '062197511'
   *
   * @since 5.0.0
   */
  routingNumber(): string {
    return financeRoutingNumber(this.faker.fakerCore);
  }

  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param options An options object.
   * @param options.min The lower bound for the amount. Defaults to `0`.
   * @param options.max The upper bound for the amount. Defaults to `1000`.
   * @param options.dec The number of decimal places for the amount. Defaults to `2`.
   * @param options.symbol The symbol used to prefix the amount. Defaults to `''`.
   * @param options.autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   *
   * @see faker.number.float(): For generating the amount with greater control.
   *
   * @example
   * faker.finance.amount() // '617.87'
   * faker.finance.amount({ min: 5, max: 10 }) // '5.53'
   * faker.finance.amount({ min: 5, max: 10, dec: 0 }) // '8'
   * faker.finance.amount({ min: 5, max: 10, dec: 2, symbol: '$' }) // '$5.85'
   * faker.finance.amount({ min: 5, max: 10, dec: 5, symbol: '', autoFormat: true }) // '9,75067'
   *
   * @since 2.0.1
   */
  amount(
    options: {
      /**
       * The lower bound for the amount.
       *
       * @default 0
       */
      min?: number;
      /**
       * The upper bound for the amount.
       *
       * @default 1000
       */
      max?: number;
      /**
       * The number of decimal places for the amount.
       *
       * @default 2
       */
      dec?: number;
      /**
       * The symbol used to prefix the amount.
       *
       * @default ''
       */
      symbol?: string;
      /**
       * If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
       *
       * @default false
       */
      autoFormat?: boolean;
    } = {}
  ): string {
    return financeAmount(this.faker.fakerCore, options);
  }

  /**
   * Returns a random transaction type.
   *
   * @example
   * faker.finance.transactionType() // 'payment'
   *
   * @since 2.0.1
   */
  transactionType(): string {
    return financeTransactionType(this.faker.fakerCore);
  }

  /**
   * Returns a random currency object, containing `code`, `name`, `symbol`, and `numericCode` properties.
   *
   * @see faker.finance.currencyCode(): For generating specifically the currency code.
   * @see faker.finance.currencyName(): For generating specifically the currency name.
   * @see faker.finance.currencySymbol(): For generating specifically the currency symbol.
   * @see faker.finance.currencyNumericCode(): For generating specifically the currency numeric code.
   *
   * @example
   * faker.finance.currency() // { code: 'USD', name: 'US Dollar', symbol: '$', numericCode: '840' }
   *
   * @since 8.0.0
   */
  currency(): Currency {
    return financeCurrency(this.faker.fakerCore);
  }

  /**
   * Returns a random currency code.
   * (The short text/abbreviation for the currency (e.g. `US Dollar` -> `USD`))
   *
   * @example
   * faker.finance.currencyCode() // 'USD'
   *
   * @since 2.0.1
   */
  currencyCode(): string {
    return financeCurrencyCode(this.faker.fakerCore);
  }

  /**
   * Returns a random currency name.
   *
   * @example
   * faker.finance.currencyName() // 'US Dollar'
   *
   * @since 2.0.1
   */
  currencyName(): string {
    return financeCurrencyName(this.faker.fakerCore);
  }

  /**
   * Returns a random currency symbol.
   *
   * @example
   * faker.finance.currencySymbol() // '$'
   *
   * @since 2.0.1
   */
  currencySymbol(): string {
    return financeCurrencySymbol(this.faker.fakerCore);
  }

  /**
   * Returns a random currency numeric code.
   * (The ISO 4217 numerical code for a currency (e.g. `US Dollar` -> `840` ))
   *
   * @example
   * faker.finance.currencyNumericCode() // '840'
   *
   * @since 9.6.0
   */
  currencyNumericCode(): string {
    return financeCurrencyNumericCode(this.faker.fakerCore);
  }

  /**
   * Generates a random Bitcoin address.
   *
   * @param options An optional options object.
   * @param options.type The bitcoin address type (`'legacy'`, `'segwit'`, `'bech32'` or `'taproot'`). Defaults to a random address type.
   * @param options.network The bitcoin network (`'mainnet'` or `'testnet'`). Defaults to `'mainnet'`.
   *
   * @example
   * faker.finance.bitcoinAddress() // '1TeZEFLmGPLEQrSRdAcnZLoWwYeiHwmRog'
   * faker.finance.bitcoinAddress({ type: 'bech32' }) // 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
   * faker.finance.bitcoinAddress({ type: 'bech32', network: 'testnet' }) // 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
   *
   * @since 3.1.0
   */
  bitcoinAddress(
    options: {
      /**
       * The bitcoin address type (`'legacy'`, `'segwit'`, `'bech32'` or `'taproot'`).
       *
       * @default faker.helpers.enumValue(BitcoinAddressFamily)
       */
      type?: BitcoinAddressFamilyType;
      /**
       * The bitcoin network (`'mainnet'` or `'testnet'`).
       *
       * @default 'mainnet'
       */
      network?: BitcoinNetworkType;
    } = {}
  ): string {
    return financeBitcoinAddress(this.faker.fakerCore, options);
  }

  /**
   * Generates a random Litecoin address.
   *
   * @example
   * faker.finance.litecoinAddress() // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
   *
   * @since 5.0.0
   */
  litecoinAddress(): string {
    return financeLitecoinAddress(this.faker.fakerCore);
  }

  /**
   * Generates a random credit card number.
   *
   * @param issuer The name of the issuer (case-insensitive) or the format used to generate one.
   *
   * @example
   * faker.finance.creditCardNumber() // '4427163488662'
   * faker.finance.creditCardNumber('visa') // '4882664999007'
   * faker.finance.creditCardNumber('63[7-9]#-####-####-###L') // '6375-3265-4676-6646'
   *
   * @since 5.0.0
   */
  creditCardNumber(issuer?: string): string;
  /**
   * Generates a random credit card number.
   *
   * @param options An options object.
   * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
   *
   * @example
   * faker.finance.creditCardNumber() // '4427163488662'
   * faker.finance.creditCardNumber({ issuer: 'visa' }) // '4882664999007'
   * faker.finance.creditCardNumber({ issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
   *
   * @since 5.0.0
   */
  creditCardNumber(options?: {
    /**
     * The name of the issuer (case-insensitive) or the format used to generate one.
     *
     * @default ''
     */
    issuer?: string;
  }): string;
  /**
   * Generates a random credit card number.
   *
   * @param options An options object, the issuer or a custom format.
   * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one. Defaults to `''`.
   *
   * @example
   * faker.finance.creditCardNumber() // '4427163488662'
   * faker.finance.creditCardNumber({ issuer: 'visa' }) // '4882664999007'
   * faker.finance.creditCardNumber({ issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
   * faker.finance.creditCardNumber('visa') // '1226423499765'
   *
   * @since 5.0.0
   */
  creditCardNumber(
    options?:
      | string
      | {
          /**
           * The name of the issuer (case-insensitive) or the format used to generate one.
           *
           * @default ''
           */
          issuer?: string;
        }
  ): string;
  /**
   * Generates a random credit card number.
   *
   * @param options An options object, the issuer or a custom format.
   * @param options.issuer The name of the issuer (case-insensitive) or the format used to generate one.
   *
   * @example
   * faker.finance.creditCardNumber() // '4427163488662'
   * faker.finance.creditCardNumber({ issuer: 'visa' }) // '4882664999007'
   * faker.finance.creditCardNumber({ issuer: '63[7-9]#-####-####-###L' }) // '6375-3265-4676-6646'
   * faker.finance.creditCardNumber('visa') // '1226423499765'
   *
   * @since 5.0.0
   */
  creditCardNumber(
    options:
      | string
      | {
          /**
           * The name of the issuer (case-insensitive) or the format used to generate one.
           *
           * @default ''
           */
          issuer?: string;
        } = {}
  ): string {
    return financeCreditCardNumber(this.faker.fakerCore, options);
  }

  /**
   * Generates a random credit card CVV.
   *
   * @example
   * faker.finance.creditCardCVV() // '506'
   *
   * @since 5.0.0
   */
  creditCardCVV(): string {
    return financeCreditCardCVV(this.faker.fakerCore);
  }

  /**
   * Returns a random credit card issuer.
   *
   * @example
   * faker.finance.creditCardIssuer() // 'discover'
   *
   * @since 6.3.0
   */
  creditCardIssuer(): string {
    return financeCreditCardIssuer(this.faker.fakerCore);
  }

  /**
   * Generates a random PIN number.
   *
   * @param length The length of the PIN to generate. Defaults to `4`.
   *
   * @throws {FakerError} Will throw an error if length is less than 1.
   *
   * @see faker.string.numeric(): For generating the pin with greater control.
   *
   * @example
   * faker.finance.pin() // '5067'
   * faker.finance.pin(6) // '213789'
   *
   * @since 6.2.0
   */
  pin(length?: number): string;
  /**
   * Generates a random PIN number.
   *
   * @param options An options object.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   *
   * @throws {FakerError} Will throw an error if length is less than 1.
   *
   * @see faker.string.numeric(): For generating the pin with greater control.
   *
   * @example
   * faker.finance.pin() // '5067'
   * faker.finance.pin({ length: 6 }) // '213789'
   *
   * @since 6.2.0
   */
  pin(options?: {
    /**
     * The length of the PIN to generate.
     *
     * @default 4
     */
    length?: number;
  }): string;
  /**
   * Generates a random PIN number.
   *
   * @param options An options object or the length of the PIN.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   *
   * @throws {FakerError} Will throw an error if length is less than 1.
   *
   * @see faker.string.numeric(): For generating the pin with greater control.
   *
   * @example
   * faker.finance.pin() // '5067'
   * faker.finance.pin({ length: 6 }) // '213789'
   * faker.finance.pin(6) // '213789'
   *
   * @since 6.2.0
   */
  pin(
    options?:
      | number
      | {
          /**
           * The length of the PIN to generate.
           *
           * @default 4
           */
          length?: number;
        }
  ): string;
  /**
   * Generates a random PIN number.
   *
   * @param options An options object or the length of the PIN.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   *
   * @throws {FakerError} Will throw an error if length is less than 1.
   *
   * @see faker.string.numeric(): For generating the pin with greater control.
   *
   * @example
   * faker.finance.pin() // '5067'
   * faker.finance.pin({ length: 6 }) // '213789'
   * faker.finance.pin(6) // '213789'
   *
   * @since 6.2.0
   */
  pin(
    options:
      | number
      | {
          /**
           * The length of the PIN to generate.
           *
           * @default 4
           */
          length?: number;
        } = {}
  ): string {
    return financePin(this.faker.fakerCore, options);
  }

  /**
   * Creates a random, non-checksum Ethereum address.
   *
   * To generate a checksummed Ethereum address (with specific per character casing), wrap this method in a custom method and use third-party libraries to transform the result.
   *
   * @example
   * faker.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   *
   * @since 5.0.0
   */
  ethereumAddress(): string {
    return financeEthereumAddress(this.faker.fakerCore);
  }

  /**
   * Generates a random IBAN.
   *
   * Please note that the generated IBAN might be invalid due to randomly generated bank codes/other country specific validation rules.
   *
   * @param options An options object.
   * @param options.formatted Return a formatted version of the generated IBAN. Defaults to `false`.
   * @param options.countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   *
   * @throws {FakerError} Will throw an error if the passed country code is not supported.
   *
   * @example
   * faker.finance.iban() // 'TR736918640040966092800056'
   * faker.finance.iban({ formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban({ formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
   *
   * @since 4.0.0
   */
  iban(
    options: {
      /**
       * Return a formatted version of the generated IBAN.
       *
       * @default false
       */
      formatted?: boolean;
      /**
       * The country code from which you want to generate an IBAN,
       * if none is provided a random country will be used.
       */
      countryCode?: string;
    } = {}
  ): string {
    return financeIban(this.faker.fakerCore, options);
  }

  /**
   * Generates a random SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
   *
   * @param options Options object.
   * @param options.includeBranchCode Whether to include a three-digit branch code at the end of the generated code. Defaults to a random boolean value.
   *
   * @example
   * faker.finance.bic() // 'WYAUPGX1'
   * faker.finance.bic({ includeBranchCode: true }) // 'KCAUPGR1432'
   * faker.finance.bic({ includeBranchCode: false }) // 'XDAFQGT7'
   *
   * @since 4.0.0
   */
  bic(
    options: {
      /**
       * Whether to include a three-digit branch code at the end of the generated code.
       *
       * @default faker.datatype.boolean()
       */
      includeBranchCode?: boolean;
    } = {}
  ): string {
    return financeBic(this.faker.fakerCore, options);
  }

  /**
   * Generates a random transaction description.
   *
   * @example
   * faker.finance.transactionDescription()
   * // 'payment transaction at Emard LLC using card ending with ****9187 for HNL 506.57 in account ***2584.'
   *
   * @since 5.1.0
   */
  transactionDescription(): string {
    return financeTransactionDescription(this.faker.fakerCore);
  }
}
