import { FakerError } from '../errors/faker-error';

/**
 * Converts a date passed as a `string`, `number` or `Date` to a valid `Date` object.
 *
 * @param date The date to convert.
 * @param name The reference name used for error messages. Defaults to `'refDate'`.
 *
 * @throws {FakerError} If the given date is invalid.
 */
export function toDate(
  date: string | Date | number,
  name: string = 'refDate'
): Date {
  const converted = new Date(date);

  if (Number.isNaN(converted.valueOf())) {
    throw new FakerError(`Invalid ${name} date: ${date.toString()}`);
  }

  return converted;
}

/**
 * Returns a copy of the given date moved by the given number of years (in UTC).
 * February 29 becomes February 28 when the target year is a common year,
 * instead of rolling over to March 1.
 *
 * @param date The date to move.
 * @param years The number of years to add. Negative values move the date into the past.
 */
export function addUTCYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setUTCFullYear(result.getUTCFullYear() + years);
  if (result.getUTCMonth() !== date.getUTCMonth()) {
    result.setUTCDate(0);
  }

  return result;
}
