import { expect } from 'vitest';
import { describe, it } from 'vitest';
import { faker } from '../lib';
import ibanLib from '../lib/iban';

console.log(ibanLib);

function getAnIbanByCountry(countryCode) {
  let iban =
    // @ts-expect-error
    faker.finance.iban();
  const maxTry = 100000;
  let countTry = maxTry;
  while (countTry && iban.substring(0, 2) !== countryCode) {
    faker.seed(100000 - countTry);
    iban =
      // @ts-expect-error
      faker.finance.iban();
    countTry--;
  }

  if (countTry === 0) {
    console.log('Not found with 10000 seed, vraiment pas de bol');
  } else if (countTry < maxTry) {
    console.log(
      'you can optimize this helper by add faker.seed(' +
        (100000 - 1 - countTry) +
        ') before the call of getAnIbanByCountry()'
    );
  }
  // console.log(iban);

  return iban;
}

describe('finance_iban.js', () => {
  describe('issue_944 IBAN Georgia', () => {
    // Georgia
    // https://transferwise.com/fr/iban/georgia
    // Length 22
    // BBAN 2c,16n
    // GEkk bbcc cccc cccc cccc cc
    // b = National bank code (alpha)
    // c = Account number

    // example IBAN GE29 NB00 0000 0101 9049 17

    it('IBAN for Georgia is correct', () => {
      faker.seed(17);
      const iban = getAnIbanByCountry('GE');
      const ibanFormated = iban.match(/.{1,4}/g).join(' ');
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(
        22,
        'GE IBAN would be 22 chars length, given is ' + iban.length
      ).toBe(iban.length);

      expect(
        iban.substring(0, 2),
        iban.substring(0, 2) +
          ' must contains only characters in GE IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{2}$/);
      expect(
        iban.substring(2, 4),
        iban.substring(2, 4) +
          ' must contains only digit in GE IBAN ' +
          ibanFormated
      ).match(/^\d{2}$/);
      expect(
        iban.substring(4, 6),
        iban.substring(4, 6) +
          ' must contains only characters in GE IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{2}$/);
      expect(
        iban.substring(6, 24),
        iban.substring(6, 24) +
          ' must contains only characters in GE IBAN ' +
          ibanFormated
      ).match(/^\d{16}$/);

      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toBe(1);
    });
  });

  describe('issue_945 IBAN Pakistan', () => {
    // https://transferwise.com/fr/iban/pakistan
    // Example IBAN Pakistan
    // PK36SCBL0000001123456702
    // IBAN en format imprimé
    // PK36 SCBL 0000 0011 2345 6702
    // Code pays 2 alpha
    // PK
    // Key 2 digits
    // Bank Code 4 alpha
    // Account Code 16 digits
    // Total Length 24 chars

    const ibanLib = require('../lib/iban');

    it('IBAN for Pakistan is correct', () => {
      faker.seed(28);
      const iban = getAnIbanByCountry('PK');
      const ibanFormated = iban.match(/.{1,4}/g).join(' ');
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(
        24,
        'PK IBAN would be 24 chars length, given is ' + iban.length
      ).toBe(iban.length);

      expect(
        iban.substring(0, 2),
        iban.substring(0, 2) +
          ' must contains only characters in PK IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{2}$/);
      expect(
        iban.substring(2, 4),
        iban.substring(2, 4) +
          ' must contains only digit in PK IBAN ' +
          ibanFormated
      ).match(/^\d{2}$/);
      expect(
        iban.substring(4, 8),
        iban.substring(4, 8) +
          ' must contains only characters in PK IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{4}$/);
      expect(
        iban.substring(8, 24),
        iban.substring(8, 24) +
          ' must contains only digits in PK IBAN ' +
          ibanFormated
      ).match(/^\d{16}$/);

      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toBe(1);
    });
  });

  describe('issue_946 IBAN Turkish', () => {
    // https://transferwise.com/fr/iban/turkey
    // Un IBAN en Turquie est constitué de 26 caractères :
    //
    //   Code pays à 2 lettres
    //   Clé de contrôle à 2 chiffres
    //   5 caractères du SWIFT/BIC de la banque
    //   Code à 1 chiffres pour le code national
    //   Code à 16 chiffres pour le numéro de compte bancaire
    //   Vous avez déjà un code IBAN ?
    //
    //   Exemple d'IBAN en Turquie	TR330006100519786457841326
    //   IBAN en format imprimé	TR33 0006 1005 1978 6457 8413 26
    //   Code pays	TR
    //   Clé de contrôle	33
    //   Code banque	00061
    //   Chiffre d'indicatif national	0
    //   Numéro de compte bancaire	0519786457841326

    const ibanLib = require('../lib/iban');

    it('IBAN for Turkish is correct', () => {
      faker.seed(37);

      const iban = getAnIbanByCountry('TR');
      const ibanFormated = iban.match(/.{1,4}/g).join(' ');
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(
        26,
        'PK IBAN would be 26 chars length, given is ' + iban.length
      ).toBe(iban.length);

      expect(
        iban.substring(0, 2),
        'Country Code:' +
          iban.substring(0, 2) +
          ' must contains only characters in PK IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{2}$/);
      expect(
        iban.substring(2, 4),
        'Control key:' +
          iban.substring(2, 4) +
          ' must contains only digit in PK IBAN ' +
          ibanFormated
      ).match(/^\d{2}$/);
      expect(
        iban.substring(4, 9),
        'Swift Bank Code:' +
          iban.substring(4, 9) +
          ' must contains only digits in PK IBAN ' +
          ibanFormated
      ).match(/^\d{5}$/);
      expect(
        iban.substring(9, 10),
        'National Digit:' +
          iban.substring(9, 10) +
          ' must contains only digits in PK IBAN ' +
          ibanFormated
      ).match(/^\d{1}$/);
      expect(
        iban.substring(10, 26),
        'Account Code:' +
          iban.substring(10, 26) +
          ' must contains only digits in PK IBAN ' +
          ibanFormated
      ).match(/^\d{16}$/);

      expect(
        iban.substring(2, 26),
        'No character after TR ' + ibanFormated
      ).match(/^\d{24}$/);

      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toBe(1);
    });
  });

  describe('issue_846 IBAN Azerbaijan', () => {
    // Azerbaijan
    // https://transferwise.com/fr/iban/azerbaijan
    // Length 28
    // BBAN 4c,20n
    // GEkk bbbb cccc cccc cccc cccc cccc
    // b = National bank code (alpha)
    // c = Account number

    // example IBAN AZ21 NABZ 0000 0000 1370 1000 1944

    const ibanLib = require('../lib/iban');

    it('IBAN for Azerbaijan is correct', () => {
      faker.seed(21);
      const iban = getAnIbanByCountry('AZ');
      const ibanFormated = iban.match(/.{1,4}/g).join(' ');
      const bban = iban.substring(4) + iban.substring(0, 4);

      expect(
        28,
        'AZ IBAN would be 28 chars length, given is ' + iban.length
      ).toBe(iban.length);

      expect(
        iban.substring(0, 2),
        iban.substring(0, 2) +
          ' must contains only characters in AZ IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{2}$/);
      expect(
        iban.substring(2, 4),
        iban.substring(2, 4) +
          ' must contains only digit in AZ IBAN ' +
          ibanFormated
      ).match(/^\d{2}$/);
      expect(
        iban.substring(4, 8),
        iban.substring(4, 8) +
          ' must contains only characters in AZ IBAN ' +
          ibanFormated
      ).match(/^[A-Z]{4}$/);
      expect(
        iban.substring(8, 28),
        iban.substring(8, 28) +
          ' must contains 20 characters in AZ IBAN ' +
          ibanFormated
      ).match(/^\d{20}$/);

      expect(
        ibanLib.mod97(ibanLib.toDigitString(bban)),
        'the result should be equal to 1'
      ).toBe(1);
    });
  });
});
