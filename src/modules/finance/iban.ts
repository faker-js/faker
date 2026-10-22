import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { fakeDatatypeBoolean } from '../datatype/boolean';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';
import { ibanLib } from './_iban-lib';

/**
 * Puts a space after every 4 characters.
 *
 * @internal
 *
 * @param iban The iban to pretty print.
 */
export function prettyPrintIban(iban: string): string {
  let pretty = '';
  for (let i = 0; i < iban.length; i += 4) {
    pretty += `${iban.substring(i, i + 4)} `;
  }

  return pretty.trimEnd();
}

/**
 * Generates a random IBAN.
 *
 * Please note that the generated IBAN might be invalid due to randomly generated bank codes/other country specific validation rules.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.formatted Return a formatted version of the generated IBAN. Defaults to `false`.
 * @param options.countryCode The country code from which you want to generate an IBAN, if none is provided a random country will be used.
 *
 * @throws {FakerError} Will throw an error if the passed country code is not supported.
 *
 * @example
 * fakeFinanceIban(fakerCore) // 'TR736918640040966092800056'
 * fakeFinanceIban(fakerCore, { formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
 * fakeFinanceIban(fakerCore, { formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceIban(
  fakerCore: FakerCore,
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
  const { countryCode, formatted = false } = options;

  const ibanFormat = countryCode
    ? ibanLib.formats.find((f) => f.country === countryCode)
    : fakeHelpersArrayElement(fakerCore, ibanLib.formats);

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
        s += fakeHelpersArrayElement(fakerCore, ibanLib.alpha);
      } else if (bban.type === 'c') {
        if (fakeDatatypeBoolean(fakerCore, 0.8)) {
          s += fakeNumberInt(fakerCore, 9);
        } else {
          s += fakeHelpersArrayElement(fakerCore, ibanLib.alpha);
        }
      } else {
        if (c >= 3 && fakeDatatypeBoolean(fakerCore, 0.3)) {
          if (fakeDatatypeBoolean(fakerCore)) {
            s += fakeHelpersArrayElement(fakerCore, ibanLib.pattern100);
            c -= 2;
          } else {
            s += fakeHelpersArrayElement(fakerCore, ibanLib.pattern10);
            c--;
          }
        } else {
          s += fakeNumberInt(fakerCore, 9);
        }
      }

      c--;
    }

    s = s.substring(0, count);
  }

  let checksum: string | number =
    98 - ibanLib.mod97(ibanLib.toDigitString(`${s}${ibanFormat.country}00`));

  if (checksum < 10) {
    checksum = `0${checksum}`;
  }

  const result = `${ibanFormat.country}${checksum}${s}`;

  return formatted ? prettyPrintIban(result) : result;
}
