import type { Faker } from '.';
import ibanLib from './iban';

export class Finance {
  readonly ibanLib = ibanLib;
  readonly Helpers;

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
   * account
   *
   * @method faker.finance.account
   * @param length
   */
  account(length: number = 8) {
    let template = '';

    for (let i = 0; i < length; i++) {
      template += '#';
    }
    length = null;
    return this.Helpers.replaceSymbolWithNumber(template);
  }

  /**
   * accountName
   *
   * @method faker.finance.accountName
   */
  accountName(): string {
    return [
      this.Helpers.randomize(this.faker.definitions.finance.account_type),
      'Account',
    ].join(' ');
  }

  /**
   * routingNumber
   *
   * @method faker.finance.routingNumber
   */
  routingNumber() {
    const routingNumber = this.Helpers.replaceSymbolWithNumber('########');

    // Modules 10 straight summation.
    let sum = 0;

    for (let i = 0; i < routingNumber.length; i += 3) {
      sum += Number(routingNumber[i]) * 3;
      sum += Number(routingNumber[i + 1]) * 7;
      sum += Number(routingNumber[i + 2]) || 0;
    }

    return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  /**
   * mask
   *
   * @method faker.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
  mask(length?: number, parens?: boolean, ellipsis?: boolean): string {
    // set defaults
    length =
      length == 0 || !length || typeof length == 'undefined' ? 4 : length;
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

  // min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
  // NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

  /**
   * amount
   *
   * @method faker.finance.amount
   * @param min
   * @param max
   * @param dec
   * @param symbol
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
   * transactionType
   *
   * @method faker.finance.transactionType
   */
  transactionType() {
    return this.Helpers.randomize(
      this.faker.definitions.finance.transaction_type
    );
  }

  /**
   * currencyCode
   *
   * @method faker.finance.currencyCode
   */
  currencyCode() {
    return this.faker.random.objectElement(
      this.faker.definitions.finance.currency
    )['code'];
  }

  /**
   * currencyName
   *
   * @method faker.finance.currencyName
   */
  currencyName() {
    return this.faker.random.objectElement(
      this.faker.definitions.finance.currency,
      'key'
    );
  }

  /**
   * currencySymbol
   *
   * @method faker.finance.currencySymbol
   */
  currencySymbol() {
    let symbol;

    while (!symbol) {
      symbol = this.faker.random.objectElement(
        this.faker.definitions.finance.currency
      )['symbol'];
    }
    return symbol;
  }

  /**
   * bitcoinAddress
   *
   * @method  faker.finance.bitcoinAddress
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
   * litecoinAddress
   *
   * @method faker.finance.litecoinAddress
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
   * Credit card number
   *
   * @method faker.finance.creditCardNumber
   * @param provider scheme
   */
  creditCardNumber(provider = '') {
    let format: string;
    let formats: string | string[];
    const localeFormat = this.faker.definitions.finance.credit_card;
    if (provider in localeFormat) {
      formats = localeFormat[provider]; // there could be multiple formats
      if (typeof formats === 'string') {
        format = formats;
      } else {
        format = this.faker.random.arrayElement(formats);
      }
    } else if (provider.match(/#/)) {
      // The user chose an optional scheme
      format = provider;
    } else {
      // Choose a random provider
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else if (typeof localeFormat === 'object') {
        // Credit cards are in a object structure
        formats = this.faker.random.objectElement(localeFormat, 'value'); // There could be multiple formats
        if (typeof formats === 'string') {
          format = formats;
        } else {
          format = this.faker.random.arrayElement(formats);
        }
      }
    }
    format = format.replace(/\//g, '');
    return this.Helpers.replaceCreditCardSymbols(format);
  }

  /**
   * Credit card CVV
   *
   * @method faker.finance.creditCardCVV
   */
  creditCardCVV(): string {
    let cvv = '';
    for (let i = 0; i < 3; i++) {
      cvv += this.faker.datatype.number({ max: 9 }).toString();
    }
    return cvv;
  }

  /**
   * ethereumAddress
   *
   * @method faker.finance.ethereumAddress
   */
  ethereumAddress(): string {
    const address = this.faker.datatype.hexaDecimal(40).toLowerCase();
    return address;
  }

  /**
   * iban
   *
   * @param formatted Return a formatted version of the generated IBAN.
   * @param countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @method faker.finance.iban
   */
  iban(formatted: boolean = false, countryCode: string): string {
    let ibanFormat;
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
    for (let b = 0; b < ibanFormat.bban.length; b++) {
      const bban = ibanFormat.bban[b];
      let c = bban.count;
      count += bban.count;
      while (c > 0) {
        if (bban.type == 'a') {
          s += this.faker.random.arrayElement(this.ibanLib.alpha);
        } else if (bban.type == 'c') {
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
        this.ibanLib.toDigitString(s + ibanFormat.country + '00')
      );
    if (checksum < 10) {
      checksum = '0' + checksum;
    }
    const iban = ibanFormat.country + checksum + s;
    return formatted ? iban.match(/.{1,4}/g).join(' ') : iban;
  }

  /**
   * bic
   *
   * @method faker.finance.bic
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
   * description
   *
   * @method faker.finance.transactionDescription
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
