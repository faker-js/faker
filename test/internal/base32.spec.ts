import { describe, expect, it } from 'vitest';
import { CROCKFORDS_BASE32, dateToBase32 } from '../../src/internal/base32';

describe('dateToBase32()', () => {
  it('encodes current date correctly', () => {
    const date = new Date('2023-04-01T00:00:00Z');
    const encoded = dateToBase32(date);
    expect(encoded).toHaveLength(10);
    expect(encoded).toMatchSnapshot();
    for (const char of encoded) {
      expect(CROCKFORDS_BASE32).toContain(char);
    }
  });

  it('encodes epoch start date correctly', () => {
    const date = new Date('1970-01-01T00:00:00Z');
    const encoded = dateToBase32(date);
    expect(encoded).toBe('0000000000');
  });

  it('returns different encodings for dates one millisecond apart', () => {
    const date1 = new Date('2023-04-01T00:00:00.000Z');
    const date2 = new Date('2023-04-01T00:00:00.001Z');
    const encoded1 = dateToBase32(date1);
    const encoded2 = dateToBase32(date2);
    expect(encoded1).not.toBe(encoded2);
  });

  it('encodes same date consistently', () => {
    const date = new Date('2023-04-01T00:00:00Z');
    const encoded1 = dateToBase32(date);
    const encoded2 = dateToBase32(date);
    expect(encoded1).toBe(encoded2);
  });
});
