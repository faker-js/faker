import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import iban from './iban';

/**
 * The possible definitions related to currency entries.
 */
export interface Currency {
  /**
   * The full name for the currency (e.g. `US Dollar`).
   */
  name: string;

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
 * Module to generate finance related entries.
 */
export class FinanceModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      FinanceModule.prototype
    ) as Array<keyof FinanceModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random account number.
   *
   * @param length The length of the account number. Defaults to `8`.
   *
   * @example
   * faker.finance.account() // 92842238
   * faker.finance.account(5) // 32564
   *
   * @since 2.0.1
   */
  account(length?: number): string;
  /**
   * Generates a random account number.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.length The length of the account number. Defaults to `8`.
   *
   * @example
   * faker.finance.account() // 92842238
   * faker.finance.account({ length: 5 }) // 32564
   *
   * @since 2.0.1
   */
  account(options?: {
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
   * @param optionsOrLength An options object or the length of the account number. Defaults to `{}`.
   * @param optionsOrLength.length The length of the account number. Defaults to `8`.
   *
   * @example
   * faker.finance.account() // 92842238
   * faker.finance.account(5) // 28736
   * faker.finance.account({ length: 5 }) // 32564
   *
   * @since 2.0.1
   */
  account(
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
   * @param options An options object or the length of the account number. Defaults to `{}`.
   * @param options.length The length of the account number. Defaults to `8`.
   *
   * @example
   * faker.finance.account() // 92842238
   * faker.finance.account(5) // 28736
   * faker.finance.account({ length: 5 }) // 32564
   *
   * @since 2.0.1
   */
  account(
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
    if (typeof options === 'number') {
      options = { length: options };
    }

    let { length = 8 } = options;
    if (length === 0) {
      length = 8;
    }

    let template = '';

    for (let i = 0; i < length; i++) {
      template += '#';
    }

    length = null;
    return this.faker.helpers.replaceSymbolWithNumber(template);
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
    return [
      this.faker.helpers.arrayElement(
        this.faker.definitions.finance.account_type
      ),
      'Account',
    ].join(' ');
  }

  /**
   * Generates a random routing number.
   *
   * @example
   * faker.finance.routingNumber() // '522814402'
   *
   * @since 5.0.0
   */
  routingNumber(): string {
    const routingNumber =
      this.faker.helpers.replaceSymbolWithNumber('########');

    // Modules 10 straight summation.
    let sum = 0;

    for (let i = 0; i < routingNumber.length; i += 3) {
      sum += Number(routingNumber[i]) * 3;
      sum += Number(routingNumber[i + 1]) * 7;
      sum += Number(routingNumber[i + 2]) || 0;
    }

    return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
  }

  /**
   * Generates a random masked number.
   *
   * @param length The length of the unmasked number. Defaults to `4`.
   * @param parens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param ellipsis Whether to prefix the numbers with an ellipsis. Defaults to `true`.
   *
   * @example
   * faker.finance.mask() // '(...9711)'
   * faker.finance.mask(3) // '(...342)'
   * faker.finance.mask(3, false) // '...236'
   * faker.finance.mask(3, false, false) // '298'
   *
   * @since 2.0.1
   */
  mask(length?: number, parens?: boolean, ellipsis?: boolean): string;
  /**
   * Generates a random masked number.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.length The length of the unmasked number. Defaults to `4`.
   * @param options.parens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param options.ellipsis Whether to prefix the numbers with an ellipsis. Defaults to `true`.
   *
   * @example
   * faker.finance.mask() // '(...9711)'
   * faker.finance.mask({ length: 3 }) // '(...342)'
   * faker.finance.mask({ length: 3, parens: false }) // '...236'
   * faker.finance.mask({ length: 3, parens: false, ellipsis: false }) // '298'
   *
   * @since 2.0.1
   */
  mask(options?: {
    length?: number;
    parens?: boolean;
    ellipsis?: boolean;
  }): string;
  /**
   * Generates a random masked number.
   *
   * @param optionsOrLength An options object or the length of the unmask number. Defaults to `{}`.
   * @param optionsOrLength.length The length of the unmasked number. Defaults to `4`.
   * @param optionsOrLength.parens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param optionsOrLength.ellipsis Whether to prefix the numbers with an ellipsis. Defaults to `true`.
   * @param legacyParens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param legacyEllipsis Whether to prefix the numbers with an ellipsis. Defaults to `true`.
   *
   * @example
   * faker.finance.mask() // '(...9711)'
   * faker.finance.mask({ length: 3 }) // '(...342)'
   * faker.finance.mask({ length: 3, parens: false }) // '...236'
   * faker.finance.mask({ length: 3, parens: false, ellipsis: false }) // '298'
   * faker.finance.mask(3) // '(...342)'
   * faker.finance.mask(3, false) // '...236'
   * faker.finance.mask(3, false, false) // '298'
   *
   * @since 2.0.1
   */
  mask(
    optionsOrLength?:
      | number
      | {
          /**
           * The length of the unmasked number.
           *
           * @default 4
           */
          length?: number;
          /**
           * Whether to use surrounding parenthesis.
           *
           * @default true
           */
          parens?: boolean;
          /**
           * Whether to prefix the numbers with an ellipsis.
           *
           * @default true
           */
          ellipsis?: boolean;
        },
    legacyParens?: boolean,
    legacyEllipsis?: boolean
  ): string;
  /**
   * Generates a random masked number.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.length The length of the unmasked number. Defaults to `4`.
   * @param options.parens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param options.ellipsis Whether to prefix the numbers with an ellipsis. Defaults to `true`.
   * @param legacyParens Whether to use surrounding parenthesis. Defaults to `true`.
   * @param legacyEllipsis Whether to use surrounding parenthesis. Defaults to `true`.
   *
   * @example
   * faker.finance.mask() // '(...9711)'
   * faker.finance.mask(3) // '(...342)'
   * faker.finance.mask(3, false) // '...236'
   * faker.finance.mask(3, false, false) // '298'
   *
   * @since 2.0.1
   */
  mask(
    options:
      | number
      | {
          /**
           * The length of the unmasked number.
           *
           * @default 4
           */
          length?: number;
          /**
           * Whether to use surrounding parenthesis.
           *
           * @default true
           */
          parens?: boolean;
          /**
           * Whether to prefix the numbers with an ellipsis.
           *
           * @default true
           */
          ellipsis?: boolean;
        } = {},
    legacyParens: boolean = true,
    legacyEllipsis: boolean = true
  ): string {
    if (typeof options === 'number') {
      options = { length: options };
    }

    // set defaults
    const {
      ellipsis = legacyEllipsis,
      length = 4,
      parens = legacyParens,
    } = options;

    // create a template for length
    let template = '';

    for (let i = 0; i < length; i++) {
      template = `${template}#`;
    }

    //prefix with ellipsis
    template = ellipsis ? ['...', template].join('') : template;

    template = parens ? ['(', template, ')'].join('') : template;

    //generate random numbers
    template = this.faker.helpers.replaceSymbolWithNumber(template);

    return template;
  }

  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param min The lower bound for the amount. Defaults to `0`.
   * @param max The upper bound for the amount. Defaults to `1000`.
   * @param dec The number of decimal places for the amount. Defaults to `2`.
   * @param symbol The symbol used to prefix the amount. Defaults to `''`.
   * @param autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   *
   * @example
   * faker.finance.amount() // '617.87'
   * faker.finance.amount(5, 10) // '5.53'
   * faker.finance.amount(5, 10, 0) // '8'
   * faker.finance.amount(5, 10, 2, '$') // '$5.85'
   * faker.finance.amount(5, 10, 5, '', true) // '9,75067'
   *
   * @since 2.0.1
   */
  amount(
    min?: number,
    max?: number,
    dec?: number,
    symbol?: string,
    autoFormat?: boolean
  ): string;
  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.min The lower bound for the amount. Defaults to `0`.
   * @param options.max The upper bound for the amount. Defaults to `1000`.
   * @param options.dec The number of decimal places for the amount. Defaults to `2`.
   * @param options.symbol The symbol used to prefix the amount. Defaults to `''`.
   * @param options.autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
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
  amount(options?: {
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
  }): string;
  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.min The lower bound for the amount. Defaults to `0`.
   * @param options.max The upper bound for the amount. Defaults to `1000`.
   * @param options.dec The number of decimal places for the amount. Defaults to `2`.
   * @param options.symbol The symbol used to prefix the amount. Defaults to `''`.
   * @param options.autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   * @param legacyMax The upper bound for the amount. Defaults to `1000`.
   * @param legacyDec The number of decimal places for the amount. Defaults to `2`.
   * @param legacySymbol The symbol used to prefix the amount. Defaults to `''`.
   * @param legacyAutoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   *
   * @example
   * faker.finance.amount() // '617.87'
   * faker.finance.amount({ min: 5, max: 10 }) // '5.53'
   * faker.finance.amount({ min: 5, max: 10, dec: 0 }) // '8'
   * faker.finance.amount({ min: 5, max: 10, dec: 2, symbol: '$' }) // '$5.85'
   * faker.finance.amount({ min: 5, max: 10, dec: 5, symbol: '', autoFormat: true }) // '9,75067'
   * faker.finance.amount(5, 10) // '5.53'
   * faker.finance.amount(5, 10, 0) // '8'
   * faker.finance.amount(5, 10, 2, '$') // '$5.85'
   * faker.finance.amount(5, 10, 5, '', true) // '9,75067'
   *
   * @since 2.0.1
   */
  amount(
    options?:
      | number
      | {
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
        },
    legacyMax?: number,
    legacyDec?: number,
    legacySymbol?: string,
    legacyAutoFormat?: boolean
  ): string;
  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.min The lower bound for the amount. Defaults to `0`.
   * @param options.max The upper bound for the amount. Defaults to `1000`.
   * @param options.dec The number of decimal places for the amount. Defaults to `2`.
   * @param options.symbol The symbol used to prefix the amount. Defaults to `''`.
   * @param options.autoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   * @param legacyMax The upper bound for the amount. Defaults to `1000`.
   * @param legacyDec The number of decimal places for the amount. Defaults to `2`.
   * @param legacySymbol The symbol used to prefix the amount. Defaults to `''`.
   * @param legacyAutoFormat If true this method will use `Number.toLocaleString()`. Otherwise it will use `Number.toFixed()`.
   *
   * @example
   * faker.finance.amount() // '617.87'
   * faker.finance.amount({ min: 5, max: 10 }) // '5.53'
   * faker.finance.amount({ min: 5, max: 10, dec: 0 }) // '8'
   * faker.finance.amount({ min: 5, max: 10, dec: 2, symbol: '$' }) // '$5.85'
   * faker.finance.amount({ min: 5, max: 10, dec: 5, symbol: '', autoFormat: true }) // '9,75067'
   * faker.finance.amount(5, 10) // '5.53'
   * faker.finance.amount(5, 10, 0) // '8'
   * faker.finance.amount(5, 10, 2, '$') // '$5.85'
   * faker.finance.amount(5, 10, 5, '', true) // '9,75067'
   *
   * @since 2.0.1
   */
  amount(
    options:
      | number
      | {
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
        } = {},
    legacyMax: number = 1000,
    legacyDec: number = 2,
    legacySymbol: string = '',
    legacyAutoFormat: boolean = false
  ): string {
    if (typeof options === 'number') {
      options = { min: options };
    }

    const {
      autoFormat = legacyAutoFormat,
      dec = legacyDec,
      max = legacyMax,
      min = 0,
      symbol = legacySymbol,
    } = options;

    const randValue = this.faker.number.float({
      max,
      min,
      precision: 10 ** -dec,
    });

    let formattedString: string;
    if (autoFormat) {
      formattedString = randValue.toLocaleString(undefined, {
        minimumFractionDigits: dec,
      });
    } else {
      formattedString = randValue.toFixed(dec);
    }

    return symbol + formattedString;
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
    return this.faker.helpers.arrayElement(
      this.faker.definitions.finance.transaction_type
    );
  }

  /**
   * Returns a random currency object, containing `code`, `name `and `symbol` properties.
   *
   * @see
   * faker.finance.currencyCode()
   * faker.finance.currencyName()
   * faker.finance.currencySymbol()
   *
   * @example
   * faker.finance.currency() // { code: 'USD', name: 'US Dollar', symbol: '$' }
   *
   * @since 8.0.0
   */
  currency(): Currency {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.finance.currency
    );
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
    return this.currency().code;
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
    return this.currency().name;
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
    let symbol: string;
    while (!symbol) {
      symbol = this.currency().symbol;
    }

    return symbol;
  }

  /**
   * Generates a random Bitcoin address.
   *
   * @example
   * faker.finance.bitcoinAddress() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   *
   * @since 3.1.0
   */
  bitcoinAddress(): string {
    const addressLength = this.faker.number.int({ min: 25, max: 39 });

    let address = this.faker.helpers.arrayElement(['1', '3']);

    address += this.faker.string.alphanumeric({
      length: addressLength,
      casing: 'mixed',
      exclude: '0OIl',
    });

    return address;
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
    const addressLength = this.faker.number.int({ min: 26, max: 33 });

    let address = this.faker.helpers.arrayElement(['L', 'M', '3']);

    for (let i = 0; i < addressLength - 1; i++)
      address += this.faker.helpers.arrayElement(
        '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('')
      );

    return address;
  }

  /**
   * Generates a random credit card number.
   *
   * @param issuer The name of the issuer (case insensitive) or the format used to generate one.
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
   * @param options An options object. Defaults to `''`.
   * @param options.issuer The name of the issuer (case insensitive) or the format used to generate one.
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
     * The name of the issuer (case insensitive) or the format used to generate one.
     *
     * @default ''
     */
    issuer?: string;
  }): string;
  /**
   * Generates a random credit card number.
   *
   * @param options An options object, the issuer or a custom format. Defaults to `{}`.
   * @param options.issuer The name of the issuer (case insensitive) or the format used to generate one.
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
           * The name of the issuer (case insensitive) or the format used to generate one.
           *
           * @default ''
           */
          issuer?: string;
        }
  ): string;
  /**
   * Generates a random credit card number.
   *
   * @param options An options object, the issuer or a custom format. Defaults to `{}`.
   * @param options.issuer The name of the issuer (case insensitive) or the format used to generate one.
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
           * The name of the issuer (case insensitive) or the format used to generate one.
           *
           * @default ''
           */
          issuer?: string;
        } = {}
  ): string {
    if (typeof options === 'string') {
      options = { issuer: options };
    }

    const { issuer = '' } = options;

    let format: string;
    const localeFormat = this.faker.definitions.finance.credit_card;
    const normalizedIssuer = issuer.toLowerCase();
    if (normalizedIssuer in localeFormat) {
      format = this.faker.helpers.arrayElement(localeFormat[normalizedIssuer]);
    } else if (issuer.match(/#/)) {
      // The user chose an optional scheme
      format = issuer;
    } else {
      // Choose a random issuer
      // Credit cards are in an object structure
      const formats = this.faker.helpers.objectValue(localeFormat); // There could be multiple formats
      format = this.faker.helpers.arrayElement(formats);
    }

    format = format.replace(/\//g, '');
    return this.faker.helpers.replaceCreditCardSymbols(format);
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
    return this.faker.string.numeric({ length: 3, allowLeadingZeros: true });
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
    return this.faker.helpers.objectKey(
      this.faker.definitions.finance.credit_card
    ) as string;
  }

  /**
   * Generates a random PIN number.
   *
   * @param length The length of the PIN to generate. Defaults to `4`.
   * @throws Will throw an error if length is less than 1.
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
   * @param options An options object. Defaults to `{}`.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   * @throws Will throw an error if length is less than 1.
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
   * @param options An options object or the length of the PIN. Defaults to `{}`.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   * @throws Will throw an error if length is less than 1.
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
   * @param options An options object or the length of the PIN. Defaults to `{}`.
   * @param options.length The length of the PIN to generate. Defaults to `4`.
   * @throws Will throw an error if length is less than 1.
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
    if (typeof options === 'number') {
      options = { length: options };
    }

    const { length = 4 } = options;

    if (length < 1) {
      throw new FakerError('minimum length is 1');
    }

    return this.faker.string.numeric({ length, allowLeadingZeros: true });
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
    const address = this.faker.string.hexadecimal({
      length: 40,
      casing: 'lower',
    });
    return address;
  }

  /**
   * Generates a random iban.
   *
   * @param formatted Return a formatted version of the generated IBAN. Defaults to `false`.
   * @param countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @example
   * faker.finance.iban() // 'TR736918640040966092800056'
   * faker.finance.iban(true) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban(true, 'DE') // 'DE84 1022 7075 0900 1170 01'
   *
   * @since 4.0.0
   */
  iban(formatted?: boolean, countryCode?: string): string;
  /**
   * Generates a random iban.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.formatted Return a formatted version of the generated IBAN. Defaults to `false`.
   * @param options.countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @example
   * faker.finance.iban() // 'TR736918640040966092800056'
   * faker.finance.iban({ formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban({ formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
   *
   * @since 4.0.0
   */
  iban(options?: {
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
  }): string;
  /**
   * Generates a random iban.
   *
   * @param options An options object or whether the return value should be formatted. Defaults to `{}`.
   * @param options.formatted Return a formatted version of the generated IBAN. Defaults to `false`.
   * @param options.countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @param legacyCountryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   *
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @example
   * faker.finance.iban() // 'TR736918640040966092800056'
   * faker.finance.iban({ formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban({ formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
   * faker.finance.iban(true) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban(true, 'DE') // 'DE84 1022 7075 0900 1170 01'
   *
   * @since 4.0.0
   */
  iban(
    options?:
      | boolean
      | {
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
        },
    legacyCountryCode?: string
  ): string;
  /**
   * Generates a random iban.
   *
   * @param options An options object or whether the return value should be formatted. Defaults to `{}`.
   * @param options.formatted Return a formatted version of the generated IBAN. Defaults to `false`.
   * @param options.countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @param legacyCountryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   *
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @example
   * faker.finance.iban() // 'TR736918640040966092800056'
   * faker.finance.iban({ formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban({ formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
   * faker.finance.iban(true) // 'FR20 8008 2330 8984 74S3 Z620 224'
   * faker.finance.iban(true, 'DE') // 'DE84 1022 7075 0900 1170 01'
   *
   * @since 4.0.0
   */
  iban(
    options:
      | boolean
      | {
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
        } = {},
    legacyCountryCode?: string
  ): string {
    if (typeof options === 'boolean') {
      options = { formatted: options };
    }

    const { countryCode = legacyCountryCode, formatted = false } = options;

    const ibanFormat = countryCode
      ? iban.formats.find((f) => f.country === countryCode)
      : this.faker.helpers.arrayElement(iban.formats);

    if (!ibanFormat) {
      throw new FakerError(`Country code ${countryCode} not supported.`);
    }

    let s = '';
    let count = 0;
    for (const bban of ibanFormat.bban) {
      let c = bban.count;
      count += bban.count;
      while (c > 0) {
        if (bban.type === 'a') {
          s += this.faker.helpers.arrayElement(iban.alpha);
        } else if (bban.type === 'c') {
          if (this.faker.datatype.boolean(0.8)) {
            s += this.faker.number.int(9);
          } else {
            s += this.faker.helpers.arrayElement(iban.alpha);
          }
        } else {
          if (c >= 3 && this.faker.datatype.boolean(0.3)) {
            if (this.faker.datatype.boolean()) {
              s += this.faker.helpers.arrayElement(iban.pattern100);
              c -= 2;
            } else {
              s += this.faker.helpers.arrayElement(iban.pattern10);
              c--;
            }
          } else {
            s += this.faker.number.int(9);
          }
        }

        c--;
      }

      s = s.substring(0, count);
    }

    let checksum: string | number =
      98 - iban.mod97(iban.toDigitString(`${s}${ibanFormat.country}00`));

    if (checksum < 10) {
      checksum = `0${checksum}`;
    }

    const result = `${ibanFormat.country}${checksum}${s}`;

    return formatted ? result.match(/.{1,4}/g).join(' ') : result;
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
    const { includeBranchCode = this.faker.datatype.boolean() } = options;

    const bankIdentifier = this.faker.string.alpha({
      length: 4,
      casing: 'upper',
    });
    const countryCode = this.faker.helpers.arrayElement(iban.iso3166);
    const locationCode = this.faker.string.alphanumeric({
      length: 2,
      casing: 'upper',
    });
    const branchCode = includeBranchCode
      ? this.faker.datatype.boolean()
        ? this.faker.string.alphanumeric({ length: 3, casing: 'upper' })
        : 'XXX'
      : '';

    return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
  }

  /**
   * Generates a random transaction description.
   *
   * @example
   * faker.finance.transactionDescription()
   * // 'invoice transaction at Kilback - Durgan using card ending with ***(...4316) for UAH 783.82 in account ***16168663'
   *
   * @since 5.1.0
   */
  transactionDescription(): string {
    const amount = this.amount();
    const company = this.faker.company.name();
    const transactionType = this.transactionType();
    const account = this.account();
    const card = this.mask();
    const currency = this.currencyCode();

    return `${transactionType} transaction at ${company} using card ending with ***${card} for ${currency} ${amount} in account ***${account}`;
  }
}
