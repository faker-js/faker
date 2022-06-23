import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { FakerError } from '../src/errors/faker-error';
import ibanLib from '../src/modules/finance/iban';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededRuns } from './support/seededRuns';

const functionNames = [
  'account',
  'accountName',
  'routingNumber',
  'mask',
  'amount',
  'transactionType',
  'currencyCode',
  'currencyName',
  'currencySymbol',
  'bitcoinAddress',
  'litecoinAddress',
  'creditCardNumber',
  'creditCardCVV',
  'pin',
  'ethereumAddress',
  'iban',
  'bic',
  'transactionDescription',
];

const NON_SEEDED_BASED_RUN = 5;

describe('finance', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.finance[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('account()', () => {
        it('should supply a default length', () => {
          const accountNum = faker.finance.account();

          expect(accountNum).toBeTruthy();
          expect(
            accountNum,
            'The length of the account number should be 8 characters long'
          ).toHaveLength(8);
        });

        it('should supply a default length if a zero is passed', () => {
          const accountNum = faker.finance.account(0);

          expect(accountNum).toBeTruthy();
          expect(
            accountNum,
            'The length of the account number should be 8 characters long'
          ).toHaveLength(8);
        });

        it('should be the the length fo given number', () => {
          const accountNum = faker.finance.account(16);

          expect(accountNum).toBeTruthy();
          expect(
            accountNum,
            'The length of the  account number should match the given number'
          ).toHaveLength(16);
        });
      });

      describe('accountName()', () => {
        it('should return a string', () => {
          const accountName = faker.finance.accountName();

          expect(accountName).toBeTruthy();
          expect(accountName).toBeTypeOf('string');
        });
      });

      describe('routingNumber()', () => {
        it('should return a string', () => {
          const routingNumber = faker.finance.routingNumber();

          expect(routingNumber).toBeTypeOf('string');
        });
      });

      describe('mask()', () => {
        it('should set a default length', () => {
          const expected = 4; //default account mask length
          const mask = faker.finance.mask(null, false, false);

          expect(
            mask,
            `The expected default mask length is ${expected} but it was ${mask.length}`
          ).toHaveLength(expected);
        });

        it('should set a specified length', () => {
          let expected = faker.datatype.number(20);

          expected = expected || 4;

          const mask = faker.finance.mask(expected, false, false); //the length of mask picks 4 if the random number generator picks 0

          expect(
            mask,
            `The expected default mask length is ${expected} but it was ${mask.length}`
          ).toHaveLength(expected);
        });
      });

      describe('amount()', () => {
        it('should use the default amounts when not passing arguments', () => {
          const amount = faker.finance.amount();

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(
            +amount,
            'the amount should be greater than 0'
          ).toBeGreaterThan(0);
          expect(+amount, 'the amount should be less than 1001').toBeLessThan(
            1001
          );
        });

        it('should use the default decimal location when not passing arguments', () => {
          let amount = faker.finance.amount();

          amount = faker.finance.amount(100, 100, 1);

          expect(amount).toBeTruthy();
          expect(amount, 'the amount should be equal 100.0').toStrictEqual(
            '100.0'
          );
        });

        //TODO: add support for more currency and decimal options
        it('should not include a currency symbol by default', () => {
          const amount = faker.finance.amount();

          expect(
            amount,
            'The expected match should not include a currency symbol'
          ).toMatch(/^[0-9\.]+$/);
        });

        it('it should handle negative amounts', () => {
          const amount = faker.finance.amount(-200, -1);

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(+amount, 'the amount should be less than 0').toBeLessThan(0);
          expect(
            +amount,
            'the amount should be greater than -201'
          ).toBeGreaterThan(-201);
        });

        it('it should handle argument dec', () => {
          const amount = faker.finance.amount(100, 100, 1);

          expect(amount).toBeTruthy();
          expect(amount, 'the amount should be equal 100.0').toStrictEqual(
            '100.0'
          );
        });

        it('it should handle argument dec = 0', () => {
          const amount = faker.finance.amount(100, 100, 0);

          expect(amount).toBeTruthy();
          expect(amount, 'the amount should be equal 100').toStrictEqual('100');
        });

        it('it should return a string', () => {
          const amount = faker.finance.amount(100, 100, 0);

          expect(amount).toBeTruthy();
          expect(amount, 'the amount type should be string').toBeTypeOf(
            'string'
          );
        });

        it.each([false, undefined])(
          'should return unformatted if autoformat is %s',
          (autoFormat) => {
            const number = 6000;
            const amount = faker.finance.amount(
              number,
              number,
              0,
              undefined,
              autoFormat
            );

            expect(amount).toStrictEqual(number.toString());
          }
        );

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
        it('should return a string', () => {
          const transactionType = faker.finance.transactionType();

          expect(transactionType).toBeTypeOf('string');
        });
      });

      describe('currencyCode()', () => {
        it('should return a valid three letter currency code', () => {
          const currencyCode = faker.finance.currencyCode();

          expect(currencyCode).toBeTypeOf('string');
          expect(currencyCode).toMatch(/^[A-Z]{3}$/);
        });
      });

      describe('currencyName()', () => {
        it('should return a string', () => {
          const currencyName = faker.finance.currencyName();

          expect(currencyName).toBeTypeOf('string');
        });
      });

      describe('currencySymbol()', () => {
        it('should return a string', () => {
          const currencySymbol = faker.finance.currencySymbol();

          expect(currencySymbol).toBeTypeOf('string');
        });
      });

      describe('bitcoinAddress()', () => {
        it('should return a valid bitcoin address', () => {
          const bitcoinAddress = faker.finance.bitcoinAddress();
          /**
           *  Note: Although the total length of a Bitcoin address can be 25-33 characters, regex quantifiers only check the preceding token
           *  Therefore we take one from the total length of the address not including the first character ([13])
           */

          expect(bitcoinAddress).toBeTruthy();
          expect(bitcoinAddress).toBeTypeOf('string');
          expect(bitcoinAddress).toMatch(/^[13][a-km-zA-HJ-NP-Z1-9]{24,33}$/);
        });
      });

      describe('litecoinAddress()', () => {
        it('should return a valid litecoin address', () => {
          const litecoinAddress = faker.finance.litecoinAddress();

          expect(litecoinAddress).toBeTypeOf('string');
          expect(litecoinAddress).toMatch(/^[LM3][1-9a-km-zA-HJ-NP-Z]{25,32}$/);
        });
      });

      describe('creditCardNumber()', () => {
        it('should return a random credit card number', () => {
          let number = faker.finance.creditCardNumber();
          number = number.replace(/\D/g, ''); // remove formatting
          console.log('version:', process.version, number, number.length);

          expect(number.length).toBeGreaterThanOrEqual(13);
          expect(number.length).toBeLessThanOrEqual(20);
          expect(number).toMatch(/^\d{13,20}$/);
          expect(number).toSatisfy(luhnCheck);
        });

        it('should return a valid credit card number', () => {
          expect(faker.finance.creditCardNumber('')).toSatisfy(luhnCheck);
          expect(faker.finance.creditCardNumber()).toSatisfy(luhnCheck);
          expect(faker.finance.creditCardNumber('visa')).toSatisfy(luhnCheck);
          expect(faker.finance.creditCardNumber('mastercard')).toSatisfy(
            luhnCheck
          );
          expect(faker.finance.creditCardNumber('discover')).toSatisfy(
            luhnCheck
          );
          expect(faker.finance.creditCardNumber()).toSatisfy(luhnCheck);
          expect(faker.finance.creditCardNumber()).toSatisfy(luhnCheck);
        });

        it('should ignore case for issuer', () => {
          const seed = faker.seed();
          const actualNonLowerCase = faker.finance.creditCardNumber('ViSa');

          faker.seed(seed);
          const actualLowerCase = faker.finance.creditCardNumber('visa');

          expect(actualNonLowerCase).toBe(actualLowerCase);
        });

        it('should return a correct credit card number when issuer provided', () => {
          //TODO: implement checks for each format with regexp
          const visa = faker.finance.creditCardNumber('visa');
          expect(visa).toMatch(/^4(([0-9]){12}|([0-9]){3}(\-([0-9]){4}){3})$/);
          expect(visa).toSatisfy(luhnCheck);

          const mastercard = faker.finance.creditCardNumber('mastercard');
          expect(mastercard).toMatch(/^(5[1-5]\d{2}|6771)(\-\d{4}){3}$/);
          expect(mastercard).toSatisfy(luhnCheck);

          const discover = faker.finance.creditCardNumber('discover');

          expect(discover).toSatisfy(luhnCheck);

          const american_express =
            faker.finance.creditCardNumber('american_express');
          expect(american_express).toSatisfy(luhnCheck);
          const diners_club = faker.finance.creditCardNumber('diners_club');
          expect(diners_club).toSatisfy(luhnCheck);
          const jcb = faker.finance.creditCardNumber('jcb');
          expect(jcb).toSatisfy(luhnCheck);
          const switchC = faker.finance.creditCardNumber('mastercard');
          expect(switchC).toSatisfy(luhnCheck);
          const solo = faker.finance.creditCardNumber('solo');
          expect(solo).toSatisfy(luhnCheck);
          const maestro = faker.finance.creditCardNumber('maestro');
          expect(maestro).toSatisfy(luhnCheck);
          const laser = faker.finance.creditCardNumber('laser');
          expect(laser).toSatisfy(luhnCheck);
          const instapayment = faker.finance.creditCardNumber('instapayment');
          expect(instapayment).toSatisfy(luhnCheck);
        });

        it('should return custom formatted strings', () => {
          let number = faker.finance.creditCardNumber('###-###-##L');
          expect(number).toMatch(/^\d{3}\-\d{3}\-\d{3}$/);
          expect(number).toSatisfy(luhnCheck);

          number = faker.finance.creditCardNumber('234[5-9]#{999}L');
          expect(number).toMatch(/^234[5-9]\d{1000}$/);
          expect(number).toSatisfy(luhnCheck);
        });
      });

      describe('creditCardIssuer()', () => {
        it('should return a string', () => {
          const issuer = faker.finance.creditCardIssuer();
          expect(issuer).toBeTypeOf('string');
          expect(Object.keys(faker.definitions.finance.credit_card)).toContain(
            issuer
          );
        });
      });

      describe('creditCardCVV()', () => {
        it('should return a valid credit card CVV', () => {
          const cvv = faker.finance.creditCardCVV();

          expect(cvv).toBeTypeOf('string');
          expect(cvv).toMatch(/\d{3}/);
          expect(
            cvv,
            'The length of the cvv should be 3 characters long'
          ).toHaveLength(3);
        });
      });

      describe('pin()', () => {
        it('should return a string', () => {
          const pin = faker.finance.pin();
          expect(pin).toBeTypeOf('string');
        });

        it('should contain only digits', () => {
          const pin = faker.finance.pin();
          expect(pin).toMatch(/^[0-9]+$/);
        });

        it('should default to a length of 4', () => {
          const pin = faker.finance.pin();
          expect(pin).toHaveLength(4);
        });

        it('should return a pin with the specified length', () => {
          const pin = faker.finance.pin(5);
          expect(pin).toHaveLength(5);
        });

        it('should throw an error when length is less than 1', () => {
          expect(() => faker.finance.pin(-5)).toThrowError(
            /^minimum length is 1$/
          );
        });
      });

      describe('ethereumAddress()', () => {
        it('should return a valid ethereum address', () => {
          const ethereumAddress = faker.finance.ethereumAddress();

          expect(ethereumAddress).toBeTypeOf('string');
          expect(ethereumAddress).toMatch(/^(0x)[0-9a-f]{40}$/);
        });
      });

      describe('iban()', () => {
        it('should return a random yet formally correct IBAN number', () => {
          const iban = faker.finance.iban();
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toStrictEqual(1);
        });

        it('should return a specific and formally correct IBAN number', () => {
          const iban = faker.finance.iban(false, 'DE');
          const bban = iban.substring(4) + iban.substring(0, 4);
          const countryCode = iban.substring(0, 2);

          expect(countryCode).toBe('DE');
          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toStrictEqual(1);
        });

        it.each(['AA', 'EU'])(
          'throws an error for unsupported country code "%s"',
          (unsupportedCountryCode) =>
            expect(() =>
              faker.finance.iban(false, unsupportedCountryCode)
            ).toThrowError(
              new FakerError(
                `Country code ${unsupportedCountryCode} not supported.`
              )
            )
        );
      });

      describe('bic()', () => {
        it('should return a random yet formally correct BIC number', () => {
          const bic = faker.finance.bic();
          const expr = new RegExp(
            `^[A-Z]{4}(${ibanLib.iso3166.join(
              '|'
            )})[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?\$`,
            'i'
          );

          expect(bic).toBeTypeOf('string');
          expect(bic).toMatch(expr);
        });
      });

      describe('transactionDescription()', () => {
        it('should return a string', () => {
          const transactionDescription = faker.finance.transactionDescription();

          expect(transactionDescription).toBeTypeOf('string');
        });
      });
    }
  });
});
