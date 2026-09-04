import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { CROCKFORDS_BASE32, dateToBase32 } from '../../internal/base32';
import { toDate } from '../../internal/date';
import { getDefaultRefDate } from '../../utils/get-default-ref-date';
import { fromCharacters } from './from-characters';

/**
 * The largest timestamp a ULID can encode, as the timestamp component is a 48 bit unsigned integer.
 */
const MAX_ULID_TIMESTAMP = 2 ** 48 - 1;

/**
 * Returns a ULID ([Universally Unique Lexicographically Sortable Identifier](https://github.com/ulid/spec)).
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.refDate The timestamp to encode into the ULID.
 * The encoded timestamp is represented by the first 10 characters of the result.
 * Defaults to `getDefaultRefDate(fakerCore)`.
 *
 * @throws {FakerError} If `refDate` is outside the range a ULID timestamp can encode.
 *
 * @example
 * ulid(fakerCore) // '01ARZ3NDEKTSV4RRFFQ69G5FAV'
 * ulid(fakerCore, { refDate: '2020-01-01T00:00:00.000Z' }) // '01DXF6DT00CX9QNNW7PNXQ3YR8'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function ulid(
  fakerCore: FakerCore,
  options: {
    /**
     * The date to use as reference point for the newly generated ULID encoded timestamp.
     * The encoded timestamp is represented by the first 10 characters of the result.
     * Must be between `1970-01-01T00:00:00.000Z` and `+010889-08-02T05:31:50.655Z`.
     *
     * @default getDefaultRefDate(fakerCore)
     */
    refDate?: string | Date | number;
  } = {}
): string {
  const { refDate = getDefaultRefDate(fakerCore) } = options;
  const date = toDate(refDate);

  if (date.valueOf() < 0 || date.valueOf() > MAX_ULID_TIMESTAMP) {
    throw new FakerError(
      `Unable to generate ULID: the refDate must be between ${new Date(
        0
      ).toISOString()} and ${new Date(
        MAX_ULID_TIMESTAMP
      ).toISOString()}, but was ${date.toISOString()}.`
    );
  }

  return dateToBase32(date) + fromCharacters(fakerCore, CROCKFORDS_BASE32, 16);
}
