import { describe, expect, it } from 'vitest';
import { encodeDate, reducedBase32 } from '../../src/internal/base32';

describe('encodeDate()', () => {
  it('encodes current date correctly', () => {
    const date = new Date('2023-04-01T00:00:00Z');
    const encoded = encodeDate(date);
    expect(encoded).toHaveLength(10);
    expect(encoded).toMatchSnapshot();
    for (const char of encoded)
      expect(reducedBase32.includes(char)).toBeTruthy();
  });

  it('encodes epoch start date correctly', () => {
    const date = new Date('1970-01-01T00:00:00Z');
    const encoded = encodeDate(date);
    expect(encoded).toBe('0000000000');
  });

  it('returns different encodings for dates one millisecond apart', () => {
    const date1 = new Date('2023-04-01T00:00:00.000Z');
    const date2 = new Date('2023-04-01T00:00:00.001Z');
    const encoded1 = encodeDate(date1);
    const encoded2 = encodeDate(date2);
    expect(encoded1).not.toBe(encoded2);
  });

  it('encodes same date consistently', () => {
    const date = new Date('2023-04-01T00:00:00Z');
    const encoded1 = encodeDate(date);
    const encoded2 = encodeDate(date);
    expect(encoded1).toBe(encoded2);
  });
});
