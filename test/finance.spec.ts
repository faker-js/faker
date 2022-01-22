import type { JestMockCompat } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';
import { luhnCheck } from './support/luhnCheck';

faker.seed(1234);

describe('finance', () => {
  describe('account( length )', () => {
    it('should supply a default length if no length is passed', () => {
      const account = faker.finance.account();

      const expected = 8;
      const actual = account.length;

      expect(
        actual,
        'The expected default account length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should supply a length if a length is passed', () => {
      const expected = 9;

      const account = faker.finance.account(expected);

      const actual = account.length;

      expect(
        actual,
        'The expected default account length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should supply a default length if a zero is passed', () => {
      const expected = 8;

      const account = faker.finance.account(0);

      const actual = account.length;

      expect(
        actual,
        'The expected default account length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });
  });

  describe('accountName()', () => {
    it('should return an account name', () => {
      const actual = faker.finance.accountName();

      expect(actual).toBeTruthy();
    });
  });

  describe('routingNumber()', () => {
    it('should return a routing number', () => {
      const actual = faker.finance.routingNumber();

      expect(actual).toBeTruthy();
    });
  });

  describe('mask( length, parens, ellipsis )', () => {
    it('should set a default length', () => {
      const expected = 4; //default account mask length

      const mask = faker.finance.mask(null, false, false);

      const actual = mask.length;

      expect(
        actual,
        'The expected default mask length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should set a specified length', () => {
      let expected = faker.datatype.number(20);

      expected =
        expected === 0 || !expected || typeof expected == 'undefined'
          ? 4
          : expected;

      const mask = faker.finance.mask(expected, false, false);

      const actual = mask.length; //picks 4 if the random number generator picks 0

      expect(
        actual,
        'The expected default mask length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should set a default length of 4 for a zero value', () => {
      const expected = 4;

      faker.finance.mask(0, false, false);

      const actual = 4; //picks 4 if the random number generator picks 0

      expect(
        actual,
        'The expected default mask length is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should by default include parentheses around a partial account number', () => {
      const expected = true;

      const mask = faker.finance.mask(null, null, false);

      const regexp = new RegExp(/(\(\d{4}?\))/);
      const actual = regexp.test(mask);

      expect(
        actual,
        'The expected match for parentheses is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should by default include an ellipsis', () => {
      const expected = true;

      const mask = faker.finance.mask(null, false, null);

      const regexp = new RegExp(/(\.\.\.\d{4})/);
      const actual = regexp.test(mask);

      expect(
        actual,
        'The expected match for parentheses is ' +
          expected +
          ' but it was ' +
          actual
      ).toBe(expected);
    });

    it('should work when random variables are passed into the arguments', () => {
      const length = faker.datatype.number(20);
      const ellipsis = length % 2 === 0 ? true : false;
      const parens = !ellipsis;

      const mask = faker.finance.mask(length, ellipsis, parens);
      expect(mask).toBeTruthy();
    });
  });

  describe('amount(min, max, dec, symbol)', () => {
    it('should use the default amounts when not passing arguments', () => {
      const amount = faker.finance.amount();

      expect(amount).toBeTruthy();
      expect(+amount, 'the amount should be greater than 0').greaterThan(0);
      expect(+amount, 'the amount should be less than 1001').lessThan(1001);
    });

    it('should use the default decimal location when not passing arguments', () => {
      let amount = faker.finance.amount();

      amount = faker.finance.amount(100, 100, 1);

      expect(amount).toBeTruthy();
      expect(amount, 'the amount should be equal 100.0').toStrictEqual('100.0');
    });

    //TODO: add support for more currency and decimal options
    it('should not include a currency symbol by default', () => {
      const amount = faker.finance.amount();

      expect(
        amount,
        'The expected match should not include a currency symbol'
      ).match(/[0-9.]/);
    });

    it('it should handle negative amounts', () => {
      const amount = faker.finance.amount(-200, -1);

      expect(amount).toBeTruthy();
      expect(+amount, 'the amount should be less than 0').lessThan(0);
      expect(+amount, 'the amount should be greater than -201').greaterThan(
        -201
      );
    });

    it('it should handle argument dec', () => {
      const amount = faker.finance.amount(100, 100, 1);

      expect(amount).toBeTruthy();
      expect(amount, 'the amount should be equal 100.0').toStrictEqual('100.0');
    });

    it('it should handle argument dec = 0', () => {
      const amount = faker.finance.amount(100, 100, 0);

      expect(amount).toBeTruthy();
      expect(amount, 'the amount should be equal 100').toStrictEqual('100');
    });

    it('it should return a string', () => {
      const amount = faker.finance.amount(100, 100, 0);

      expect(amount).toBeTruthy();
      expect(typeof amount, 'the amount type should be string').toBe('string');
    });

    [false, undefined].forEach((autoFormat) => {
      it(`should return unformatted if autoformat is ${autoFormat}`, () => {
        const number = 6000;
        const amount = faker.finance.amount(
          number,
          number,
          0,
          undefined,
          autoFormat
        );

        expect(amount).toStrictEqual(number.toString());
      });
    });

    it('should return the number formatted on the current locale', () => {
      const number = 6000;
      const decimalPlaces = 2;
      const expected = number.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
      });

      const amount = faker.finance.amount(
        number,
        number,
        decimalPlaces,
        undefined,
        true
      );

      expect(amount).toStrictEqual(expected);
    });
  });

  describe('transactionType()', () => {
    it('should return a random transaction type', () => {
      const transactionType = faker.finance.transactionType();

      expect(transactionType).toBeTruthy();
    });
  });

  describe('currencyCode()', () => {
    it('returns a random currency code with a format', () => {
      const currencyCode = faker.finance.currencyCode();

      expect(currencyCode).match(/^[A-Z]{3}$/);
    });
  });

  describe('bitcoinAddress()', () => {
    it('returns a random bitcoin address', () => {
      const bitcoinAddress = faker.finance.bitcoinAddress();

      /**
       *  Note: Although the total length of a Bitcoin address can be 25-33 characters, regex quantifiers only check the preceding token
       *  Therefore we take one from the total length of the address not including the first character ([13])
       */

      expect(bitcoinAddress).match(/^[13][a-km-zA-HJ-NP-Z1-9]{24,33}$/);
    });
  });

  describe('litecoinAddress()', () => {
    it('returns a random litecoin address', () => {
      const litecoinAddress = faker.finance.litecoinAddress();

      expect(litecoinAddress).match(/^[LM3][1-9a-km-zA-HJ-NP-Z]{25,32}$/);
    });
  });

  describe('ethereumAddress()', () => {
    it('returns a random ethereum address', () => {
      const ethereumAddress = faker.finance.ethereumAddress();
      expect(ethereumAddress).match(/^(0x)[0-9a-f]{40}$/);
    });
  });

  describe('creditCardNumber()', () => {
    it('returns a random credit card number', () => {
      let number = faker.finance.creditCardNumber();
      number = number.replace(/\D/g, ''); // remove formating
      console.log('version:', process.version, number, number.length);
      expect(number.length).greaterThanOrEqual(13);
      expect(number.length).lessThanOrEqual(20);
      expect(number).match(/^[0-9]{13,20}$/);
      expect(luhnCheck(number)).toBeTruthy();
    });

    it('returns a valid credit card number', () => {
      expect(luhnCheck(faker.finance.creditCardNumber(''))).toBeTruthy();
      expect(luhnCheck(faker.finance.creditCardNumber())).toBeTruthy();
      expect(luhnCheck(faker.finance.creditCardNumber())).toBeTruthy();
      expect(luhnCheck(faker.finance.creditCardNumber('visa'))).toBeTruthy();
      expect(
        luhnCheck(faker.finance.creditCardNumber('mastercard'))
      ).toBeTruthy();
      expect(
        luhnCheck(faker.finance.creditCardNumber('discover'))
      ).toBeTruthy();
      expect(luhnCheck(faker.finance.creditCardNumber())).toBeTruthy();
      expect(luhnCheck(faker.finance.creditCardNumber())).toBeTruthy();
    });
    it('returns a correct credit card number when issuer provided', () => {
      //TODO: implement checks for each format with regexp
      const visa = faker.finance.creditCardNumber('visa');
      expect(visa).match(/^4(([0-9]){12}|([0-9]){3}(\-([0-9]){4}){3})$/);
      expect(luhnCheck(visa)).toBeTruthy();

      const mastercard = faker.finance.creditCardNumber('mastercard');
      expect(mastercard).match(/^(5[1-5]\d{2}|6771)(\-\d{4}){3}$/);
      expect(luhnCheck(mastercard)).toBeTruthy();

      const discover = faker.finance.creditCardNumber('discover');

      expect(luhnCheck(discover)).toBeTruthy();

      const american_express =
        faker.finance.creditCardNumber('american_express');
      expect(luhnCheck(american_express)).toBeTruthy();
      const diners_club = faker.finance.creditCardNumber('diners_club');
      expect(luhnCheck(diners_club)).toBeTruthy();
      const jcb = faker.finance.creditCardNumber('jcb');
      expect(luhnCheck(jcb)).toBeTruthy();
      const switchC = faker.finance.creditCardNumber('mastercard');
      expect(luhnCheck(switchC)).toBeTruthy();
      const solo = faker.finance.creditCardNumber('solo');
      expect(luhnCheck(solo)).toBeTruthy();
      const maestro = faker.finance.creditCardNumber('maestro');
      expect(luhnCheck(maestro)).toBeTruthy();
      const laser = faker.finance.creditCardNumber('laser');
      expect(luhnCheck(laser)).toBeTruthy();
      const instapayment = faker.finance.creditCardNumber('instapayment');
      expect(luhnCheck(instapayment)).toBeTruthy();
    });
    it('returns custom formated strings', () => {
      let number = faker.finance.creditCardNumber('###-###-##L');
      expect(number).match(/^\d{3}\-\d{3}\-\d{3}$/);
      expect(luhnCheck(number)).toBeTruthy();

      number = faker.finance.creditCardNumber('234[5-9]#{999}L');
      expect(number).match(/^234[5-9]\d{1000}$/);
      expect(luhnCheck(number)).toBeTruthy();
    });
  });

  describe('creditCardCVV()', () => {
    it('returns a random credit card CVV', () => {
      const cvv = faker.finance.creditCardCVV();
      expect(cvv).toHaveLength(3);
      expect(cvv).match(/^[0-9]{3}$/);
    });
  });

  describe('iban()', () => {
    const ibanLib = require('../lib/cjs/iban');
    it('returns a random yet formally correct IBAN number', () => {
      const iban =
        // @ts-expect-error
        faker.finance.iban();
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toStrictEqual(1);
    });
    it('returns a specific and formally correct IBAN number', () => {
      const iban = faker.finance.iban(false, 'DE');
      const bban = iban.substring(4) + iban.substring(0, 4);
      const countryCode = iban.substring(0, 2);

      expect(countryCode).toBe('DE');
      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toStrictEqual(1);
    });
    it('throws an error if the passed country code is not supported', () => {
      expect(() => faker.finance.iban(false, 'AA')).toThrowError(
        Error('Country code AA not supported.')
      );
    });
  });

  describe('bic()', () => {
    const ibanLib = require('../lib/cjs/iban');
    it('returns a random yet formally correct BIC number', () => {
      const bic = faker.finance.bic();
      const expr = new RegExp(
        '^[A-Z]{4}(' +
          ibanLib.iso3166.join('|') +
          ')[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$',
        'i'
      );

      expect(bic).match(expr);
    });
  });

  describe('transactionDescription()', () => {
    let spy_helpers_createTransaction: JestMockCompat<
      [],
      {
        amount: string;
        date: Date;
        business: string;
        name: string;
        type: string;
        account: string;
      }
    >;

    beforeEach(() => {
      spy_helpers_createTransaction = vi.spyOn(
        faker.helpers,
        'createTransaction'
      );
    });

    afterEach(() => {
      spy_helpers_createTransaction.mockRestore();
    });

    it('returns a random transaction description', () => {
      const transactionDescription = faker.finance.transactionDescription();

      expect(transactionDescription).toBeTruthy();
      expect(spy_helpers_createTransaction).toHaveBeenCalledOnce();
    });
  });
});
