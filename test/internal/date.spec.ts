import { describe, expect, it } from 'vitest';
import { FakerError } from '../../src';
import { toDate } from '../../src/internal/date';

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
