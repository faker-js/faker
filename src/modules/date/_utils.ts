/**
 * Returns the timestamp of the given date moved to the given year (in UTC).
 * February 29 becomes February 28 in a common year instead of rolling over to March 1.
 *
 * @param date The date to move.
 * @param year The year to move the date to.
 */
export function sameDayInYear(date: Date, year: number): number {
  const result = new Date(date);
  result.setUTCFullYear(year);
  if (result.getUTCMonth() !== date.getUTCMonth()) {
    result.setUTCDate(0);
  }

  return result.getTime();
}
