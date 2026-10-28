import { describe, expect, it } from 'vitest';
import { FakerError } from '../../src';
import { addUTCYears, toDate } from '../../src/internal/date';

describe('toDate()', () => {
  it('should convert a string date to a valid Date object', () => {
    const dateString = '2024-07-05';
    expect(toDate(dateString)).toEqual(new Date(dateString));
  });

  it('should convert a string datetime to a valid Date object', () => {
    const timestamp = '2024-07-05T15:49:19+0000';
    expect(toDate(timestamp)).toEqual(new Date(timestamp));
  });

  it('should throw a FakerError for an invalid date string', () => {
    const timestamp = 'aaaa-07-05T15:49:19+0000';
    expect(() => toDate(timestamp)).toThrow(
      new FakerError(`Invalid refDate date: ${timestamp}`)
    );
  });
});

describe('addUTCYears()', () => {
  it('should move a date by whole years', () => {
    const date = new Date(Date.UTC(2020, 6, 5, 15, 49, 19));
    expect(addUTCYears(date, 3)).toEqual(
      new Date(Date.UTC(2023, 6, 5, 15, 49, 19))
    );
    expect(addUTCYears(date, -3)).toEqual(
      new Date(Date.UTC(2017, 6, 5, 15, 49, 19))
    );
  });

  it('should move February 29 to February 28 in a common year', () => {
    const date = new Date(Date.UTC(2024, 1, 29, 12));
    expect(addUTCYears(date, 1)).toEqual(new Date(Date.UTC(2025, 1, 28, 12)));
    expect(addUTCYears(date, -1)).toEqual(new Date(Date.UTC(2023, 1, 28, 12)));
    expect(addUTCYears(date, 4)).toEqual(new Date(Date.UTC(2028, 1, 29, 12)));
  });

  it('should not modify the given date', () => {
    const date = new Date(Date.UTC(2024, 1, 29, 12));
    addUTCYears(date, 1);
    expect(date).toEqual(new Date(Date.UTC(2024, 1, 29, 12)));
  });
});
