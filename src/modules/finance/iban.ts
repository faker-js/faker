import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { boolean } from '../datatype/boolean';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';

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
 * iban(fakerCore) // 'TR736918640040966092800056'
 * iban(fakerCore, { formatted: true }) // 'FR20 8008 2330 8984 74S3 Z620 224'
 * iban(fakerCore, { formatted: true, countryCode: 'DE' }) // 'DE84 1022 7075 0900 1170 01'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function iban(
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
    ? iban.formats.find((f) => f.country === countryCode)
    : arrayElement(fakerCore, iban.formats);

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
        s += arrayElement(fakerCore, iban.alpha);
      } else if (bban.type === 'c') {
        if (boolean(fakerCore, 0.8)) {
          s += int(fakerCore, 9);
        } else {
          s += arrayElement(fakerCore, iban.alpha);
        }
      } else {
        if (c >= 3 && boolean(fakerCore, 0.3)) {
          if (boolean(fakerCore)) {
            s += arrayElement(fakerCore, iban.pattern100);
            c -= 2;
          } else {
            s += arrayElement(fakerCore, iban.pattern10);
            c--;
          }
        } else {
          s += int(fakerCore, 9);
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

  return formatted ? prettyPrintIban(result) : result;
}
