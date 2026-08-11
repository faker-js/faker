import type { VATCountryCode } from 'validator';
import { isAbaRouting, isVAT } from 'validator';
import isCreditCard from 'validator/lib/isCreditCard';
import isLuhnNumber from 'validator/lib/isLuhnNumber';
import { describe, expect, it } from 'vitest';
import { allLocales, faker, fakerZH_CN } from '../../src';
import { FakerError } from '../../src/errors/faker-error';
import {
  BitcoinAddressFamily,
  BitcoinNetwork,
} from '../../src/modules/finance/bitcoin';
import ibanLib from '../../src/modules/finance/iban';
import type { VatNumberCountryCode } from '../../src/modules/finance/vat-number';
import { vatNumberFormats } from '../../src/modules/finance/vat-number';
import { luhnCheck } from '../../src/modules/helpers/luhn-check';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('finance', () => {
  seededTests(faker, 'finance', (t) => {
    t.itEach(
      'accountName',
      'routingNumber',
      'transactionType',
      'creditCardIssuer',
      'currency',
      'currencyCode',
      'currencyName',
      'currencySymbol',
      'currencyNumericCode',
      'litecoinAddress',
      'creditCardCVV',
      'ethereumAddress',
      'transactionDescription'
    );

    t.describe('accountNumber', (t) => {
      t.it('noArgs')
        .it('with length', 10)
        .it('with length option', { length: 10 });
    });

    t.describe('pin', (t) => {
      t.it('noArgs')
        .it('with length', 10)
        .it('with length option', { length: 10 });
    });

    t.describe('amount', (t) => {
      t.it('noArgs')
        .it('with min option', { min: 10 })
        .it('with min and max option', { min: 10, max: 50 })
        .it('with min, max and dec option', { min: 10, max: 50, dec: 5 })
        .it('with min, max, dec and symbol option', {
          min: 10,
          max: 50,
          dec: 5,
          symbol: '#',
        })
        .it('with min, max, dec, symbol and autoFormat option', {
          min: 10,
          max: 50,
          dec: 5,
          symbol: '#',
          autoFormat: false,
        });
    });

    t.describe('bic', (t) => {
      t.it('noArgs').it('with branch code', { includeBranchCode: true });
    });

    t.describe('iban', (t) => {
      t.it('noArgs')
        .it('with formatted option', { formatted: true })
        .it('with formatted and countryCode option', {
          formatted: true,
          countryCode: 'DE',
        });
    });

    t.describe('vatNumber', (t) => {
      t.it('noArgs')
        .it('with countryCode option', { countryCode: 'DE' })
        .it('with a variable length countryCode option', { countryCode: 'RO' });
    });

    t.describe('creditCardNumber', (t) => {
      t.it('noArgs')
        .it('with issuer', 'visa')
        .it('with issuer option visa', { issuer: 'visa' })
        .it('with issuer option mastercard', { issuer: 'mastercard' });
    });

    t.describe('bitcoinAddress', (t) => {
      t.it('noArgs')
        .it('with type option', { type: BitcoinAddressFamily.Legacy })
        .it('with type and network option', {
          type: BitcoinAddressFamily.Legacy,
          network: BitcoinNetwork.Mainnet,
        });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('accountNumber()', () => {
        it('should supply a default length', () => {
          const accountNumber = faker.finance.accountNumber();

          expect(accountNumber).toBeTruthy();
          expect(
            accountNumber,
            'The length of the account number should be 8 characters long'
          ).toHaveLength(8);
        });

        it('should have same length as given length number', () => {
          const accountNumber = faker.finance.accountNumber(16);

          expect(accountNumber).toBeTruthy();
          expect(
            accountNumber,
            'The length of the account number should match the given number'
          ).toHaveLength(16);
        });

        it('should have same length as given length object', () => {
          const accountNumber = faker.finance.accountNumber({ length: 12 });

          expect(accountNumber).toBeTruthy();
          expect(
            accountNumber,
            'The length of the account number should match the given number'
          ).toHaveLength(12);
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
        it('should return a valid ABA routing number', () => {
          const routingNumber = faker.finance.routingNumber();

          expect(routingNumber).toBeTypeOf('string');
          expect(routingNumber).toSatisfy(isAbaRouting);
        });

        it('should correspond to a valid federal reserve district', () => {
          const routingNumber = faker.finance.routingNumber();

          const firstTwoDigits = routingNumber.substring(0, 2);
          const federalReserveDistrict = Number.parseInt(firstTwoDigits);

          expect(federalReserveDistrict).toBeTypeOf('number');
          expect(federalReserveDistrict).toBeGreaterThan(0);
          expect(federalReserveDistrict).toBeLessThanOrEqual(12);
        });
      });

      describe('amount()', () => {
        it('should use the default amounts when not passing arguments', () => {
          const amount = faker.finance.amount();

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(+amount).toBeGreaterThanOrEqual(0);
          expect(+amount).toBeLessThanOrEqual(1000);
        });

        //TODO: add support for more currency and decimal options
        it('should not include a currency symbol by default', () => {
          const amount = faker.finance.amount();

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(
            amount,
            'The expected match should not include a currency symbol'
          ).toMatch(/^[0-9.]+$/);
        });

        it('should handle negative amounts', () => {
          const amount = faker.finance.amount({ min: -200, max: -1 });

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(+amount).toBeLessThanOrEqual(-1);
          expect(+amount).toBeGreaterThanOrEqual(-200);
        });

        it('should use the default dec', () => {
          const amount = faker.finance.amount({ min: 100, max: 100 });

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(amount).toBe('100.00');
        });

        it('should handle argument dec', () => {
          const amount = faker.finance.amount({ min: 100, max: 100, dec: 1 });

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(amount).toBe('100.0');
        });

        it('should handle argument dec = 0', () => {
          const amount = faker.finance.amount({ min: 100, max: 100, dec: 0 });

          expect(amount).toBeTruthy();
          expect(amount).toBeTypeOf('string');
          expect(amount).toBe('100');
        });

        it.each([false, undefined])(
          'should return unformatted if autoformat is %s',
          (autoFormat) => {
            const number = 6000;
            const amount = faker.finance.amount({
              min: number,
              max: number,
              dec: 0,
              autoFormat,
            });

            expect(amount).toBe(number.toString());
          }
        );

        // This test is flaky on Windows Github Actions
        it.todo(
          'should return the number formatted on the current locale',
          () => {
            const number = 6000;
            const decimalPlaces = 2;
            const expected = number.toLocaleString(undefined, {
              minimumFractionDigits: decimalPlaces,
            });

            const amount = faker.finance.amount({
              min: number,
              max: number,
              dec: decimalPlaces,
              autoFormat: true,
            });

            expect(amount).toStrictEqual(expected);
          }
        );
      });

      describe('transactionType()', () => {
        it('should return a string', () => {
          const transactionType = faker.finance.transactionType();

          expect(transactionType).toBeTypeOf('string');
        });
      });

      describe('currency()', () => {
        it('should return a valid currency object', () => {
          const currency = faker.finance.currency();
          expect(currency.code).toBeTypeOf('string');
          expect(currency.code).toMatch(/^[A-Z]{3}$/);
          expect(currency.name).toBeTypeOf('string');
          expect(currency.symbol).toBeTypeOf('string');
          expect(currency.numericCode).toBeTypeOf('string');
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

      describe('currencyNumericCode()', () => {
        it('should return a string with length of 3', () => {
          const currencyNumericCode = faker.finance.currencyNumericCode();

          expect(currencyNumericCode).toBeTypeOf('string');
          expect(currencyNumericCode).toMatch(/^\d{3}$/);
        });
      });

      describe('bitcoinAddress()', () => {
        const m_legacy = /^1[A-HJ-NP-Za-km-z1-9]{25,39}$/;
        const t_legacy = /^m[A-HJ-NP-Za-km-z1-9]{25,39}$/;
        const m_segwit = /^3[A-HJ-NP-Za-km-z1-9]{25,39}$/;
        const t_segwit = /^2[A-HJ-NP-Za-km-z1-9]{25,39}$/;
        const m_bech32 = /^bc1[ac-hj-np-z02-9]{39,39}$/;
        const t_bech32 = /^tb1[ac-hj-np-z02-9]{39,39}$/;
        const m_taproot = /^bc1p[ac-hj-np-z02-9]{58,58}$/;
        const t_taproot = /^tb1p[ac-hj-np-z02-9]{58,58}$/;

        const isBtcAddress = (address: string) =>
          [
            m_legacy,
            t_legacy,
            m_segwit,
            t_segwit,
            m_bech32,
            t_bech32,
            m_taproot,
            t_taproot,
          ].some((r) => r.test(address));

        it('should return a valid bitcoin address', () => {
          const bitcoinAddress = faker.finance.bitcoinAddress();

          expect(bitcoinAddress).toBeTruthy();
          expect(bitcoinAddress).toBeTypeOf('string');
          expect(bitcoinAddress).toSatisfy(isBtcAddress);
        });

        it.each([
          [BitcoinAddressFamily.Legacy, m_legacy],
          [BitcoinAddressFamily.Segwit, m_segwit],
          [BitcoinAddressFamily.Bech32, m_bech32],
          [BitcoinAddressFamily.Taproot, m_taproot],
        ] as const)(
          'should handle the type = $type argument',
          (type, regex) => {
            const bitcoinAddress = faker.finance.bitcoinAddress({
              type,
            });

            expect(bitcoinAddress).toBeTruthy();
            expect(bitcoinAddress).toBeTypeOf('string');
            expect(bitcoinAddress).toSatisfy(isBtcAddress);
            expect(bitcoinAddress).toMatch(regex);
          }
        );

        it.each([
          [BitcoinNetwork.Mainnet, [m_legacy, m_segwit, m_bech32, m_taproot]],
          [BitcoinNetwork.Testnet, [t_legacy, t_segwit, t_bech32, t_taproot]],
        ] as const)(
          'should handle the network = $network argument',
          (network, regexes) => {
            const bitcoinAddress = faker.finance.bitcoinAddress({
              network,
            });

            expect(bitcoinAddress).toBeTruthy();
            expect(bitcoinAddress).toBeTypeOf('string');
            expect(bitcoinAddress).toSatisfy(isBtcAddress);
            expect(bitcoinAddress).toSatisfy((v: string) =>
              regexes.some((r) => r.test(v))
            );
          }
        );

        it.each([
          [BitcoinAddressFamily.Legacy, BitcoinNetwork.Mainnet, m_legacy],
          [BitcoinAddressFamily.Legacy, BitcoinNetwork.Testnet, t_legacy],
          [BitcoinAddressFamily.Segwit, BitcoinNetwork.Mainnet, m_segwit],
          [BitcoinAddressFamily.Segwit, BitcoinNetwork.Testnet, t_segwit],
          [BitcoinAddressFamily.Bech32, BitcoinNetwork.Mainnet, m_bech32],
          [BitcoinAddressFamily.Bech32, BitcoinNetwork.Testnet, t_bech32],
          [BitcoinAddressFamily.Taproot, BitcoinNetwork.Mainnet, m_taproot],
          [BitcoinAddressFamily.Taproot, BitcoinNetwork.Testnet, t_taproot],
        ] as const)(
          'should handle the type = $type and network = $network arguments',
          (type, network, regex) => {
            const bitcoinAddress = faker.finance.bitcoinAddress({
              type,
              network,
            });

            expect(bitcoinAddress).toBeTruthy();
            expect(bitcoinAddress).toBeTypeOf('string');
            expect(bitcoinAddress).toSatisfy(isBtcAddress);
            expect(bitcoinAddress).toMatch(regex);
          }
        );
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
          number = number.replaceAll(/\D/g, ''); // remove formatting

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
          expect(visa).toMatch(/^4(([0-9]){12}|([0-9]){3}(-([0-9]){4}){3})$/);
          expect(visa).toSatisfy(luhnCheck);

          const mastercard = faker.finance.creditCardNumber('mastercard');
          expect(mastercard).toSatisfy((value) =>
            isCreditCard(value as string, { provider: 'mastercard' })
          );
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
          const maestro = faker.finance.creditCardNumber('maestro');
          expect(maestro).toSatisfy(luhnCheck);
        });

        it('should generate a valid union pay credit card', () => {
          const actual = fakerZH_CN.finance.creditCardNumber('unionpay');
          expect(actual).toSatisfy(luhnCheck);
          expect(actual).toSatisfy((value) =>
            isCreditCard(value as string, { provider: 'unionpay' })
          );
        });

        it('should return custom formatted strings', () => {
          let number = faker.finance.creditCardNumber('###-###-##L');
          expect(number).toMatch(/^\d{3}-\d{3}-\d{3}$/);
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
          expect(() => faker.finance.pin(-5)).toThrow(/^minimum length is 1$/);
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
          ).toBe(1);
        });

        it('should return a specific and formally correct IBAN number', () => {
          const iban = faker.finance.iban({
            formatted: false,
            countryCode: 'DE',
          });
          const bban = iban.substring(4) + iban.substring(0, 4);
          const countryCode = iban.substring(0, 2);

          expect(countryCode).toBe('DE');
          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });

        it.each(['AA', 'EU'])(
          'throws an error for unsupported country code "%s"',
          (unsupportedCountryCode) =>
            expect(() =>
              faker.finance.iban({
                formatted: false,
                countryCode: unsupportedCountryCode,
              })
            ).toThrow(
              new FakerError(
                `Country code ${unsupportedCountryCode} not supported.`
              )
            )
        );
      });

      describe('bic()', () => {
        it('should return a BIC number', () => {
          const bic = faker.finance.bic();

          expect(bic).toBeTypeOf('string');
          expect(bic).toMatch(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/);
          expect(ibanLib.iso3166).toContain(bic.substring(4, 6));
        });

        it('should return a BIC number with branch code', () => {
          const bic = faker.finance.bic({ includeBranchCode: true });

          expect(bic).toBeTypeOf('string');
          expect(bic).toMatch(/^[A-Z]{6}[A-Z0-9]{2}[A-Z0-9]{3}$/);
          expect(ibanLib.iso3166).toContain(bic.substring(4, 6));
        });
      });

      describe('vatNumber()', () => {
        // Every entry of `vatNumberFormats` is covered by the pattern loop
        // below. These two are additionally excluded from `validator` (13.15),
        // which rejects real Spanish numbers whose control character is a
        // digit, such as `ESA28015865` (reported as
        // validatorjs/validator.js#2846), and recomputes the Portuguese check
        // digit, which is random here.
        const CHECKED_BY_VALIDATOR = (
          Object.keys(vatNumberFormats) as VatNumberCountryCode[]
        ).filter((code) => !['ES', 'PT'].includes(code));

        it.each(CHECKED_BY_VALIDATOR)(
          'should return a valid VAT number for %s',
          (country) => {
            const actual = faker.finance.vatNumber({ countryCode: country });

            // Not redundant: nearly every validator matcher makes the prefix
            // optional — FR is the exception — so `isVAT('123456789', 'DE')`
            // is true on its own.
            expect(actual).toStartWith(country);
            expect(actual).toSatisfy((value: string) =>
              isVAT(value, country as VATCountryCode)
            );
          }
        );

        // `fromRegExp` understands a subset of regex and copies anything
        // outside it into the output verbatim. This loop proves every pattern
        // stays inside that subset; it says nothing about a pattern being
        // right for its country, since it checks each pattern against itself.
        it.each(Object.entries(vatNumberFormats))(
          'should expand the %s pattern rather than emit it literally',
          (countryCode, patterns) => {
            const alternatives = [patterns].flat();
            // Enough draws that every alternative of a multi-shape country is
            // exercised, not just whichever one the first draw happens to pick.
            const actuals = times(50).map(() =>
              faker.finance.vatNumber({
                countryCode: countryCode as VatNumberCountryCode,
              })
            );

            for (const actual of actuals) {
              expect(
                alternatives.some((alternative) =>
                  new RegExp(`^${alternative}$`).test(actual)
                )
              ).toBe(true);
              // VAT numbers are alphanumeric throughout, so a surviving
              // metacharacter means the pattern was passed through unexpanded.
              expect(actual).toMatch(/^[A-Z0-9]+$/);
            }
          }
        );

        // Every format is keyed by the prefix its numbers carry, which is what
        // keeps the no-argument draw uniform: an alias sharing another
        // country's pattern would otherwise give that country double weight.
        it('should key every format by the prefix its numbers carry', () => {
          for (const [countryCode, patterns] of Object.entries(
            vatNumberFormats
          )) {
            for (const pattern of [patterns].flat()) {
              expect(pattern).toStartWith(countryCode);
            }
          }
        });

        it('should return a VAT number of a supported country', () => {
          const actual = faker.finance.vatNumber();
          const country = actual.slice(0, 2);

          expect(Object.keys(vatNumberFormats)).toContain(country);
        });

        it('should accept the GR ISO code and emit the EL prefix Greek numbers use', () => {
          expect(faker.finance.vatNumber({ countryCode: 'GR' })).toStartWith(
            'EL'
          );
        });

        // `toString` guards the inherited-key path, which is reachable from
        // JavaScript and used to resolve to `Object.prototype.toString`,
        // returning an empty string instead of throwing.
        it.each(['XX', '', 'toString'])(
          'should throw for the unsupported country code %j',
          (countryCode) => {
            expect(() =>
              faker.finance.vatNumber({
                countryCode: countryCode as VatNumberCountryCode,
              })
            ).toThrow(
              new FakerError(`Country code ${countryCode} not supported.`)
            );
          }
        );

        // Stated independently of the source patterns, and only where
        // `validator` is weaker than they are: it checks BE as \d{10}, CY as
        // \w{9}, IE as \d{7}\w(W)?, LT as \d{9,12}, RO as \d{2,10}, SE as
        // \d{12} and SI as \d{8}, and is unusable for ES and PT per the note
        // above. AT, DE and NL are fully covered there and are not repeated.
        it.each([
          ['BE', /^BE[01]\d{9}$/],
          ['CY', /^CY[0134569]\d{7}[A-Z]$/],
          // The entity class decides the control character, so the two are not
          // independent: a Spanish legal entity takes a digit, a foreign
          // entity or public body takes a letter.
          ['ES', /^ES(?:[ABCDEFGHJUV]\d{7}\d|[NPQRSW]\d{7}[A-J])$/],
          ['FR', /^FR[0-9A-HJ-NP-Z]{2}\d{9}$/],
          ['IE', /^IE\d{7}[A-W]W?$/],
          ['LT', /^LT\d{7}1\d$/],
          ['NL', /^NL\d{9}B(?!00)\d{2}$/],
          ['PT', /^PT[1-9]\d{8}$/],
          ['RO', /^RO[1-9]\d{1,9}$/],
          ['SE', /^SE\d{10}01$/],
          ['SI', /^SI[1-9]\d{7}$/],
        ] as const)(
          'should respect the %s numbering rules validator does not check',
          (countryCode, expected) => {
            const actuals = times(100).map(() =>
              faker.finance.vatNumber({ countryCode })
            );

            expect(actuals.filter((actual) => !expected.test(actual))).toEqual(
              []
            );
          }
        );
      });

      describe('transactionDescription()', () => {
        it('should return a string', () => {
          const transactionDescription = faker.finance.transactionDescription();

          expect(transactionDescription).toBeTypeOf('string');
        });
      });
    }
  );
});

describe('finance locale data', () => {
  // Dedicated type for readability purposes
  type KnownProvider = Exclude<
    Parameters<typeof isCreditCard>[1],
    undefined
  >['provider'];

  function getKnownProvider(value: string | undefined): KnownProvider {
    // taken from definitions of validatorjs:
    // https://github.com/validatorjs/validator.js/blob/72573b3d1d8ab2e6575e6bba1cbe2b01f95f4935/src/lib/isCreditCard.js#L4-L12
    const providers: Record<string, KnownProvider> = {
      american_express: 'amex',
      diners_club: 'dinersclub',
      discover: 'discover',
      jcb: 'jcb',
      mastercard: 'mastercard',
      unionpay: 'unionpay',
      visa: 'visa',
    };

    const knownProvider = providers[value ?? ''];
    if (knownProvider == null) {
      throw new Error(
        `Issuer "${value}" is not a known provider for validatorjs. Because of that the validity of it's patterns can not be verified.`
      );
    }

    return knownProvider;
  }

  const localesWithData = Object.entries(allLocales).filter(
    ([, data]) => Object.keys(data.finance?.credit_card ?? {}).length > 0
  );
  describe.each(localesWithData)(`%s`, (_localeName, localeData) => {
    describe('credit cards', () => {
      describe('issuer', () => {
        describe.each(Object.entries(localeData.finance?.credit_card ?? {}))(
          '%s',
          (issuerName, issuerPatterns) => {
            function isCreditCardFromIssuer(value: string) {
              return isCreditCard(value, {
                provider: getKnownProvider(issuerName),
              });
            }

            it.each(issuerPatterns)(
              'pattern "%s" should generate a valid credit card number',
              (pattern) => {
                const result = faker.finance.creditCardNumber(pattern);
                expect(result).toSatisfy(isLuhnNumber);
                expect(result).toSatisfy(isCreditCardFromIssuer);
              }
            );
          }
        );
      });
    });
  });
});
