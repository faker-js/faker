import type { Faker } from '.';
import type { Helpers } from './helpers';
import ibanLib from './iban';

/**
 * Module to generate finance related entries.
 */
export class Finance {
  readonly ibanLib = ibanLib;
  readonly Helpers: Helpers;

  constructor(private readonly faker: Faker) {
    this.Helpers = this.faker.helpers;

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Finance.prototype)) {
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
   */
  account(length?: number): string {
    length = length || 8;
    let template = '';

    for (let i = 0; i < length; i++) {
      template += '#';
    }
    length = null;
    return this.Helpers.replaceSymbolWithNumber(template);
  }

  /**
   * Generates a random account name.
   *
   * @example
   * faker.finance.accountName() // 'Personal Loan Account'
   */
  accountName(): string {
    return [
      this.Helpers.randomize(this.faker.definitions.finance.account_type),
      'Account',
    ].join(' ');
  }

  /**
   * Generates a random routing number.
   *
   * @example
   * faker.finance.routingNumber() // '522814402'
   */
  routingNumber(): string {
    const routingNumber = this.Helpers.replaceSymbolWithNumber('########');

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
   */
  mask(length?: number, parens?: boolean, ellipsis?: boolean): string {
    // set defaults
    length =
      length === 0 || !length || typeof length === 'undefined' ? 4 : length;
    parens = parens == null ? true : parens;
    ellipsis = ellipsis == null ? true : ellipsis;

    // create a template for length
    let template = '';

    for (let i = 0; i < length; i++) {
      template = template + '#';
    }

    //prefix with ellipsis
    template = ellipsis ? ['...', template].join('') : template;

    template = parens ? ['(', template, ')'].join('') : template;

    //generate random numbers
    template = this.Helpers.replaceSymbolWithNumber(template);

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
   */
  amount(
    min: number = 0,
    max: number = 1000,
    dec: number = 2,
    symbol: string = '',
    autoFormat?: boolean
  ): string {
    const randValue = this.faker.datatype.number({
      max,
      min,
      precision: Math.pow(10, -dec),
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
   */
  transactionType(): string {
    return this.Helpers.randomize(
      this.faker.definitions.finance.transaction_type
    );
  }

  /**
   * Returns a random currency code.
   * (The short text/abbreviation for the currency (e.g. `US Dollar` -> `USD`))
   *
   * @example
   * faker.finance.currencyCode() // 'USD'
   */
  currencyCode(): string {
    return this.faker.random.objectElement(
      this.faker.definitions.finance.currency
    )['code'];
  }

  /**
   * Returns a random currency name.
   *
   * @example
   * faker.finance.currencyName() // 'US Dollar'
   */
  currencyName(): string {
    return this.faker.random.objectElement(
      this.faker.definitions.finance.currency,
      'key'
    );
  }

  /**
   * Returns a random currency symbol.
   *
   * @example
   * faker.finance.currencySymbol() // '$'
   */
  currencySymbol(): string {
    let symbol: string;
    while (!symbol) {
      symbol = this.faker.random.objectElement(
        this.faker.definitions.finance.currency
      )['symbol'];
    }
    return symbol;
  }

  /**
   * Generates a random bitcoin address.
   *
   * @example
   * faker.finance.bitcoinAddress() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   */
  bitcoinAddress(): string {
    const addressLength = this.faker.datatype.number({ min: 25, max: 34 });

    let address = this.faker.random.arrayElement(['1', '3']);

    for (let i = 0; i < addressLength - 1; i++)
      address += this.faker.random.arrayElement(
        '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('')
      );

    return address;
  }

  /**
   * Generates a random litecoin address.
   *
   * @example
   * faker.finance.litecoinAddress() // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
   */
  litecoinAddress(): string {
    const addressLength = this.faker.datatype.number({ min: 26, max: 33 });

    let address = this.faker.random.arrayElement(['L', 'M', '3']);

    for (let i = 0; i < addressLength - 1; i++)
      address += this.faker.random.arrayElement(
        '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split('')
      );

    return address;
  }

  /**
   * Generates a random credit card number.
   *
   * @param provider The name of the provider (case insensitive) or the format used to generate one.
   *
   * @example
   * faker.finance.creditCardNumber() // '4427163488668'
   * faker.finance.creditCardNumber('visa') // '4882664999003'
   * faker.finance.creditCardNumber('63[7-9]#-####-####-###L') // '6375-3265-4676-6644'
   */
  creditCardNumber(provider = ''): string {
    let format: string;
    const localeFormat = this.faker.definitions.finance.credit_card;
    const normalizedProvider = provider.toLowerCase();
    if (normalizedProvider in localeFormat) {
      format = this.faker.random.arrayElement(localeFormat[normalizedProvider]);
    } else if (provider.match(/#/)) {
      // The user chose an optional scheme
      format = provider;
    } else {
      // Choose a random provider
      // Credit cards are in an object structure
      const formats = this.faker.random.objectElement(localeFormat, 'value'); // There could be multiple formats
      format = this.faker.random.arrayElement(formats);
    }
    format = format.replace(/\//g, '');
    return this.Helpers.replaceCreditCardSymbols(format);
  }

  /**
   * Generates a random credit card CVV.
   *
   * @example
   * faker.finance.creditCardCVV() // '506'
   */
  creditCardCVV(): string {
    let cvv = '';
    for (let i = 0; i < 3; i++) {
      cvv += this.faker.datatype.number({ max: 9 }).toString();
    }
    return cvv;
  }

  /**
   * Generates a random ethereum Address.
   *
   * @example
   * faker.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   */
  ethereumAddress(): string {
    const address = this.faker.datatype.hexaDecimal(40).toLowerCase();
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
   */
  iban(formatted: boolean = false, countryCode?: string): string {
    let ibanFormat: {
      bban: Array<{ type: string; count: number }>;
      country: string;
      total?: number;
      format?: string;
    };
    if (countryCode) {
      const findFormat = (currentFormat) =>
        currentFormat.country === countryCode;
      ibanFormat = this.ibanLib.formats.find(findFormat);
    } else {
      ibanFormat = this.faker.random.arrayElement(this.ibanLib.formats);
    }

    if (!ibanFormat) {
      throw new Error('Country code ' + countryCode + ' not supported.');
    }

    let s = '';
    let count = 0;
    for (const bban of ibanFormat.bban) {
      let c = bban.count;
      count += bban.count;
      while (c > 0) {
        if (bban.type === 'a') {
          s += this.faker.random.arrayElement(this.ibanLib.alpha);
        } else if (bban.type === 'c') {
          if (this.faker.datatype.number(100) < 80) {
            s += this.faker.datatype.number(9);
          } else {
            s += this.faker.random.arrayElement(this.ibanLib.alpha);
          }
        } else {
          if (c >= 3 && this.faker.datatype.number(100) < 30) {
            if (this.faker.datatype.boolean()) {
              s += this.faker.random.arrayElement(this.ibanLib.pattern100);
              c -= 2;
            } else {
              s += this.faker.random.arrayElement(this.ibanLib.pattern10);
              c--;
            }
          } else {
            s += this.faker.datatype.number(9);
          }
        }
        c--;
      }
      s = s.substring(0, count);
    }
    let checksum: string | number =
      98 -
      this.ibanLib.mod97(
        this.ibanLib.toDigitString(`${s}${ibanFormat.country}00`)
      );
    if (checksum < 10) {
      checksum = `0${checksum}`;
    }
    const iban = `${ibanFormat.country}${checksum}${s}`;
    return formatted ? iban.match(/.{1,4}/g).join(' ') : iban;
  }

  /**
   * Generates a random bic.
   *
   * @example
   * faker.finance.bic() // 'WYAUPGX1432'
   */
  bic(): string {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const prob = this.faker.datatype.number(100);
    return (
      this.Helpers.replaceSymbols('???') +
      this.faker.random.arrayElement(vowels) +
      this.faker.random.arrayElement(this.ibanLib.iso3166) +
      this.Helpers.replaceSymbols('?') +
      '1' +
      (prob < 10
        ? this.Helpers.replaceSymbols(
            '?' + this.faker.random.arrayElement(vowels) + '?'
          )
        : prob < 40
        ? this.Helpers.replaceSymbols('###')
        : '')
    );
  }

  /**
   * Generates a random transaction description.
   *
   * @example
   * faker.finance.transactionDescription()
   * // 'invoice transaction at Kilback - Durgan using card ending with ***(...4316) for UAH 783.82 in account ***16168663'
   */
  transactionDescription(): string {
    const transaction = this.Helpers.createTransaction();
    const account = transaction.account;
    const amount = transaction.amount;
    const transactionType = transaction.type;
    const company = transaction.business;
    const card = this.faker.finance.mask();
    const currency = this.faker.finance.currencyCode();
    return (
      transactionType +
      ' transaction at ' +
      company +
      ' using card ending with ***' +
      card +
      ' for ' +
      currency +
      ' ' +
      amount +
      ' in account ***' +
      account
    );
  }
}
