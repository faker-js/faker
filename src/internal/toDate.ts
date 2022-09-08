/**
 * Converts date passed as a string, number, or Date to a Date object.
 * If nothing or a non parseable value is passed, takes current date.
 *
 * @param date The input to convert to a date.
 */
export function toDate(date?: string | Date | number): Date {
  date = new Date(date);
  if (isNaN(date.valueOf())) {
    date = new Date();
  }

  return date;
}
