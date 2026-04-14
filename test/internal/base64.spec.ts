import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { toBase64 } from '../../src/internal/base64';

// This test is kind of useless, because during testing the Buffer object is always available.
describe('toBase64', () => {
  it.each(
    faker.helpers.multiple(
      () => faker.string.alphanumeric({ length: { min: 0, max: 100 } }),
      { count: 5 }
    )
  )(
    "should behave the same as `Buffer.from(value).toString('base64')`",
    (value) => {
      expect(toBase64(value)).toBe(Buffer.from(value).toString('base64'));
    }
  );
});
