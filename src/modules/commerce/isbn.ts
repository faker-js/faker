import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { objectEntry } from '../helpers/object-entry';
import { numeric } from '../string/numeric';

// Source for official prefixes: https://www.isbn-international.org/range_file_generation
const ISBN_LENGTH_RULES: Record<
  string,
  Array<[rangeMaximum: number, length: number]>
> = {
  '0': [
    [1999999, 2],
    [2279999, 3],
    [2289999, 4],
    [3689999, 3],
    [3699999, 4],
    [6389999, 3],
    [6397999, 4],
    [6399999, 7],
    [6449999, 3],
    [6459999, 7],
    [6479999, 3],
    [6489999, 7],
    [6549999, 3],
    [6559999, 4],
    [6999999, 3],
    [8499999, 4],
    [8999999, 5],
    [9499999, 6],
    [9999999, 7],
  ],
  '1': [
    [99999, 3],
    [299999, 2],
    [349999, 3],
    [399999, 4],
    [499999, 3],
    [699999, 2],
    [999999, 4],
    [3979999, 3],
    [5499999, 4],
    [6499999, 5],
    [6799999, 4],
    [6859999, 5],
    [7139999, 4],
    [7169999, 3],
    [7319999, 4],
    [7399999, 7],
    [7749999, 5],
    [7753999, 7],
    [7763999, 5],
    [7764999, 7],
    [7769999, 5],
    [7782999, 7],
    [7899999, 5],
    [7999999, 4],
    [8004999, 5],
    [8049999, 5],
    [8379999, 5],
    [8384999, 7],
    [8671999, 5],
    [8675999, 4],
    [8697999, 5],
    [9159999, 6],
    [9165059, 7],
    [9168699, 6],
    [9169079, 7],
    [9195999, 6],
    [9196549, 7],
    [9729999, 6],
    [9877999, 4],
    [9911499, 6],
    [9911999, 7],
    [9989899, 6],
    [9999999, 7],
  ],
};

/**
 * Returns a random [ISBN](https://en.wikipedia.org/wiki/ISBN) identifier.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The variant to return or an options object.
 * @param options.variant The variant to return. Can be either `10` (10-digit format)
 * or `13` (13-digit format). Defaults to `13`.
 * @param options.separator The separator to use in the format. Defaults to `'-'`.
 *
 * @example
 * isbn(fakerCore) // '978-0-692-82459-7'
 * isbn(fakerCore, 10) // '1-155-36404-X'
 * isbn(fakerCore, 13) // '978-1-60808-867-6'
 * isbn(fakerCore, { separator: ' ' }) // '978 0 452 81498 1'
 * isbn(fakerCore, { variant: 10, separator: ' ' }) // '0 940319 49 7'
 * isbn(fakerCore, { variant: 13, separator: ' ' }) // '978 1 6618 9122 0'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function isbn(
  fakerCore: FakerCore,
  options:
    | 10
    | 13
    | {
        /**
         * The variant of the identifier to return.
         * Can be either `10` (10-digit format)
         * or `13` (13-digit format).
         *
         * @default 13
         */
        variant?: 10 | 13;

        /**
         * The separator to use in the format.
         *
         * @default '-'
         */
        separator?: string;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { variant: options };
  }

  const { variant = 13, separator = '-' } = options;

  const prefix = '978';
  const [group, groupRules] = objectEntry(fakerCore, ISBN_LENGTH_RULES);
  const element = numeric(fakerCore, 8);
  const elementValue = Number.parseInt(element.slice(0, -1));

  const registrantLength = groupRules.find(
    ([rangeMaximum]) => elementValue <= rangeMaximum
  )?.[1];

  if (!registrantLength) {
    // This can only happen if the ISBN_LENGTH_RULES are corrupted
    throw new FakerError(
      `Unable to find a registrant length for the group ${group}`
    );
  }

  const registrant = element.slice(0, registrantLength);
  const publication = element.slice(registrantLength);

  const data = [prefix, group, registrant, publication];
  if (variant === 10) {
    data.shift();
  }

  const isbn = data.join('');

  let checksum = 0;
  for (let i = 0; i < variant - 1; i++) {
    const weight = variant === 10 ? i + 1 : i % 2 ? 3 : 1;
    checksum += weight * Number.parseInt(isbn[i]);
  }

  checksum = variant === 10 ? checksum % 11 : (10 - (checksum % 10)) % 10;

  data.push(checksum === 10 ? 'X' : checksum.toString());

  return data.join(separator);
}
