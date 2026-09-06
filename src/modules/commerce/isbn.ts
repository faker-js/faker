import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { objectEntry } from '../helpers/object-entry';
import { numeric } from '../string/numeric';

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
