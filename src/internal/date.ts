import { FakerError } from '../errors/faker-error';

/**
 * Converts a date passed as a `string`, `number` or `Date` to a valid `Date` object.
 *
 * @param date The date to convert.
 * @param name The reference name used for error messages. Defaults to `'refDate'`.
 *
 * @throws If the given date is invalid.
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
